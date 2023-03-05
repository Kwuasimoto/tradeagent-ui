import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LoggerService } from "./logger.service";
import { EditConfigurationProps, MarketApiConfiguration, MarketClientConfiguration } from "types";
import { MarketApiConfigurationTypes } from "./market-api.service";
import { MarketClientConfigurationTypes } from "./market-client.service";

export type MarketClientTab =  {
  data: MarketClientConfiguration | MarketApiConfiguration,
  name: string,
  title: string,
  isTabActive: boolean,
  type: MarketApiConfigurationTypes | MarketClientConfigurationTypes
}

@Injectable({
  providedIn: "root"
})
export class StateService {
  readonly #logger = new LoggerService(StateService)

  // Keeps track of the active trader tab
  readonly #activeTraderTab = new FormControl<MarketClientTab>({ } as MarketClientTab)

  // Keeps trade of the users trader tabs
  readonly #marketClientTabs = new FormControl<MarketClientTab[]>([])

  // If adding configuration, show available client providers
  readonly #addingConfiguration = new FormControl<boolean>(false)

  // If true, show market client configuration table
  readonly #showMarketClientConfigurationsTable = new FormControl<boolean>(false)

  // if editingConfiguration['isEditing'] is true, then show form to update client configuration
  readonly #editingConfiguration = new FormControl<EditConfigurationProps>({
    isEditing: false,
    type: undefined,
    clientData: undefined
  });

  get activeTraderTab() {
    return this.#activeTraderTab as FormControl<MarketClientTab>
  }
  get addingConfiguration() {
    return this.#addingConfiguration as FormControl<boolean>
  }
  get editingConfiguration() {
    return this.#editingConfiguration as FormControl<EditConfigurationProps>
  }
  get marketClientTabs() {
    return this.#marketClientTabs as FormControl<MarketClientTab[]>
  }
  get showMarketClientConfigurationsTable() {
    return this.#showMarketClientConfigurationsTable as FormControl<boolean>
  }

}
