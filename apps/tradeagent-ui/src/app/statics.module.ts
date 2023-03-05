import {NgModule} from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { NgForOf, NgIf } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import {
  LayoutAccountComponent,
  LayoutAuthComponent,
  LayoutBaseComponent,
  LayoutTraderComponent,
  NavBarAuthComponent,
  NavBarBaseComponent,
  NavBarConsoleComponent
} from "./components";

const statics = [
  LayoutBaseComponent,
  LayoutAuthComponent,
  LayoutAccountComponent,
  LayoutTraderComponent,
  NavBarAuthComponent,
  NavBarBaseComponent,
  NavBarConsoleComponent
]

@NgModule({
  declarations: statics,
  imports: [
    AppRoutingModule,
    NgIf,
    MatIconModule,
    MatInputModule,
    NgForOf
  ],
})
export class StaticsModule {}
