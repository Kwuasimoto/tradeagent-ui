import { Component, OnInit } from "@angular/core";
import {
  MarketClientService,
  LoggerService,
  StateService,
  UserService,
} from "@tradeagent-ui/services";
import { EditConfigurationProps } from "types";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'tradeagent-ui-trader',
  template: `
    <!--  CLIENT ACTIVATION TABULAR MENU AND CONFIG TABLE  -->
    <div class="flex flex-col h-full">
      <tradeagent-ui-trader-tabular-menu></tradeagent-ui-trader-tabular-menu>
      <ng-container *ngIf="!addingConfiguration.value && !editingConfiguration.value.isEditing">
        <ng-container *ngIf="showMarketClientConfigurationTable.value; else showTraderWindow">
          <tradeagent-ui-client-table></tradeagent-ui-client-table>
          <tradeagent-ui-api-table></tradeagent-ui-api-table>
        </ng-container>
        <ng-template #showTraderWindow>
          <tradeagent-ui-trader-window-factory class="flex flex-grow"></tradeagent-ui-trader-window-factory>
        </ng-template>
      </ng-container>

      <!--  ADD NEW CLIENT CONFIGURATION COMPONENT  -->
      <ng-container *ngIf="addingConfiguration.value">
        <tradeagent-ui-client-connect></tradeagent-ui-client-connect>
      </ng-container>

      <!--  EDIT/ADD CLIENT CONFIG FORM  -->
      <ng-container *ngIf="editingConfiguration.value.isEditing">
        <tradeagent-ui-client-config-form></tradeagent-ui-client-config-form>
        <tradeagent-ui-api-config-form></tradeagent-ui-api-config-form>
      </ng-container>
    </div>

  `,
  styles: [``],
})
export class TraderComponent {
  readonly #logger = new LoggerService(TraderComponent)

  constructor(
    private readonly userService: UserService,
    private readonly marketClientService: MarketClientService,
    private readonly state: StateService,
  ) {
    /**
     *  We need some sort of service that checks if the user has configured a client
     *
     *  - If; the user has a client configured, display the console
     *  - Else; display the client connect component
     * */
  }

  get editingConfiguration() {
    return this.state.editingConfiguration as FormControl<EditConfigurationProps>
  }

  get addingConfiguration()  {
    return this.state.addingConfiguration as FormControl<boolean>
  }

  get showMarketClientConfigurationTable() {
    return this.state.showMarketClientConfigurationsTable as FormControl<boolean>
  }
}
