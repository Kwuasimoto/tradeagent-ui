import { Component } from '@angular/core';
import {
  LoggerService,
  MarketApiConfigurationTypes,
  MarketApiService,
  StateService
} from "@tradeagent-ui/services";
import { FormControl, FormGroup } from "@angular/forms";

import { MarketApiConfiguration, MarketApiConfigurationForm } from "types";
import { v4 as uuid } from "uuid";



@Component({
  selector: 'tradeagent-ui-connect-polygon',
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
            <label class="ml-1 italic" for="clientID">Api Key</label>
            <input type="text"
                   class="py-0.5 px-1 bg-base-300 form-control shadow-sm focus:outline-none focus:border-b focus:border-b-base-300/30 focus:bg-base-100/20 hover:bg-base-100/10"
                   formControlName="apiKey">
          </div>
          <div (click)="submitConfiguration()" class="btn btn-sm mt-2 ml-1"> Save </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class ConnectPolygonComponent {

  readonly #logger = new LoggerService(ConnectPolygonComponent)
  readonly #addConfigForm = new FormGroup<MarketApiConfigurationForm>({
    name: new FormControl(""),
    apiKey: new FormControl(""),
    type: new FormControl(MarketApiConfigurationTypes.Polygon),
  })

  constructor(
    private readonly marketApiService: MarketApiService,
    private readonly state: StateService
  ) {

  }

  get editingConfiguration() {
    return this.state.editingConfiguration;
  }

  get addConfigForm() {
    return this.#addConfigForm
  }

  submitConfiguration() {
    this.#logger.info("Trying to submit form data")
    /* do further validation here if necessary */
    const config = {
      ...this.#addConfigForm.value as MarketApiConfiguration
    }

    this.marketApiService.saveMarketApiConfiguration(config).subscribe({
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
