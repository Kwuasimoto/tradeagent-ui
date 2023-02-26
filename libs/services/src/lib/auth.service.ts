import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, tap} from "rxjs";
import {Auth, LoginForm, RegisterForm} from 'types';
import {ConfigService} from "@tradeagent-ui/config";
import {LoggerService} from "./logger.service";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #logger = new LoggerService(AuthService)
  readonly #auth: Auth = {
    userID: undefined
  }

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService,
  ) {
  }

  login = (loginForm: FormGroup<LoginForm>) => {
    this.#logger.info("Logging in user with data:", { data: loginForm.value })
    return this.http.post<Auth>(this.config.dbUrl+"/auth/login", loginForm.value, {
      withCredentials: true,
      responseType: "json"
    }).pipe(tap(auth => {
      this.#auth.userID = auth.userID;
    }))
  }

  register = (registerForm: FormGroup<RegisterForm>) => {
    this.#logger.info("Logging in user with data:", {data: registerForm.value})
    return this.http.post<Auth>(this.config.dbUrl + "/auth/register", registerForm.value, {
      withCredentials: true,
      responseType: "json"
    }).pipe(tap(auth => {
      this.#auth.userID = auth.userID;
    }))
  }

  getSession = (): Promise<Auth> => {
    this.#logger.info("Fetching User Session")
    return firstValueFrom(this.http.get<Auth>(this.config.dbUrl+"/auth/session", {
      withCredentials: true,
      responseType: "json"
    }).pipe(tap(auth => {
      this.#auth.userID = auth.userID;
    })))
  }

  setSession = (auth: Auth) => {
    this.#logger.info("Setting User Session", { auth })
    if(!auth.userID) {
      throw new Error("Failed to set authentication, no [userId] on supplied argument [auth].")
    } else {
      this.#auth.userID = auth.userID;
    }
  }

  getAuth = () => this.#auth;
  isAuthenticated = () => this.#auth ? this.#auth.userID !== undefined : false

}
