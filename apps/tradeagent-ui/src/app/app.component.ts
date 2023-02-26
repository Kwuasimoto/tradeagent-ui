import { Component } from '@angular/core';

@Component({
  selector: 'tradeagent-ui-root',
  template: `
    <div class="h-full">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`

  `],
})
export class AppComponent {
  title = 'tradeagent-ui';
}
