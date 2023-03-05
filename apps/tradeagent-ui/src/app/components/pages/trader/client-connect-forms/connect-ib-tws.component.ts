import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MarketClientConfiguration } from "types";
import {
  LoggerService,
  MarketClientConfigurationTypes,
  MarketClientService, StateService
} from "@tradeagent-ui/services";
import { v4 as uuid } from 'uuid'

export type MarketClientConfigurationForm = {
  [P in keyof MarketClientConfiguration]: FormControl<MarketClientConfiguration[P] | null>
}

@Component({
  selector: 'tradeagent-ui-connect-ib-tws',
  template: `
    <div class="card card-compact bg-base-300">
      <div class="card-title flex flex-col !mb-0">
        <img class="hover:shadow-lg rounded-lg" [src]="editingConfiguration.value.clientData!.providerBrandLogoBase64" alt="Shoes"/>
        <a [href]="editingConfiguration.value.clientData!.providerWebsite"
           class="cursor-pointer text-sm italic mr-2 ml-auto text-gray-700 hover:underline hover:text-gray-600">Help</a>
      </div>
      <div class="card-body !pt-0">
        <form class="!mt-0" [formGroup]="addConfigForm">
          <div class="form-group h-12">
            <label class="ml-1 italic" for="clientID">Name</label>
            <input type="text"
                   class="py-0.5 px-1 bg-base-300 form-control shadow-sm focus:outline-none focus:border-b focus:border-b-base-300/30 focus:bg-base-100/20 hover:bg-base-100/10"
                   formControlName="name">
          </div>
          <div class="form-group h-12">
            <label class="ml-1 italic" for="clientID">Client ID</label>
            <input type="text"
                   class="py-0.5 px-1 bg-base-300 form-control shadow-sm focus:outline-none focus:border-b focus:border-b-base-300/30 focus:bg-base-100/20 hover:bg-base-100/10"
                   formControlName="clientID">
          </div>
          <div class="form-group h-12">
            <label class="ml-1 italic" for="host">Host</label>
            <input type="text"
                   class="py-0.5 px-1 bg-base-300 form-control shadow-sm focus:outline-none focus:border-b focus:border-b-base-300/30 focus:bg-base-100/20 hover:bg-base-100/10"
                   formControlName="host">
          </div>
          <div class="form-group h-12">
            <label class="ml-1 italic" for="port">Port</label>
            <input type="text"
                   class="py-0.5 px-1 bg-base-300 form-control shadow-sm focus:outline-none focus:border-b focus:border-b-base-300/30 focus:bg-base-100/20 hover:bg-base-100/10"
                   formControlName="port">
          </div>
          <div (click)="submitConfiguration()" class="btn btn-sm mt-2 ml-1"> Save </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class ConnectIbTwsComponent {

  readonly #logger = new LoggerService(ConnectIbTwsComponent)
  readonly #addConfigForm = new FormGroup<MarketClientConfigurationForm>({
    name: new FormControl(""),
    id: new FormControl(uuid()),
    clientID: new FormControl(0),
    host: new FormControl("127.0.0.1"),
    port: new FormControl(7496),
    type: new FormControl(MarketClientConfigurationTypes.TWS)
  })

  constructor(
    private readonly marketClientService: MarketClientService,
    private readonly state: StateService
  ) {

  }

  get addConfigForm() {
    return this.#addConfigForm
  }

  get editingConfiguration() {
    return this.state.editingConfiguration;
  }

  submitConfiguration() {
    this.#logger.info("Trying to submit form data")
    /* do further validation here if necessary */
    const config = {
      ...this.#addConfigForm.value as MarketClientConfiguration
    }

    this.marketClientService.saveMarketClientConfiguration(config).subscribe({
      complete: () => {
        this.state.addingConfiguration.setValue(false)
        this.state.editingConfiguration.setValue({
          isEditing: false,
          type: undefined,
          clientData: undefined
        })
      }
    })
  }
}
