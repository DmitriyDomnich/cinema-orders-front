import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { map, Observable } from "rxjs";
import { AuthService } from "../core/auth.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.authState$.pipe(
      map((role) => {
        if (role === "admin") {
          return true;
        }

        return this.router.createUrlTree(["/"]);
      })
    );
  }
  constructor(private auth: AuthService, private router: Router) {}
}
