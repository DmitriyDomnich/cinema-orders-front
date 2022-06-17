import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
} from "rxjs";
import { IMovie } from "src/app/core/models/movie-model";
import { SessionsService } from "src/app/core/sessions.service";
import { MoviesService } from "../movies.service";

@Component({
  selector: "create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  movies$: Observable<IMovie[]>;

  term = "";
  movie: IMovie;
  date = new Date();
  isComplete = false;

  minDate = new Date();
  error: string | null = null;

  create() {
    try {
      if (this.date && this.movie) {
        this.sessionsService.createSession(this.movie.id, this.date).subscribe({
          complete: () => (this.isComplete = true),
        });
      } else {
        throw new Error("Установіть всі значення!");
      }
    } catch (err: any) {
      this.error = err.message;
      setTimeout(() => (this.error = null), 4000);
    }
  }

  ngOnInit(): void {
    this.bsLocale.use("uk");

    this.movies$ = new Observable((sub) => sub.next(this.term)).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((_) => this.moviesService.getMovieByTerm(this.term))
    );
  }
  constructor(
    private bsLocale: BsLocaleService,
    private moviesService: MoviesService,
    private sessionsService: SessionsService,
    public location: Location
  ) {}
}
