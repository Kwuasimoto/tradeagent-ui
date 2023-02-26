import { Component } from '@angular/core';

@Component({
  selector: 'tradeagent-ui-layout-account',
  template: `
    <div class="flex flex-col h-full">
      <tradeagent-ui-nav-bar-base></tradeagent-ui-nav-bar-base>
      <div class="w-full flex h-full">
        <div class="w-1/6 bg-base-200"></div>
        <div class="w-full"><router-outlet></router-outlet></div>
        <div class="w-1/6 bg-base-200"></div>
      </div>
    </div>
  `,
  styles: [],
})
export class LayoutAccountComponent {}
