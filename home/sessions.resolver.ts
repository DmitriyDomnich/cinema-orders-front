import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { ISession } from "../core/models/session-model";
import { SessionsService } from "../core/sessions.service";

@Injectable({
  providedIn: "root",
})
export class SessionsResolver implements Resolve<ISession[]> {
  constructor(private sessionsService: SessionsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ISession[]> {
    return this.sessionsService.getSessions(
      route.queryParamMap.get("offset") || "0"
    );
  }
}
