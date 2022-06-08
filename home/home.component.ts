import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { finalize, first, map, Observable, tap } from "rxjs";
import { ISession } from "../core/models/session-model";
import { SessionsService } from "../core/sessions.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  sessions$: Observable<ISession[]>;
  carouselSessions$: Observable<ISession[]>;
  sessionsCount$: Observable<number>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionsService: SessionsService
  ) {}

  ngOnInit(): void {
    this.sessionsCount$ = this.sessionsService
      .getSessionsCount()
      .pipe(tap(console.log));

    this.carouselSessions$ = this.activatedRoute.data.pipe(
      first(),
      map(({ sessions }) => sessions)
    );
    this.sessions$ = this.activatedRoute.data.pipe(
      map(({ sessions }) => sessions)
    );
  }
}
