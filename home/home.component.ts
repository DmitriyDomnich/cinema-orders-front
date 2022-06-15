import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { first, map, Observable } from "rxjs";
import { ISession } from "../core/models/session-model";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  sessions$: Observable<ISession[]>;
  carouselSessions$: Observable<ISession[]>;
  sessionsCount: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.carouselSessions$ = this.activatedRoute.data.pipe(
      first(),
      map(({ sessions }) => sessions.sessions)
    );
    this.sessions$ = this.activatedRoute.data.pipe(
      map(({ sessions }) => {
        setTimeout(() => (this.sessionsCount = sessions.length));
        return sessions.sessions;
      })
    );
  }
}
