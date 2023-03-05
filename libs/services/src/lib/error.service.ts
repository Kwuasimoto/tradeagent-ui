import { LoggerService } from "./logger.service";

export class ErrorService {
  constructor(private readonly logger: LoggerService) {
  }
  handleCatchError = (message: string, context: object = {}) => <T>(error: Error, caught: T) => {
    this.logger.warn(message, { error , ...context })
    return caught
  }
}
