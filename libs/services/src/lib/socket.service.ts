import { Injectable } from "@angular/core";
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
    this.#socket = new WebSocket(this.config.wsUrl+"/trade-console", "ws")

    this.#socket.onopen = () => {
      this.#logger.info("WebSocket opened")
    }
    this.#socket.onmessage = (event: MessageEvent<string>) => {
      this.#logger.info("WebSocket message received:", { event })
    };

    this.#socket.onclose = (event: Event) => {
      this.#logger.info("WebSocket connection closed:", { event })
    };
  }

  send(message: string): void {
    this.#socket.send(message);
  }

  disconnect(): void {
    this.#socket.close();
  }
}
