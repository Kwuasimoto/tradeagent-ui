import * as j from 'joi'
import { Injectable } from "@angular/core";
import { RegexService } from "./regex.service";
import { FormGroup } from "@angular/forms";
import { omitBy, pickBy } from "lodash";

@Injectable({
  providedIn: "root"
})
export class JoiObjectValidationService {

  private readonly loginFormValidator = j.object({
    email: j.string()
      .required()
      .email({ tlds: { allow: false } })
      .min(5) // _@_._
      .max(63)
      .pattern(this.regex.emailRegex),
    password: j.string()
      .required()
      .min(7)
      .max(32)
      .pattern(this.regex.passwordRegex)
  });
  private readonly registerFormValidator = j.object({
    username: j.string()
      .required()
      .min(2)
      .max(32)
      .pattern(this.regex.usernameRegex)
    // phone: j.string()
    //   .required()
    //   .min(8)
    //   .max(16)
  }).concat(this.loginFormValidator);

  constructor(private readonly regex: RegexService) {
  }

  validateRegisterForm(form: FormGroup): j.ValidationResult {
    const omitted = this.omitByKeys(form, ["phone"]);
    return this.registerFormValidator.validate(omitted);
  }

  validateLoginForm(form: FormGroup): j.ValidationResult {
    return this.loginFormValidator.validate(this.pickByKeys(form, ["email", "password"]));
  }

  private pickByKeys(form: FormGroup, keys: string[]) {
    return pickBy(form.getRawValue(), (v, k) => keys.includes(k));
  }

  private omitByKeys(form: FormGroup, keys: string[]) {
    return omitBy(form.getRawValue(), (v, k) => keys.includes(k));
  }
}
