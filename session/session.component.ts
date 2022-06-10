import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { IRoom } from "../core/models/room-model";
import { ISeat } from "../core/models/seat-model";
import { ISession } from "../core/models/session-model";

@Component({
  selector: "session",
  templateUrl: "./session.component.html",
  styleUrls: ["./session.component.scss"],
})
export class SessionComponent implements OnInit {
  session$: Observable<ISession>;
  seats$: Observable<ISeat[]>;
  room: IRoom;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.session$ = this.route.data.pipe(map(({ session }) => session));
    this.seats$ = this.route.data.pipe(
      tap(({ seats }) => setTimeout(() => (this.room = seats.room))),
      map(({ seats }) => seats.seats)
    );
  }
}
