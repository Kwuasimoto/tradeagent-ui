import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ConfigService {

  readonly #dbUrl = "http://localhost:8081"

  get dbUrl() {
    return this.#dbUrl;
  }

}
