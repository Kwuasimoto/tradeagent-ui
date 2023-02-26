import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ConfigService {

  readonly #dbUrl = "http://localhost:8081"
  readonly #wsUrl = "ws://localhost:9002"

  get dbUrl() {
    return this.#dbUrl;
  }

  get wsUrl() {
    return this.#wsUrl
  }

}
