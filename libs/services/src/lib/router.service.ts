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

  get url() {
    return this.router.url
  }
  go(command: string[], opts: NavigationExtras) {
    return this.router.navigate(command, opts)
  }

  reload(optsA?: NavigationExtras, optsB?: NavigationExtras) {
    this.router.navigateByUrl(this.router.url, optsA).then(() => {
      this.router.navigate([this.router.url], optsB)
    })
  }
}
