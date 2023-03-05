import { Injectable } from "@angular/core";
import { LoggerService } from "./logger.service";
import { MarketApiConfiguration, MarketApiStatus, MarketProviderInformation } from "types";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@tradeagent-ui/config";
import { ImageService } from "./image.service";
import { ErrorService } from "./error.service";
import { catchError, tap } from "rxjs";
import { MarketClientTab, StateService } from "./state.service";
import { isEqual, mergeWith } from "lodash";
import { AppMemoryService } from "./app-memory.service";

export enum MarketApiConfigurationTypes {
  Polygon = "Polygon",
}

export enum MarketApiActions {
  Connect,
  Disconnect,
  Ping
}

@Injectable({
  providedIn: "root"
})
export class MarketApiService {

  readonly #logger = new LoggerService(MarketApiService)
  readonly #errors = new ErrorService(this.#logger)
  #apiDataLoaded = false;
  readonly #marketApiConfigurations: MarketApiConfiguration[] = []
  readonly #marketApiInformation: MarketProviderInformation[] = [{
    provider: "PolygonIO API",
    providerWebsite: "https://polygon.io/",
    providerBrandLogoSelector: "div.image-view > div.image-box-component.zoomable.show-ad > picture > img",
    providerBrandLogoName: "polygon-io-brand-logo.png",
    providerType: MarketApiConfigurationTypes.Polygon
  }]

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService,
    private readonly imgService: ImageService,
    private readonly state: StateService,
    private readonly memory: AppMemoryService
  ) {
    const marketApiProviderBrandLogoNames = this.#marketApiInformation.map(data => data.providerBrandLogoName);
    this.imgService.getImages(marketApiProviderBrandLogoNames).subscribe({
      error: err => this.#logger.info("Error trying to fetch image", {err}),
      next: result => {
        for(const resource of result){
          const index = this.#marketApiInformation.findIndex(client => client.providerBrandLogoName)
          this.#marketApiInformation[index].providerBrandLogoBase64 = this.imgService.imageFromBase64(resource.imageData);
        }
        this.#apiDataLoaded = true;
      }
    })
    this.getMarketApiConfigurations().subscribe()
  }

  get marketApiConfigurations() {
    return this.#marketApiConfigurations
  }

  get marketApiInformation() {
    return this.#marketApiInformation
  }

  get marketAPIDataLoaded() {
    return this.#apiDataLoaded
  }

  handleMarketApiConnection(action: MarketApiActions, marketApiConfiguration: MarketApiConfiguration ) {
    const actionString = action === 0 ? "connect" : "disconnect"
    const endpoint = `/market-api/${actionString}`;
    const requestBody = { id: marketApiConfiguration.id };

    return this.http.post<MarketApiConfiguration>(
      this.config.dbUrl + endpoint,
      requestBody,
      this.config.httpOptions
    ).pipe(
      tap(result => {
        this.#logger.info("Market Api Connection Handled", { result });
        const targetIndex = this.#marketApiConfigurations.findIndex(datum => datum.id === marketApiConfiguration.id);
        this.#marketApiConfigurations[targetIndex] = result;
        this.state.activeTraderTab.setValue({
          ...this.state.activeTraderTab.value,
          data: result
        })
        this.memory.update("tradeagent-ui-trader-tabs", this.state.marketClientTabs)
        return result;
      }),
      catchError(this.#errors.handleCatchError(`Failed to ${actionString} client`))
    );
  }

  mapMarketConfigurationsToMarketClientTabs() {
    let mappedTabs: MarketClientTab[] = []
    mappedTabs = this.marketApiConfigurations.map(marketApiConfiguration => {
      const tab = this.state.marketClientTabs.value.find(tab => tab.data.id == marketApiConfiguration.id)
      if(!tab) throw Error("Unable ")
      return {
        ...tab,
        data: marketApiConfiguration
      }
    })
    this.state.marketClientTabs
  }

  getMarketApiConfigurations() {
    return this.http.get<Array<MarketApiConfiguration>>(
      this.config.dbUrl+"/market-api/configurations",
      this.config.httpOptions
    ).pipe(
      tap(value => {
        if(this.state.marketClientTabs.value.length > 0) {
          const updatedTabs = value.map(marketApiConfiguration => {
            const index = this.state.marketClientTabs.value.findIndex(v => v.data.id === marketApiConfiguration.id);
            const toUpdate = this.state.marketClientTabs.value[index];
            return {
              ...toUpdate,
              data: marketApiConfiguration
            };
          });
          this.state.marketClientTabs.setValue(updatedTabs);
          this.memory.update("tradeagent-ui-trader-tabs", this.state.marketClientTabs)
        }
        this.marketApiConfigurations.push(...value)
        return value;
      }),
      catchError(this.#errors.handleCatchError("Failed to fetch market client configurations"))
    )
  }

  getMarketApiDatumByConfigurationType(type: MarketApiConfigurationTypes) {
    const marketApiInformation = this.#marketApiInformation.find(datum => {
      return datum.providerType === type;
    })

    if(!marketApiInformation) {
      this.#logger.info("Tried to query market data with an unknown MarketClientConfiguration type")
      throw new Error("This shouldn't happen!");
    }

    return marketApiInformation;
  }

  saveMarketApiConfiguration(config: MarketApiConfiguration) {
    return this.http.post<MarketApiConfiguration>(
      this.config.dbUrl+"/market-api/configurations",
      config,
      this.config.httpOptions
    ).pipe(
      tap(value => {
        this.#logger.info("Successfully saved market api configuration")
        this.#marketApiConfigurations.push(value)
        return value;
      }),
      catchError(this.#errors.handleCatchError("Failed to save market api configuration"))
    )

  }

  getMarketStatus(config: MarketApiConfiguration) {
    return this.http.post<MarketApiStatus>(
      this.config.dbUrl+"/market-api/status",
      config,
      this.config.httpOptions
    ).pipe(
      tap(value => {
        this.#logger.info("Successfully fetched market status", { value })
        const index = this.#marketApiConfigurations.findIndex(v => isEqual(v.id, config.id))
        if(!index) {
          this.#logger.warn("Failed to index marketApiConfig", { config })
        }
        this.#marketApiConfigurations[index].marketApiStatus = value;
        const marketApiConfig = mergeWith(this.state.activeTraderTab.value, {
          data: { canQuery: true }
        })
        this.state.activeTraderTab.setValue(marketApiConfig)
        return value;
      }),
        catchError(this.#errors.handleCatchError("Failed to fetch market status", { config }))
      )
  }
}
