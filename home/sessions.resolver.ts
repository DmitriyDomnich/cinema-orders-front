import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import {
  catchError,
  first,
  fromEvent,
  map,
  mergeAll,
  mergeMap,
  Observable,
  of,
  tap,
  toArray,
} from "rxjs";
import { ISession } from "../core/models/session-model";
import { SessionsService } from "../core/sessions.service";

@Injectable({
  providedIn: "root",
})
export class SessionsResolver
  implements Resolve<{ sessions: ISession[]; length: number }>
{
  constructor(private sessionsService: SessionsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ sessions: ISession[]; length: number }> {
    let lengthCount = 0;
    console.log(route.queryParamMap);

    return this.sessionsService
      .getSessions(
        route.queryParamMap.get("offset") || undefined,
        route.queryParamMap.get("genres") || undefined,
        +route.queryParamMap.get("date")! || undefined
      )
      .pipe(
        map(({ length, sessions }) => {
          lengthCount = length;
          return sessions;
        }),
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
        map((sessions) => ({
          sessions,
          length: lengthCount,
        }))
        // tap((stmh) => console.log(stmh))
      );
  }
}
