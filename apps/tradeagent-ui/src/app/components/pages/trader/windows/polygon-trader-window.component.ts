import { Component } from "@angular/core";
import {
  LoggerService,
  MarketApiActions,
  MarketApiConfigurationTypes,
  MarketApiService,
  StateService
} from "@tradeagent-ui/services";
import { MarketApiConfiguration } from "types";
import { Observable, Observer } from "rxjs";

@Component({
  selector: 'tradeagent-ui-polygon-trader-window',
  template: `
    <div class="w-full h-full flex flex-col bg-base-300">
      <div class="flex justify-between">
        <!--MAKE MICRO-->
        <div class="flex">
          <div (click)="connect()" title="Connect" class="btn btn-sm rounded-t-none rounded-b-md hover:text-green-300">
            <mat-icon class="p-0">play_arrow</mat-icon>
          </div>
          <div (click)="disconnect()" title="Disconnect" class="btn btn-sm rounded-t-none rounded-b-md hover:text-red-500">
            <mat-icon class="p-0">stop</mat-icon>
          </div>
          <div (click)="ping()" title="Ping" class="btn btn-sm rounded-t-none rounded-b-md hover:text-blue-500">
            <mat-icon class="p-0">leak_add</mat-icon>
          </div>
        </div>
        <!--MAKE MICRO-->
        <div class="mr-14">
          <a [href]="marketProviderInformation.providerWebsite" [title]="marketProviderInformation.providerWebsite">
            <img class="hover:shadow-lg rounded-lg cursor-pointer"
                 [src]="marketProviderInformation.providerBrandLogoBase64"
                 alt="Shoes" />
          </a>
        </div>
        <div>
          <mat-icon title="Api Status" class="m-1 text-{{activeTraderTabData.canQuery ? 'green-700' : 'red-700'}}">signal_cellular_alt</mat-icon>
          <mat-icon title="Is Api Ready" class="m-1 text-{{activeTraderTabData.isReady ? 'green-700' : 'red-700'}}">router</mat-icon>
        </div>
      </div>
      <div class="flex justify-between h-full">
        <div>Polygon ToolBar A</div>
        <div>Generic Chart Render</div>
        <div>Generic Utilities</div>
      </div>
      <div class="flex flex-col">
        <div>Polygon Data Feed Controls</div>
        <div class="pt-auto">Polygon Data Feed</div>
      </div>
    </div>
  `,
  styles: [],
})
export class PolygonTraderWindowComponent {
  readonly #logger = new LoggerService(PolygonTraderWindowComponent)

  constructor(
    private readonly state: StateService,
    private readonly marketApiService: MarketApiService
  ) {
    this.#logger.info("Currently active TAB", { state: state.activeTraderTab.value.data })
  }

  get activeTraderTab() {
    return this.state.activeTraderTab
  }

  get activeTraderTabData() {
    return this.state.activeTraderTab.value.data as MarketApiConfiguration
  }

  get marketProviderInformation() {
    const marketProviderInformation = this.marketApiService.marketApiInformation
      .find(v => v.providerType === MarketApiConfigurationTypes.Polygon)

    if(!marketProviderInformation) throw new Error()
    return marketProviderInformation
  }

  ping() {
    this.marketApiService
      .getMarketStatus(this.activeTraderTabData)
      .subscribe()
  }

  connect() {
    this.marketApiService
      .handleMarketApiConnection(MarketApiActions.Connect, this.activeTraderTabData)
      .subscribe()
  }

  disconnect() {
    this.marketApiService
      .handleMarketApiConnection(MarketApiActions.Disconnect, this.activeTraderTabData)
      .subscribe()
  }
}
