import { Component } from "@angular/core";
import {
  ImageService,
  MarketClientService, StateService, MarketApiService, LoggerService
} from "@tradeagent-ui/services";
import { MarketProviderInformation } from "types";

@Component({
  selector: 'tradeagent-ui-client-connect',
  template: `
    <div class="flex flex-col w-full">
      <ng-template #imagesLoading>
        <div> Providers Loading... </div>
      </ng-template>
      <ng-container *ngIf="marketDataLoaded; else imagesLoading">
        <div class="mb-2 flex justify-center w-fit mx-auto border-b border-b-base-300 hover:border-base-content/10">
          <p class="px-1 pb-0.5"> Connect to a Client </p>
          <mat-icon class="ml-1.5 h-5 w-5" fontIcon="share"></mat-icon>
        </div>
        <ul>
          <ng-container *ngFor="let client of marketClients" >
            <li (click)="setEditConfiguration(client)">
              <div [title]="client.provider" class="card w-80 bg-base-200 hover:bg-base-300/30 shadow-xl">
                <figure class="flex flex-col px-5 pb-8 pt-2">
                  <a [href]="client.providerWebsite" class="italic underline cursor-pointer text-gray-700 ml-auto hover:text-gray-600 h-fit">
                    <mat-icon fontIcon="language"></mat-icon>
                  </a>
                  <img class="hover:shadow-lg rounded-lg cursor-pointer" [src]="client.providerBrandLogoBase64" alt="Shoes"/>
                </figure>
              </div>
            </li>
          </ng-container>
        </ul>
        <div class="mb-2 flex justify-center w-fit mx-auto border-b border-b-base-300 hover:border-base-content/10">
          <p class="px-1 pb-0.5"> Connect to an API </p>
          <mat-icon class="ml-1.5 h-5 w-5" fontIcon="share"></mat-icon>
        </div>
        <ul>
          <ng-container *ngFor="let client of apiClients" >
            <li (click)="setEditConfiguration(client)">
              <div [title]="client.provider" class="card w-80 bg-base-200 hover:bg-base-300/30 shadow-xl">
                <figure class="flex flex-col px-5 pb-8 pt-2">
                  <a [href]="client.providerWebsite" class="italic underline cursor-pointer text-gray-700 ml-auto hover:text-gray-600 h-fit">
                    <mat-icon fontIcon="language"></mat-icon>
                  </a>
                  <img class="hover:shadow-lg rounded-lg cursor-pointer" [src]="client.providerBrandLogoBase64" alt="Shoes"/>
                </figure>
              </div>
            </li>
          </ng-container>
        </ul>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class ClientConnectComponent {
  readonly #logger = new LoggerService(ClientConnectComponent)

  constructor(
    private readonly imgService: ImageService,
    private readonly marketClientService: MarketClientService,
    private readonly marketApiService: MarketApiService,
    private readonly state: StateService
  ) {
  }

  get marketClients() {
    return this.marketClientService.marketClientInformation;
  }

  get apiClients() {
    return this.marketApiService.marketApiInformation
  }

  get marketDataLoaded () {
    return this.marketClientService.marketDataLoaded;
  }

  setEditConfiguration(client: MarketProviderInformation) {
    this.state.editingConfiguration.setValue({
      type: client.providerType,
      clientData: client,
      isEditing: !this.state.editingConfiguration.value.isEditing,
    })
    this.#logger.info("Setting editing state", {state: this.state.editingConfiguration})
  }
}
