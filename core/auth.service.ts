import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

// export type AuthState = "logged in" | "none";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<boolean>(false);
  authState$ = this.authState.asObservable().pipe(
    shareReplay()
  );

  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.authState.next(true);
    }
  }

  login(email: string, password: string) {
    return this.http.post<string>(`${environment.api_url}/login`, {
      email, password
    }).pipe(
      tap(token => {
        localStorage.setItem('token', token)
        this.authState.next(true);
      }),
      catchError(err => {
        throw new Error(err);
      })
    );
  }
  register(email: string, password: string) {
    console.log('called');
    return this.http.post<string>(`${environment.api_url}/register`, {
      email, password
    }).pipe(
      tap(token => {
        localStorage.setItem('token', token)
        this.authState.next(true);
      }),
      catchError(err => {
        throw new Error(err);
      })
    )
  }
  logout() {
    this.authState.next(false);
    localStorage.removeItem('token');
  }
}
