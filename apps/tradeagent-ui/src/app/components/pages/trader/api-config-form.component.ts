import { Component } from '@angular/core';
import {
  LoggerService,
  MarketApiConfigurationTypes,
  StateService
} from "@tradeagent-ui/services";

@Component({
  selector: 'tradeagent-ui-api-config-form',
  template: `
    <div>
      <ng-container *ngIf="editingConfiguration.value.type === getTypes().Polygon">
        <tradeagent-ui-connect-polygon></tradeagent-ui-connect-polygon>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class ApiConfigFormComponent {
  readonly #logger = new LoggerService(ApiConfigFormComponent)

  constructor(private readonly state: StateService) {
  }

  get editingConfiguration() {
    return this.state.editingConfiguration
  }

  getTypes() {
    return MarketApiConfigurationTypes
  }
}
