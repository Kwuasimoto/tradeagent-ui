import { Component } from "@angular/core";
import {
  MarketClientConnectionActions,
  MarketClientService,
  StateService
} from "@tradeagent-ui/services";
import { MarketClientTableDatum } from "types";

@Component({
  selector: 'tradeagent-ui-client-table',
  template: `
    <div class="mx-auto w-full flex flex-col">
      <div (click)="setAddConfigurationState(!addingConfiguration.value)" title="Add Market Client Configuration" class="btn btn-sm bg-base-200"><mat-icon>add</mat-icon></div>
      <table class="table table-compact mx-auto">
        <thead class="bg-base-200">
        <th></th>
        <th>Provider</th>
        <th class="text-center">ClientID</th>
        <th class="text-center">Name</th>
        <th class="text-center">Host</th>
        <th class="text-center">Port</th>
        <th class="text-center">Actions</th>
        </thead>
        <tbody>
        <ng-container *ngFor="let marketClientTableDatum of marketClientTableData; index as i">
          <tr class="bg-base-300">
            <td class="bg-base-300 text-center">
              <tradeagent-ui-market-client-activity-router
                [marketClientConfiguration]="marketClientTableDatum"
              ></tradeagent-ui-market-client-activity-router>
            </td>
            <td class="bg-base-300 text-center">
              <a [href]="marketClientTableDatum.providerWebsite" [title]="marketClientTableDatum.providerWebsite">
                <img class="hover:shadow-lg rounded-lg cursor-pointer"
                     [src]="marketClientTableDatum.providerBrandLogoBase64"
                     alt="Shoes" />
              </a>
            </td>
            <td class="bg-base-300 text-center">{{marketClientTableDatum.clientID}}</td>
            <td class="bg-base-300 text-center">{{marketClientTableDatum.name}}</td>
            <td class="bg-base-300 text-center">{{marketClientTableDatum.host}}</td>
            <td class="bg-base-300 text-center">{{marketClientTableDatum.port}}</td>
            <td class="bg-base-300 text-center">
              <tradeagent-ui-market-client-table-actions
                [marketClientConfiguration]="marketClientTableDatum"
              ></tradeagent-ui-market-client-table-actions>
            </td>
          </tr>
        </ng-container>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class ClientTableComponent {

  constructor(
    private readonly marketClientService: MarketClientService,
    private readonly state: StateService,
  ) {
  }

  get marketClientTableData() {
    return this.marketClientService.marketClientConfigurations.map(config => {
      const marketClientDatum = this.marketClientService.getMarketClientDatumByConfigurationType(config.type)
      return {
        ...config,
        providerBrandLogoBase64: marketClientDatum.providerBrandLogoBase64,
        providerWebsite: marketClientDatum.providerWebsite,
        provider: marketClientDatum.provider
      } as MarketClientTableDatum
    })
  }

  get addingConfiguration() {
    return this.state.addingConfiguration
  }

  setAddConfigurationState(state: boolean) {
    return this.state.addingConfiguration.setValue(state);
  }
}
