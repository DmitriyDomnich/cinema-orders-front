import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { first, fromEvent, map, Observable, switchMap, tap } from "rxjs";
import { ISession } from "../../core/models/session-model";
import { SessionsService } from "../../core/sessions.service";

@Injectable({
  providedIn: "root",
})
export class SessionResolver implements Resolve<ISession> {
  constructor(private sessionsService: SessionsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ISession> {
    return this.sessionsService.getSessionById(route.paramMap.get("id")!).pipe(
      switchMap((session) => {
        const img = new Image();
        img.src = session.movie.portraitUrl!;
        return fromEvent(img, "load").pipe(
          map((_) => session),
          first()
        );
      })
    );
  }
}
