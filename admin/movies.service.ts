import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IMovie } from "../core/models/movie-model";

@Injectable()
export class MoviesService {
  getMovieByTerm(term: string) {
    return this.http.get<IMovie[]>(`${environment.apiUrl}/movies`, {
      headers: {
        Authorization: localStorage.getItem("token")!,
      },
      params: {
        term,
      },
    });
  }

  constructor(private http: HttpClient) {}
}
