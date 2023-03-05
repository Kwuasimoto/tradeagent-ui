import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "./auth.service";
import { DbService } from "./db.service";
import { UserService } from "./user.service";
import { HttpClientModule } from "@angular/common/http";
import { ImageService } from "./image.service";
import { SocketService } from "./socket.service";
import { MarketApiService } from "./market-api.service";
import { MarketClientService } from "./market-client.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [SocketService, MarketApiService, MarketClientService, AuthService, DbService, UserService, ImageService],
})
export class ServicesModule {}
