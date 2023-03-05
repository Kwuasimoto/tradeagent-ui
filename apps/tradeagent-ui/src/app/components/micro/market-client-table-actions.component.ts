import { Component, Input } from "@angular/core";
import { MarketClientConnectionActions, MarketClientService } from "@tradeagent-ui/services";
import { MarketClientTableDatum } from "types";

@Component({
  selector: 'tradeagent-ui-market-client-table-actions',
  template: `
    <ul class="menu menu-horizontal bg-base-200 p-2 rounded-box">
      <li (click)="connectMarketClient(); $event.stopPropagation()" class="mx-auto flex p-2">
        <mat-icon class="p-0 hover:text-green-300 ">play_arrow</mat-icon>
      </li>
      <li (click)="disconnectMarketClient(); $event.stopPropagation()" class="mx-auto flex p-2">
        <mat-icon class="p-0 hover:text-red-500 ">stop</mat-icon>
      </li>
      <li (click)="deleteMarketClientConfiguration(); $event.stopPropagation()"
          title="WARNING: Cannot be undone!" class="mx-auto flex p-2 ">
        <mat-icon class="p-0 text-red-900">delete</mat-icon>
      </li>
    </ul>
  `,
  styles: [],
})
export class MarketClientTableActionsComponent {

  @Input()
  marketClientConfiguration!: MarketClientTableDatum

  constructor(private readonly marketClientService: MarketClientService) {
  }

  connectMarketClient() {
    this.marketClientService
      .handleMarketClientConnection(MarketClientConnectionActions.Connect, this.marketClientConfiguration)
      .subscribe()
  }

  disconnectMarketClient() {
    this.marketClientService
      .handleMarketClientConnection(MarketClientConnectionActions.Disconnect, this.marketClientConfiguration)
      .subscribe()
  }

  deleteMarketClientConfiguration() {
    this.marketClientService
      .deleteMarketClientConfiguration(this.marketClientConfiguration)
      .subscribe()
  }

}
