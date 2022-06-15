import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PopoverDirective } from "ngx-bootstrap/popover";
import { EMPTY, first, Observable, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/core/auth.service";
import { BookingService } from "src/app/core/booking.service";
import { ISeat } from "src/app/core/models/seat-model";

@Component({
  selector: "session-booking",
  templateUrl: "./session-booking.component.html",
  styleUrls: ["./session-booking.component.scss"],
})
export class SessionBookingComponent implements OnInit {
  @Input() set cachedSeats(cachedSeats: ISeat[] | undefined) {
    console.log(cachedSeats);
    if (cachedSeats) {
      this.bookingService.addSeat(...cachedSeats);
    }
  }
  @Output() onCachingCalled = new EventEmitter<ISeat[]>();
  @Output() onBookingSuccess = new EventEmitter<void>();
  @ViewChild(PopoverDirective) popover: PopoverDirective;

  seatsBooked$: Observable<ISeat[]>;

  constructor(
    private auth: AuthService,
    public bookingService: BookingService,
    public route: ActivatedRoute,
    public elRef: ElementRef<HTMLElement>
  ) {}

  addToCache() {
    this.seatsBooked$
      .pipe(
        first(),
        tap((seats) => this.onCachingCalled.emit(seats))
      )
      .subscribe();
  }

  addToBucket() {
    this.auth.authState$
      .pipe(
        first(),
        switchMap((isLogged) => {
          if (isLogged) {
            return this.seatsBooked$.pipe(first());
          }
          this.popover.show();

          return EMPTY;
        }),
        switchMap((seats) => {
          return this.bookingService
            .addTicketsToBucket(seats)
            .pipe(tap((_) => this.onBookingSuccess.emit()));
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.seatsBooked$ = this.bookingService.seats$;
  }
  trackBy(index: number, item: ISeat) {
    return item.id;
  }
}
