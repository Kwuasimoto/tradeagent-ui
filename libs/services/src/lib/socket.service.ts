import {Injectable} from "@angular/core";
import { ConfigService } from "@tradeagent-ui/config";
import { LoggerService } from "./logger.service";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  readonly #logger = new LoggerService(SocketService)
  #socket!: WebSocket;

  constructor(private readonly config: ConfigService) {
  }

  connect() {
    this.#logger.info(`Attempting to connect ws to: [${this.config.wsUrl}]`)
    this.#socket = new WebSocket(this.config.wsUrl+"/ws")
    this.#socket.onopen = (event) => {
      console.log('WebSocket connection opened');
    };

    this.#socket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
    };

    this.#socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };
  }

  send(message: string): void {
    this.#socket.send(message);
  }

  disconnect(): void {
    this.#socket.close();
  }
}
