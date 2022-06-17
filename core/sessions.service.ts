import { HttpClient, HttpContext, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IGenre } from "./models/genre-model";
import { IMovie } from "./models/movie-model";
import { ISession } from "./models/session-model";
import { IStaff } from "./models/staff-model";

interface SessionsResponse {
  sessions: CurrentSession[];
  length: number;
}
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

  createSession(mId: string, date: Date) {
    return this.http.post<void>(
      `${environment.apiUrl}/session`,
      {
        mId,
        date,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token")!,
        },
      }
    );
  }

  updateSession(id: string, body: { date?: Date; mId?: string }) {
    return this.http.put<void>(`${environment.apiUrl}/session`, body, {
      params: {
        id,
      },
      headers: {
        Authorization: localStorage.getItem("token")!,
      },
    });
  }

  deleteSession(id: string) {
    return this.http.delete(`${environment.apiUrl}/session`, {
      headers: {
        Authorization: localStorage.getItem("token")!,
      },
      body: {
        id,
      },
    });
  }

  getSessionsByTerm(term: string): Observable<{ id: string; name: string }[]> {
    return this.http.get<{ id: string; name: string }[]>(
      `${environment.apiUrl}/sessions`,
      {
        params: {
          term,
        },
      }
    );
  }

  getSessionById(id: string): Observable<ISession> {
    return this.http
      .get<any>(`${environment.apiUrl}/session`, {
        params: {
          id,
        },
      })
      .pipe(
        map((data) => ({
          id: data.id,
          date: data.date,
          movie: {
            ...data,
            id: data.m_id,
            actors: data.actors.map((actor: any) => ({
              id: actor.name,
              name: `${actor.name} ${actor.surname}`,
            })),
            directors: data.directors.map((director: any) => ({
              id: director.name,
              name: `${director.name} ${director.surname}`,
            })),
          },
        }))
      );
  }

  getGenres() {
    return this.http.get<IGenre[]>(`${environment.apiUrl}/genres`);
  }

  getSessions(
    indexOffset = "0",
    genreIds?: string,
    date?: number,
    limit = true
  ): Observable<{ length: number; sessions: ISession[] }> {
    let params = new HttpParams().append("offset", +indexOffset);
    if (genreIds) {
      params = params.append("genres", genreIds);
    }
    if (date) {
      params = params.append("date", date);
    }
    if (!limit) {
      params = params.append("noLimit", true);
    }

    return this.http
      .get<SessionsResponse>(`${environment.apiUrl}/current-sessions`, {
        params,
      })
      .pipe(
        map(({ length, sessions }) => {
          return {
            sessions: sessions.map((data) => ({
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
            })),
            length,
          };
        })
      );
  }
}
