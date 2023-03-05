import { Component } from "@angular/core";
import { MarketClientConfigurationTypes, LoggerService, StateService } from "@tradeagent-ui/services";

@Component({
  selector: 'tradeagent-ui-client-config-form',
  template: `
    <ng-container *ngIf="editingConfiguration.value.type === getTypes().TWS">
      <tradeagent-ui-connect-ib-tws></tradeagent-ui-connect-ib-tws>
    </ng-container>
  `,
  styles: [],
})
export class ClientConfigFormComponent {
  readonly #logger = new LoggerService(ClientConfigFormComponent)

  constructor(private readonly state: StateService) {
  }

  get editingConfiguration() {
    return this.state.editingConfiguration
  }

  getTypes() {
    return MarketClientConfigurationTypes
  }
}
