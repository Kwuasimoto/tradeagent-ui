import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService, LoggerService, UserService} from "@tradeagent-ui/services";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@tradeagent-ui/config";
import {Router} from "@angular/router";

function appInitializer(httpClient: HttpClient, config: ConfigService, authService: AuthService, router: Router) {
  const logger = new LoggerService(UserService)
  return () => authService.getSession()
    .then(userAuthentication => {
      authService.setSession(userAuthentication)
      return new UserService(logger, httpClient, config, authService);
    })
    .catch(err => {
      logger.warn("Failed to authenticate [UserService] in [appInitializer]", {err})
      router.navigate(["auth"], { replaceUrl: true })
      return;
    } )
}

@NgModule({
  imports: [CommonModule],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: appInitializer,
    deps: [HttpClient, ConfigService, AuthService, Router],
    multi: true,
  }]
})
export class InitModule {}
