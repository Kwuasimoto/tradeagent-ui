import { Component } from '@angular/core';
import { MarketApiService, StateService } from "@tradeagent-ui/services";
import { MarketApiTableDatum } from "types";

@Component({
  selector: 'tradeagent-ui-api-table',
  template: `
    <div class="mx-auto w-full flex flex-col">
      <table class="table table-compact mx-auto">
        <thead class="bg-base-200">
        <th></th>
        <th>Provider</th>
        <th class="text-center">Name</th>
        <th class="text-center">Actions</th>
        </thead>
        <tbody>
        <ng-container *ngFor="let marketApiTableDatum of marketApiTableData; index as i">
          <tr class="bg-base-300">
            <td class="bg-base-300 text-center">
              <tradeagent-ui-market-api-activity-signal
                [marketApiConfiguration]="marketApiTableDatum"
              ></tradeagent-ui-market-api-activity-signal>
            </td>
            <td class="bg-base-300 text-center">
              <a [href]="marketApiTableDatum.providerWebsite" [title]="marketApiTableDatum.providerWebsite">
                <img class="hover:shadow-lg rounded-lg cursor-pointer"
                     [src]="marketApiTableDatum.providerBrandLogoBase64"
                     alt="Shoes" />
              </a>
            </td>
            <td class="bg-base-300 text-center">{{marketApiTableDatum.name}}</td>
            <td class="bg-base-300 text-center">
              <tradeagent-ui-market-api-table-actions
                [marketApiConfiguration]="marketApiTableDatum"
              ></tradeagent-ui-market-api-table-actions>
            </td>
          </tr>
        </ng-container>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class ApiTableComponent {

  constructor(
    private readonly marketApiService: MarketApiService,
    private readonly state: StateService
  ) {}

  get marketApiTableData() {
    return this.marketApiService.marketApiConfigurations.map(config => {
      const marketApiDatum = this.marketApiService.getMarketApiDatumByConfigurationType(config.type)
      return {
        ...config,
        providerBrandLogoBase64: marketApiDatum.providerBrandLogoBase64,
        providerWebsite: marketApiDatum.providerWebsite,
        provider: marketApiDatum.provider
      } as MarketApiTableDatum
    })
  }

  get addingConfiguration() {
    return this.state.addingConfiguration
  }

  setAddConfigurationState(state: boolean) {
    return this.state.addingConfiguration.setValue(state);
  }
}
