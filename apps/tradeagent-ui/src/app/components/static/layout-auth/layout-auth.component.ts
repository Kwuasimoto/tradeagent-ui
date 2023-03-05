import { Component } from '@angular/core';

@Component({
  selector: 'tradeagent-ui-layout-auth',
  template: `
    <div class="flex flex-col h-full">
      <tradeagent-ui-nav-bar-auth></tradeagent-ui-nav-bar-auth>
      <div class="w-full flex h-full justify-center mt-4">
        <router-outlet></router-outlet>
      </div>
    </div>`,
  styles: [],
})
export class LayoutAuthComponent {}
