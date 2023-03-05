import { Component } from '@angular/core';

@Component({
  selector: 'tradeagent-ui-nav-bar-console',
  template: `
    <div class="bg-base-200">
      <div class="pt-1 pl-2">
        <a title="Home" [routerLink]="['/']" class="text-2xl">
          <mat-icon fontIcon="home"></mat-icon>
        </a>
      </div>
    </div>
  `,
  styles: [],
})
export class NavBarConsoleComponent {}
