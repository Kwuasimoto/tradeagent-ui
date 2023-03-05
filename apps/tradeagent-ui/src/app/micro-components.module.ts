import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import {
  MarketApiActivitySignalComponent,
  MarketApiTableActionsComponent,
  MarketClientActivityRouterComponent,
  MarketClientTableActionsComponent,
  MarketClientTraderActionsComponent
} from "./components";
const microComponents = [
  MarketClientActivityRouterComponent,
  MarketClientTableActionsComponent,
  MarketClientTraderActionsComponent,
  MarketApiActivitySignalComponent,
  MarketApiTableActionsComponent
]

@NgModule({
  declarations: microComponents,
  exports: microComponents,
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class MicroComponentsModule { }
