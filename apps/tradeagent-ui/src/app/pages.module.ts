import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf } from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {AppRoutingModule} from "./app-routing.module";

import { MicroComponentsModule } from "./micro-components.module";
import {
  AccountComponent,
  ApiTableComponent,
  ApiConfigFormComponent,
  AuthComponent,
  TraderTabularMenuComponent,
  ClientConfigFormComponent,
  ClientConnectComponent,
  ClientTableComponent,
  ConnectIbTwsComponent,
  ConnectPolygonComponent,
  HomeComponent,
  IbTraderWindowComponent,
  PolygonTraderWindowComponent,
  TraderComponent,
  TraderWindowHeaderComponent,
  TraderWindowFactoryComponent
} from "./components";


const pages = [
  AccountComponent,
  ApiTableComponent,
  ApiConfigFormComponent,
  AuthComponent,
  TraderTabularMenuComponent,
  ClientConfigFormComponent,
  ClientConnectComponent,
  ClientTableComponent,
  ConnectIbTwsComponent,
  ConnectPolygonComponent,
  HomeComponent,
  IbTraderWindowComponent,
  PolygonTraderWindowComponent,
  TraderComponent,
  TraderWindowHeaderComponent,
  TraderWindowFactoryComponent
]

@NgModule({
  declarations: pages,
  imports: [
    MicroComponentsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule,
    MatInputModule,
    AsyncPipe,
    NgForOf,
  ]
})
export class PagesModule {}
