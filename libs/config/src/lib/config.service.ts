import {Injectable} from "@angular/core";

export interface HttpOptions {
  withCredentials: boolean,
  responseType?: "json"
}

@Injectable({
  providedIn: "root"
})
export class ConfigService {

  readonly #dbUrl = "http://localhost:8081"
  readonly #wsUrl = "ws://localhost:8081"
  readonly #httpOptions: HttpOptions = {
    withCredentials: true,
    responseType: "json"
  }

  get dbUrl() {
    return this.#dbUrl;
  }

  get wsUrl() {
    return this.#wsUrl
  }

  get httpOptions() {
    return this.#httpOptions
  }

}
