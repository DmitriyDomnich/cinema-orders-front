import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  catchError,
  finalize,
  first,
  shareReplay,
  tap,
} from "rxjs";
import { environment } from "src/environments/environment";

export type Role = "admin" | "client" | "none";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authState = new BehaviorSubject<Role>("none");
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem("token");
    if (token) {
      this.checkUser(token).subscribe({
        next: (isAdmin) => {
          if (isAdmin) {
            this.authState.next("admin");
          } else {
            this.authState.next("client");
          }
        },
      });
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string; isAdmin: boolean }>(
        `${environment.apiUrl}/login`,
        {
          email,
          password,
        }
      )
      .pipe(
        tap(({ token, isAdmin }) => {
          localStorage.setItem("token", token);
          if (isAdmin) {
            this.authState.next("admin");
          } else {
            this.authState.next("client");
          }
        }),
        catchError((err) => {
          throw new Error(err);
        })
      );
  }
  register(email: string, password: string) {
    return this.http
      .post<string>(`${environment.apiUrl}/register`, {
        email,
        password,
      })
      .pipe(
        tap((token) => {
          localStorage.setItem("token", token);
          this.authState.next(`client`);
        }),
        catchError((err) => {
          throw new Error(err);
        })
      );
  }
  logout() {
    this.authState.next(`none`);
    localStorage.removeItem("token");
  }
  private checkUser(token: string) {
    return this.http.get<boolean>(`${environment.apiUrl}/check-role`, {
      headers: {
        Authorization: token,
      },
    });
  }
}
