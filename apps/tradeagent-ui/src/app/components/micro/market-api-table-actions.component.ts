import { Component, Input } from "@angular/core";
import { MarketApiConfiguration } from "types";

@Component({
  selector: 'tradeagent-ui-market-api-table-actions',
  template: `

  `,
  styles: [],
})
export class MarketApiTableActionsComponent {
  @Input()
  marketApiConfiguration!: MarketApiConfiguration
}
