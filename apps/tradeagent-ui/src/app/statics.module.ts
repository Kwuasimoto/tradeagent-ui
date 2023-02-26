import {NgModule} from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import {
  LayoutAccountComponent,
  LayoutAuthComponent,
  LayoutBaseComponent, NavBarAuthComponent,
  NavBarBaseComponent
} from "./components";
import {NgForOf, NgIf} from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { LayoutConsoleComponent } from "./components/static/layout-console/layout-console.component";

const statics = [
  LayoutBaseComponent,
  LayoutAuthComponent,
  LayoutAccountComponent,
  LayoutConsoleComponent,
  NavBarAuthComponent,
  NavBarBaseComponent
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
