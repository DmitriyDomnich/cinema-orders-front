import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import {
  first,
  fromEvent,
  map,
  mergeAll,
  mergeMap,
  Observable,
  tap,
  toArray,
} from "rxjs";
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
    return this.sessionsService
      .getSessions(route.queryParamMap.get("offset") || "0")
      .pipe(
        mergeAll(),
        mergeMap((session) => {
          const img = new Image();
          img.src = session.movie.coverUrl;
          return fromEvent(img, "load").pipe(
            map((_) => session),
            first()
          );
        }),
        toArray(),
        tap((stmh) => console.log(stmh))
      );
  }
}
