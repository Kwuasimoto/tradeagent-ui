import { Component } from '@angular/core';

@Component({
  selector: 'tradeagent-ui-nav-bar-auth',
  template: `
    <div class="ml-2 mb-1">
      <div class="pt-1 mx-auto">
        <a title="Home" [routerLink]="['/']" class="text-2xl">TradeAgent Portal</a>
      </div>
    </div>
  `,
  styles: [],
})
export class NavBarAuthComponent {}
