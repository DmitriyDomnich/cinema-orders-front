import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { BookingService } from "../core/booking.service";
import { IRoom } from "../core/models/room-model";
import { ISeat } from "../core/models/seat-model";
import { ISession } from "../core/models/session-model";
import { SessionBookingComponent } from "./session-booking/session-booking.component";
import { SESSIONS_TOKEN, TicketsCache } from "./sessions-injection-token";

@Component({
  selector: "session",
  templateUrl: "./session.component.html",
  styleUrls: ["./session.component.scss"],
  providers: [BookingService],
})
export class SessionComponent implements OnInit {
  session$: Observable<ISession>;
  seats$: Observable<ISeat[]>;
  cachedSeats$: Observable<ISeat[] | undefined>;
  room: IRoom;

  constructor(
    private route: ActivatedRoute,
    @Inject(SESSIONS_TOKEN)
    public sessionsCache: TicketsCache,
    public viewContainerRef: ViewContainerRef
  ) {}

  addSeatsToCache(seats: ISeat[]) {
    const sessionId = this.route.snapshot.paramMap.get("id")!;
    this.sessionsCache.set(sessionId, {
      tickets: seats,
    });
    console.log(this.sessionsCache);
  }

  ngOnInit(): void {
    this.cachedSeats$ = this.route.paramMap.pipe(
      map((paramMap) => this.sessionsCache.get(paramMap.get("id")!)?.tickets)
    );
    this.session$ = this.route.data.pipe(map(({ session }) => session));
    this.seats$ = this.route.data.pipe(
      tap(({ seats }) =>
        setTimeout(() => (console.log(seats.room), (this.room = seats.room)))
      ),
      map(({ seats }) => seats.seats)
    );
  }
}
