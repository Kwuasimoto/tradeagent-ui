import { Component } from '@angular/core';
import { MarketClientConnectionActions, MarketClientService, StateService } from "@tradeagent-ui/services";
import { MarketClientConfiguration } from "types";

@Component({
  selector: 'tradeagent-ui-market-client-trader-actions',
  template: `
    <ul class="menu menu-compact menu-horizontal bg-base-200 rounded-md rounded-t-none">
      <li (click)="connectMarketClient(); $event.stopPropagation()">
        <mat-icon class="text-center p-0 pt-0.5 hover:text-green-300 ">play_arrow</mat-icon>
      </li>
      <li (click)="disconnectMarketClient(); $event.stopPropagation()">
        <mat-icon class="text-center p-0 pt-0.5 hover:text-red-500 ">stop</mat-icon>
      </li>
    </ul>
  `,
  styles: [],
})
export class MarketClientTraderActionsComponent {

  constructor(
    private readonly marketClientService: MarketClientService,
    private readonly state: StateService
  ) {
  }

  connectMarketClient() {
    const config = this.state.activeTraderTab.value.data as MarketClientConfiguration;
    this.marketClientService
      .handleMarketClientConnection(MarketClientConnectionActions.Connect, config)
      .subscribe()
  }

  disconnectMarketClient() {
    const config = this.state.activeTraderTab.value.data as MarketClientConfiguration;
    this.marketClientService
      .handleMarketClientConnection(MarketClientConnectionActions.Disconnect, config)
      .subscribe()
  }
}
