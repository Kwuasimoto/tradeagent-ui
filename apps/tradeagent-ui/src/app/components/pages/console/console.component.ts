import { Component, OnInit } from "@angular/core";
import { SocketService } from "@tradeagent-ui/services";

@Component({
  selector: 'tradeagent-ui-console',
  template: ` <p>console works!</p> `,
  styles: [],
})
export class ConsoleComponent implements OnInit {

  constructor(private readonly socketService: SocketService) {

  }

  ngOnInit() {
    this.socketService.connect();
  }

}
