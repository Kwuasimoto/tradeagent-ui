import { Component } from '@angular/core';
import {AuthService, LoggerService, RouterService} from "@tradeagent-ui/services";
import {HTMLAnchorLink} from "types";



@Component({
  selector: 'tradeagent-ui-nav-bar-base',
  template: `
    <div class="flex justify-around mb-1">
      <div class="pt-1 mx-auto">
        <a title="Home" [routerLink]="['/']" class="text-2xl hover:text-primary-content/80">TradeAgent</a>
      </div>
      <div class="flex pt-2 pr-4 w-fit">
        <ng-container *ngIf="authService.isAuthenticated(); else notAuthenticated">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="p-1 hover:text-primary-content/80 focus:text-primary-content/90">
              <mat-icon fontIcon="menu"></mat-icon>
            </label>
            <ul tabindex="0" class="dropdown-content shadow bg-base-200 rounded-box w-52">
              <ng-container *ngFor="let anchorLink of getHTMLAnchorLinks(); index as i">
                <ng-container *ngIf="getSeparatorIndices().includes(i)">
                  <div class="h-0.5 w-full bg-base-100"></div>
                </ng-container>
                <li class="mx-1 my-0.5 cursor-pointer hover:bg-base-100/50 active:bg-base-100 rounded-box">
                  <a (click)="router.go(anchorLink.navCommand, anchorLink.navOpts)" class="!text-primary-content/70 ">
                    <div class="flex w-full justify-between">
                      <span class="ml-4">{{anchorLink.label}}</span>
                      <mat-icon class="mr-4" fontIcon="{{anchorLink.matIcon}}"></mat-icon>
                    </div>
                  </a>
                </li>
              </ng-container>
            </ul>
          </div>
        </ng-container>
        <ng-template #notAuthenticated>
          <a title="Account" [routerLink]="['/auth']"
             class="pl-2 cursor-pointer hover:border-b-base-300/75 hover:border-b">
            Login
          </a>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .dropdown-content {
      z-index: 1000;
      right: 0;
      margin-top: -1px;
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }
  `],
})
export class NavBarBaseComponent {
  readonly #logger = new LoggerService(NavBarBaseComponent)
  readonly #separatorIndices = [1]
  readonly #menuItemMatIconMap: HTMLAnchorLink[] = [
    { label: "Home", matIcon: "home", navCommand: ["/"], navOpts: { replaceUrl: true } },
    { label: "Account", matIcon: "person", navCommand: ["account"], navOpts: { replaceUrl: true } },
    { label: "Trader", matIcon: "panorama_wide_angle", navCommand: ["trader"], navOpts: { replaceUrl: true } }
  ]
  constructor(
    readonly authService: AuthService,
    readonly router: RouterService
  ) {
    this.#logger.info("Is user authenticated?", { data: authService.isAuthenticated() })
  }

  getHTMLAnchorLinks() {
    return this.#menuItemMatIconMap
  }

  getSeparatorIndices() {
    return this.#separatorIndices
  }
}
