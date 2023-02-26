import {Injectable} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";


@Injectable({
  providedIn: "root"
})
export class RouterService {


  constructor(
    private readonly router: Router
  ) {
  }

  go(command: string[], opts: NavigationExtras) {
    this.router.navigate(command, opts)
  }
}
