import { Component, OnInit } from "@angular/core";
import { map, Observable } from "rxjs";
import { ISession } from "../core/models/session-model";
import { SessionsService } from "../core/sessions.service";

@Component({
  selector: "admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  sessions$: Observable<ISession[]>;

  trackBy(index: number, item: ISession) {
    return item.id;
  }

  ngOnInit(): void {
    this.sessions$ = this.sessionsService
      .getSessions(undefined, undefined, undefined, false) //todo: refactor to object
      .pipe(map(({ sessions }) => sessions));
  }
  constructor(private sessionsService: SessionsService) {}
}
