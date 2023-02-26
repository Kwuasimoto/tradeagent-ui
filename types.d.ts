import {FormControl} from "@angular/forms";
import {NavigationExtras} from "@angular/router";

export type MessageContext = string | number | object

export interface User {
  id?: string,
  name: string,
  email: string,
  password: string,
  createdAt: string,
}

export interface Auth {
  userID?: string
}

export interface LoginForm {
  username: FormControl<string | null>
  password: FormControl<string | null>
}

export interface RegisterForm extends LoginForm {
  email: FormControl<string | null>
}

export interface HTMLAnchorLink {
  navCommand: string[],
  navOpts: NavigationExtras,
  label: string,
  matIcon?: string,
}
