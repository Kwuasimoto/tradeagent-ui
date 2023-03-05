import { Component } from "@angular/core";
import { MarketApiConfiguration, MarketClientConfiguration } from "types";
import {
  LoggerService,
  MarketApiService,
  MarketClientService,
  MarketClientTab,
  StateService
} from "@tradeagent-ui/services";
import { AppMemoryService } from "../../../../../../../libs/services/src/lib/app-memory.service";



@Component({
  selector: 'tradeagent-ui-trader-tabular-menu',
  template: `
    <div class="tabs bg-base-200">
      <ng-container *ngFor="let marketClientTab of marketClientTabs.value; index as i">
        <a (click)="selectTraderTab(marketClientTab)"
           class="tab tab-bordered {{marketClientTab.isTabActive ? 'tab-active' : ''}}">{{marketClientTab.name}}</a>
      </ng-container>

      <a class="tab tab-bordered">
        <div class="dropdown dropdown-hover">
          <label tabindex="0">
            <mat-icon>add</mat-icon>
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <ng-container *ngFor="let marketClientConfiguration of marketClientConfigurations; index as i">
              <li><a (click)="addTraderTab(marketClientConfiguration)" class="flex">
                <span>{{marketClientConfiguration.name}}</span>
                <mat-icon class="ml-auto {{marketClientConfiguration.isActive ? 'text-green-700' : 'text-red-700'}}">
                  router
                </mat-icon>
              </a></li>
            </ng-container>
            <ng-container *ngFor="let marketApiConfiguration of marketApiConfigurations; index as i">
              <li><a (click)="addTraderTab(marketApiConfiguration)" class="flex">
                <span>{{marketApiConfiguration.name}}</span>
                <mat-icon class="ml-auto {{marketApiConfiguration.canQuery ? 'text-green-700' : 'text-red-700'}}">
                  router
                </mat-icon>
              </a></li>
            </ng-container>
          </ul>
        </div>
      </a>

      <a (click)="displayMarketClientConfigurationsTable()"
         title="settings"
         class="ml-auto tab tab-bordered {{showMarketClientConfigurationsTable.value ? 'tab-active' : ''}}">
        <mat-icon>settings</mat-icon>
      </a>
    </div>
  `,
  styles: [],
})
export class TraderTabularMenuComponent {
  readonly #logger = new LoggerService(TraderTabularMenuComponent)

  readonly #tradeTabsLocalStorageKey = "tradeagent-ui-trader-tabs"

  constructor(
    private readonly marketClientService: MarketClientService,
    private readonly marketApiService: MarketApiService,
    private readonly state: StateService,
    private readonly memory: AppMemoryService
  ) {
    /* Load trader tabs from local storage */
    const marketClientTabsJSON = localStorage.getItem(this.#tradeTabsLocalStorageKey);
    this.state.marketClientTabs.setValue(marketClientTabsJSON ? JSON.parse(marketClientTabsJSON) : [])
    this.state.showMarketClientConfigurationsTable.setValue(false)
  }

  get showMarketClientConfigurationsTable() {
    return this.state.showMarketClientConfigurationsTable
  }

  get marketClientConfigurations() {
    return this.marketClientService.marketClientConfigurations
  }

  get marketApiConfigurations() {
    return this.marketApiService.marketApiConfigurations
  }

  get marketClientTabs() {
    return this.state.marketClientTabs
  }

  addTraderTab(config: MarketApiConfiguration | MarketClientConfiguration) {
    const newTab: MarketClientTab = {
      data: config,
      type: config.type,
      title: config.name,
      name: config.name,
      isTabActive: true,
    }
    this.deactivateCurrentTab();
    this.state.showMarketClientConfigurationsTable.setValue(false)
    this.state.marketClientTabs.value.push(newTab)
    this.memory.set("tradeagent-ui-trader-tabs", this.state.marketClientTabs.value)
  }

  displayMarketClientConfigurationsTable() {
    this.state.showMarketClientConfigurationsTable.setValue(true)
    this.state.addingConfiguration.setValue(false)
    this.state.editingConfiguration.setValue({
      isEditing: false,
    })
    this.deactivateCurrentTab();
  }

  selectTraderTab(marketClientTab: MarketClientTab) {
    // Show trader window
    this.state.showMarketClientConfigurationsTable.setValue(false)
    this.deactivateCurrentTab();
    // activate the targeted tab
    const targetIndex = this.state.marketClientTabs.value.findIndex(tab => tab === marketClientTab)
    this.state.marketClientTabs.value[targetIndex].isTabActive = true;
    this.state.activeTraderTab.setValue(marketClientTab)
    this.memory.update("tradeagent-ui-trader-tabs", this.state.marketClientTabs.value)
  }

  private deactivateCurrentTab() {
    // find the currently active tab
    const activeTab = this.state.marketClientTabs.value.find(tab => tab.isTabActive);
    if(activeTab) { // if found, deactivate
      activeTab.isTabActive = false
    }
  }
}
