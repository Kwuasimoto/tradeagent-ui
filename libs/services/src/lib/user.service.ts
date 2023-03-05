import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "types";
import {ConfigService} from "@tradeagent-ui/config";
import {AuthService} from "./auth.service";
import {LoggerService} from "./logger.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {

  readonly #logger = new LoggerService(UserService)
  #user?: User

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService,
    private readonly auth: AuthService
  ) {
    const authentication = auth.getAuth();

    if(!authentication.userID) {
      this.#logger.warn("No [userId] located on authentication")
      return;
    }

    this.#user = {
      ...(this.#user ?? {} as User),
      id: authentication.userID
    }
  }

  getUser = (): User | undefined => {
      if(!this.#user) return undefined
      return this.#user
  }

  setUserID = (userID: string) => {
    if(!userID) throw new Error("Supplied [userID] invalid")
    this.#user = {
      ...(this.#user ?? {} as User),
      id: userID
    }
  }
}
