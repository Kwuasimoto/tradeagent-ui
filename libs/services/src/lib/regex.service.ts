import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RegexService {
  emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  usernameRegex = /^((?=.*?[A-Z])|(?=.*?[a-z])|(?=.*?[0-9]))(?!.*?[{}()[\],;'"+]).{1,33}$/;
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,33}$/;
}
