import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@tradeagent-ui/config";
import { catchError, tap } from "rxjs";
import { LoggerService } from "./logger.service";
import { ImageService } from "./image.service";
import { MarketClientConfiguration, MarketProviderInformation } from "types";
import { ErrorService } from "./error.service";
import { StateService } from "./state.service";

export enum MarketClientConfigurationTypes {
  TWS = "TWS",
}

export enum MarketClientConnectionActions {
  Connect,
  Disconnect
}



@Injectable({
  providedIn: "root"
})
export class MarketClientService {
  readonly #logger = new LoggerService(MarketClientService)
  readonly #errors = new ErrorService(this.#logger)

  #marketDataLoaded = false;
  readonly #marketClientConfigurations: MarketClientConfiguration[] = []
  readonly #marketClientInformation: MarketProviderInformation[] = [{
    provider: "Interactive Brokers TWS",
    providerWebsite: "https://www.interactivebrokers.com/en/home.php",
    providerBrandLogoSelector: "a.navbar-brand.brand-logo",
    providerBrandLogoName: "IB-brand-logo.png",
    providerType: MarketClientConfigurationTypes.TWS
  }]

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService,
    private readonly imgService: ImageService,
    private readonly state: StateService
  ) {
    const marketProviderBrandLogoNames = this.#marketClientInformation.map(data => data.providerBrandLogoName);
    this.imgService.getImages(marketProviderBrandLogoNames).subscribe({
      error: err => this.#logger.info("Error trying to fetch image", {err}),
      next: result => {
        for(const resource of result){
          const index = this.#marketClientInformation.findIndex(client => client.providerBrandLogoName)
          this.#marketClientInformation[index].providerBrandLogoBase64 = this.imgService.imageFromBase64(resource.imageData);
        }
        this.#marketDataLoaded = true;
      }
    })
    this.getMarketClientConfigurations().subscribe()
  }

  get marketClientConfigurations() {
    return this.#marketClientConfigurations
  }

  get marketClientInformation() {
    return this.#marketClientInformation
  }

  get marketDataLoaded() {
    return this.#marketDataLoaded
  }

  /**
   * Fetch a specific users console configuration
   */
  getMarketClientConfigurations() {
    return this.http.get<Array<MarketClientConfiguration>>(
      this.config.dbUrl+"/market-client/configurations",
      this.config.httpOptions
    ).pipe(
      tap(value => {
        this.marketClientConfigurations.push(...value)
        return value;
      }),
      catchError(this.#errors.handleCatchError("Failed to fetch market client configurations"))
    )
  }

  getMarketClientDatumByConfigurationType(type: MarketClientConfigurationTypes) {
    const marketClientData = this.#marketClientInformation.find(datum => {
      return datum.providerType === type;
    })

    if(!marketClientData) {
      this.#logger.info("Tried to query market data with an unknown MarketClientConfiguration type")
      throw new Error("This shouldn't happen!");
    }

    return marketClientData;
  }

  saveMarketClientConfiguration(config: MarketClientConfiguration) {
    return this.http.post<MarketClientConfiguration>(this.config.dbUrl+"/market-client/configurations",
      config,
      this.config.httpOptions
    ).pipe(
      tap(value => {
        this.#logger.info("Successfully saved marketClientConfiguration", { value });
        this.#marketClientConfigurations.push({ ...value, isActive: false });
        return value;
      }),
      catchError(this.#errors.handleCatchError("Failed to save market configuration"))
    )
  }

  handleMarketClientConnection(action: MarketClientConnectionActions, marketClientConfiguration: MarketClientConfiguration ) {
    const actionString = action === 0 ? "connect" : "disconnect"
    const endpoint = `/market-client/${actionString}`;
    const requestBody = { id: marketClientConfiguration.id };

    return this.http.post(this.config.dbUrl + endpoint, requestBody, {
      ...this.config.httpOptions,
      responseType: "text"
    }).pipe(
      tap(result => {
        this.#logger.info(result);
        const targetIndex = this.#marketClientConfigurations.findIndex(datum => datum.id === marketClientConfiguration.id);
        this.#marketClientConfigurations[targetIndex].isActive = action.valueOf() === 0;
        return result;
      }),
      catchError(this.#errors.handleCatchError(`Failed to ${actionString} client`))
    );
  }
  deleteMarketClientConfiguration(marketClientTableDatum: MarketClientConfiguration) {
    return this.http.post(this.config.dbUrl+"/market-client/delete", {
      id: marketClientTableDatum.id
    }, this.config.httpOptions).pipe(
      tap(result => {
        this.#logger.info("Successfully removed market client configuration", { result })
        return marketClientTableDatum
      }),
      catchError(this.#errors.handleCatchError("Error deleting market client configuration"))
    )
  }
}
