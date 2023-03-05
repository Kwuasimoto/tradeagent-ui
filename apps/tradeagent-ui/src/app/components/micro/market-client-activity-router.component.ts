import { Component, Input } from "@angular/core";
import { LoggerService } from "@tradeagent-ui/services";
import { MarketClientConfiguration } from "types";

@Component({
  selector: 'tradeagent-ui-market-client-activity-router',
  template: ` <mat-icon class="mt-1 {{this.marketClientConfiguration.isActive ? 'text-green-700' : 'text-red-700'}}">router
             </mat-icon> `,
  styles: [],
})
export class MarketClientActivityRouterComponent {
  @Input()
  marketClientConfiguration!: MarketClientConfiguration
  readonly #logger = new LoggerService(MarketClientActivityRouterComponent)
}
