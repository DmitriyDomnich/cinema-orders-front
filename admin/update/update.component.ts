import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
  tap,
} from "rxjs";
import { ISession } from "src/app/core/models/session-model";
import { MoviesService } from "src/app/admin/movies.service";
import { SessionsService } from "src/app/core/sessions.service";
import { IMovie } from "src/app/core/models/movie-model";
import { Location } from "@angular/common";
import { BsLocaleService } from "ngx-bootstrap/datepicker";

@Component({
  selector: "update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"],
})
export class UpdateComponent implements OnInit {
  session$: Observable<ISession>;
  movies$: Observable<IMovie[]>;
  initMovieId = "";
  term = "";
  id = "";
  date: Date;
  movie: IMovie;
  isComplete = false;

  constructor(
    private sessionsService: SessionsService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    public location: Location,
    private bsLocale: BsLocaleService
  ) {}

  update() {
    this.sessionsService
      .updateSession(this.id, {
        date: this.date,
        mId: this.initMovieId !== this.movie.id ? this.movie.id : undefined,
      })
      .subscribe({
        complete: () => (this.isComplete = true),
      });
  }

  ngOnInit(): void {
    this.bsLocale.use("uk");
    this.movies$ = new Observable((sub) => sub.next(this.term)).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((_) => this.moviesService.getMovieByTerm(this.term))
    );
    this.session$ = this.route.params.pipe(
      switchMap((param) => {
        this.id = param["id"];
        return this.sessionsService.getSessionById(this.id);
      }),
      tap(({ date, movie }) => {
        this.date = new Date(date);
        this.initMovieId = movie.id;
        this.movie = movie;
        this.term = movie.name;
      })
    );
  }
}
