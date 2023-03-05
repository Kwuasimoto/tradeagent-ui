import { Component, Input } from "@angular/core";
import { MarketApiConfiguration } from "types";

@Component({
  selector: 'tradeagent-ui-market-api-activity-signal',
  template: `
    <mat-icon class="mt-1 {{this.marketApiConfiguration.canQuery ? 'text-green-700' : 'text-red-700'}}">router
    </mat-icon>
  `,
  styles: [],
})
export class MarketApiActivitySignalComponent {
  @Input()
  marketApiConfiguration!: MarketApiConfiguration
}
