import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { merge } from 'lodash';
import {AuthService, LoggerService} from "@tradeagent-ui/services";
import {LoginForm, RegisterForm} from "types";
import {Router} from "@angular/router";

@Component({
  selector: 'tradeagent-ui-auth',
  template: `
    <div class="w-96 bg-accent card pt-2 text-primary-content">
      <div class="flex">
        <label class="ml-3 px-1 text-xl">Login Portal</label>
        <ng-container *ngIf="!isNewUser; else showLogin">
          <button (click)="toggleNewUser()"
                  class="ml-auto mr-3 px-1 w-24 border-b border-b-base-300/20 hover:border-b-base-300/30 hover:bg-accent-focus/10 active:bg-accent-focus/20 rounded-md">
            Register
          </button>
        </ng-container>
        <ng-template #showLogin>
          <button (click)="toggleNewUser()"
                  class="ml-auto mr-3 px-1 w-24 border-b border-b-base-300/20 hover:border-b-base-300/30 hover:bg-accent-focus/10 active:bg-accent-focus/20 rounded-md">
            Login
          </button>
        </ng-template>
      </div>
      <form class="mx-auto flex flex-col" [formGroup]="isNewUser ? registerForm : loginForm">
        <ng-container *ngIf="isNewUser">
          <div class="form-group h-12 mt-1">
            <label class="ml-1 italic" for="email">Email</label>
            <input type="text"
                   class="py-0.5 px-1 bg-accent form-control shadow-sm focus:outline-none focus:border-b focus:border-b-base-300/30 focus:bg-accent-focus/20 hover:bg-accent-focus/10"
                   formControlName="email">
          </div>
        </ng-container>
        <div class="form-group h-12 mt-1">
          <label class="ml-1 italic" for="username">Username</label>
          <input type="text"
                 class="py-0.5 px-1 bg-accent form-control shadow-sm focus:outline-none focus:border-b focus:border-b-base-300/30 focus:bg-accent-focus/20 hover:bg-accent-focus/10"
                 formControlName="username">
        </div>
        <div class="form-group h-12 mt-1">
          <label class="ml-1 italic" for="password">Password</label>
          <input type="password"
                 class="py-0.5 px-1 bg-accent form-control shadow-sm focus:outline-none focus:border-b focus:border-b-base-300/30 focus:bg-accent-focus/20 hover:bg-accent-focus/10"
                 formControlName="password">
        </div>
        <ng-container *ngIf="!isNewUser; else registerButton">
          <button (click)="onSubmit()"
                  class="w-1/2 mx-auto mt-3.5 mb-2.5 w-24 shadow !text-primary-content hover:bg-accent-focus/10 active:bg-accent-focus/20 rounded-md"
                  >Login
          </button>
        </ng-container>
        <ng-template #registerButton>
          <button (click)="onSubmit()"
                  class="w-1/2 mx-auto mt-3.5 mb-2.5 w-24 shadow !text-primary-content hover:bg-accent-focus/10 active:bg-accent-focus/20 rounded-md"
                  >Register
          </button>
        </ng-template>
      </form>
    </div>
  `,
  styles: [],
})
export class AuthComponent  {
  readonly #logger = new LoggerService(AuthComponent)

  readonly #loginControls = {
    username: new FormControl("tdank", [Validators.required]),
    password: new FormControl("secreT12#", [Validators.required])
  }

  readonly #registerControls = {
    email: new FormControl("test@gmail.com", [Validators.required])
  }

  readonly loginForm: FormGroup<LoginForm> = this.fb.group(this.#loginControls)
  readonly registerForm: FormGroup<RegisterForm> = this.fb.group(merge(this.#registerControls, this.#loginControls));
  isNewUser = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  onSubmit() {
    if(!this.registerForm.valid) return;
    this.isNewUser ?
      this.auth.register(this.registerForm).subscribe({
        error: err => this.#logger.warn("Error registering user", { err }),
        next: loginResult => {
          this.#logger.info("Registered User!", { loginResult })
        }
      }) :
      this.auth.login(this.loginForm).subscribe({
        error: err => this.#logger.warn("Error logging in user", { err }),
        next: loginResult => {
          this.#logger.info("Logged user in!", { loginResult })
          this.router.navigate(["/"], { replaceUrl: true })
        }
      })
  }

  toggleNewUser() {
    this.isNewUser = !this.isNewUser
  }
}
