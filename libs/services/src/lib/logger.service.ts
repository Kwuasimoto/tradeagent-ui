import pino from 'pino'
import {MessageContext} from "types";

export class LoggerService {
  readonly #logger: pino.Logger
  readonly #className!: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(c: new (...args: any) => object) {
    this.#className = c.name
    this.#logger = pino({
      enabled: true,
      browser: {
        asObject: true,
      }
    })
  }

  info(msg: string, context?: MessageContext): void {
    this.#logger.info({data : context}, `[${this.#className}] ${msg}`)
  }

  warn(msg: string, context?: MessageContext): void {
    this.#logger.warn({data : context}, `[${this.#className}] ${msg}`)
  }
}
