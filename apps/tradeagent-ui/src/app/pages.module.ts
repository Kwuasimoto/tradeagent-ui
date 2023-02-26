import {NgModule} from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import {
  AuthComponent,
  AccountComponent,
  HomeComponent, ConsoleComponent
} from "./components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

const pages = [
  AuthComponent,
  AccountComponent,
  ConsoleComponent,
  HomeComponent,
]

@NgModule({
  declarations: pages,
    imports: [
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgIf,
      MatIconModule,
      MatInputModule
    ],
})
export class PagesModule {}
