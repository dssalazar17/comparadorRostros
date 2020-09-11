import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { CommunService } from './commun.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router,
    private communService: CommunService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    console.log(this.communService.isAuth())
    let authInfo = {
      authenticated: true// this.communService.isAuth()
    }

    if (!authInfo.authenticated) {
      this.router.navigate(["login"]);
      return false;
    }

    return true;
  }
}