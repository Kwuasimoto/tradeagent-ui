import { Component, OnInit } from "@angular/core";
import { MarketApiConfigurationTypes, MarketClientConfigurationTypes, StateService } from "@tradeagent-ui/services";

@Component({
  selector: 'tradeagent-ui-trader-window-factory',
  template: `
    <ng-container *ngIf="isTWSTab()">
      <tradeagent-ui-ib-trader-window class="w-full h-full"></tradeagent-ui-ib-trader-window>
    </ng-container>
    <ng-container *ngIf="isPolygonTab()">
      <tradeagent-ui-polygon-trader-window class="w-full h-full"></tradeagent-ui-polygon-trader-window>
    </ng-container>

  `,
  styles: [],
})
export class TraderWindowFactoryComponent implements OnInit {


  constructor(private readonly state: StateService) {

  }

  ngOnInit(): void {
    const activeTab = this.state.marketClientTabs.value.find(tab => tab.isTabActive);
    if (!activeTab) return;
    this.state.activeTraderTab.setValue(activeTab);
  }

  isTWSTab() {
    return this.state.activeTraderTab.value.type === MarketClientConfigurationTypes.TWS
  }

  isPolygonTab()  {
    return this.state.activeTraderTab.value.type === MarketApiConfigurationTypes.Polygon
  }
}
