import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "./auth.service";
import { DbService } from "./db.service";
import { UserService } from "./user.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [AuthService, DbService, UserService],
})
export class ServicesModule {}
