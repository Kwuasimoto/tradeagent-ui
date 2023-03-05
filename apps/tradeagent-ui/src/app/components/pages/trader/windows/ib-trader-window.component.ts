import { Component, OnInit } from "@angular/core";
import { LoggerService, StateService } from "@tradeagent-ui/services";
import { MarketClientConfiguration } from "types";

@Component({
  selector: 'tradeagent-ui-ib-trader-window',
  template: `
    <div class="border border-base-300 bg-base-300">
      <div class="flex border-t border-base-300">
        <div class="ml-2">
          <tradeagent-ui-market-client-activity-router
            [marketClientConfiguration]="marketClientConfig"
          ></tradeagent-ui-market-client-activity-router>
        </div>
        <div class="ml-auto mr-1">
          <tradeagent-ui-market-client-trader-actions></tradeagent-ui-market-client-trader-actions>
        </div>
      </div>
      <div class="flex">
        <div class="pl-8">Interactive Brokers Tools</div>
        <div class="mx-auto">Generic Market Data Display (TradingView Charts)</div>
        <div class="pr-8">Generic Utilities Panel</div>
      </div>
      <div>
        <div> Console Toolbar </div>
        <div> Console Messages </div>
      </div>
    </div>
  `,
  styles: [],
})
export class IbTraderWindowComponent implements OnInit {

  readonly #logger = new LoggerService(IbTraderWindowComponent)

  constructor(
    private readonly state: StateService,
  ) {
  }

  get marketClientConfig() {
    return this.state.activeTraderTab.value.data as MarketClientConfiguration
  }

  get activeTraderTab() {
    return this.state.activeTraderTab
  }

  ngOnInit(): void {
    this.#logger.info("STATE LOG", { state: this.state.activeTraderTab.value })
  }
}
