import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PagesModule } from "./pages.module";
import { AppRoutingModule } from "./app-routing.module";
import { StaticsModule } from "./statics.module";
import { ConfigModule } from "@tradeagent-ui/config";
import { InitModule } from "@tradeagent-ui/init";
import { ServicesModule } from "@tradeagent-ui/services";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    PagesModule,
    AppRoutingModule,
    StaticsModule,
    ConfigModule,
    ServicesModule,
    InitModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

