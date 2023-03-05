import { Component } from '@angular/core';

@Component({
  selector: 'tradeagent-ui-layout-trader',
  template: `
    <div class="w-full h-full flex flex-col">
      <tradeagent-ui-nav-bar-console></tradeagent-ui-nav-bar-console>
      <div class="w-full h-full justify-center">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [],
})
export class LayoutTraderComponent {}
