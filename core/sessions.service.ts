import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IGenre } from "./models/genre-model";
import { ISession } from "./models/session-model";
import { IStaff } from "./models/staff-model";

interface CurrentSession {
  id: string;
  date: Date;
  m_id: string;
  name: string;
  duration: number;
  cover_url: string;
  country: string;
  age_restriction: number;
  genres: IGenre[];
  directors: (IStaff<"Director"> & { surname: string })[];
}

@Injectable({
  providedIn: "root",
})
export class SessionsService {
  constructor(private http: HttpClient) {}

  getSessionsCount(): Observable<number> {
    return this.http
      .get<{ length: number }[]>(`${environment.api_url}/sessions-count`)
      .pipe(
        tap(console.log),
        map(({ length }) => length)
      );
  }

  getSessions(indexOffset = "0"): Observable<ISession[]> {
    return this.http
      .get<CurrentSession[]>(`${environment.api_url}/current-sessions`, {
        params: {
          offset: +indexOffset,
        },
      })
      .pipe(
        map((dataArr) =>
          dataArr.map((data) => ({
            id: data.id,
            date: data.date,
            movie: {
              id: data.m_id,
              name: data.name,
              duration: data.duration,
              coverUrl: data.cover_url,
              ageRestriction: data.age_restriction,
              genres: data.genres,
              country: data.country,
              directors: data.directors.map((director) => ({
                ...director,
                name: `${director.name} ${director.surname}`,
              })),
            },
          }))
        )
      );
  }
}
