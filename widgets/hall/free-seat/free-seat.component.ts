import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { filter, finalize, find, first, Subscription, tap } from "rxjs";
import { BookingService } from "src/app/core/booking.service";
import { ISeat } from "src/app/core/models/seat-model";
import { SeatComponent } from "../seat/seat.component";

@Component({
  selector: "free-seat",
  templateUrl: "./free-seat.component.html",
  styleUrls: ["./free-seat.component.scss"],
})
export class FreeSeatComponent
  extends SeatComponent
  implements OnInit, OnDestroy
{
  isFree = true;
  seat: ISeat;
  sub: Subscription;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private bookingService: BookingService,
    @Inject("BookedCount") private bookedCount: { value: number }
  ) {
    super();
  }
  @HostBinding("class") override get classes() {
    return `border-1 border rounded border-dark`;
  }
  @HostBinding("innerHTML") get textContent() {
    return this.isFree ? null : '<i class="bi bi-lock"></i>';
  }

  @HostListener("click") onClick() {
    if (this.elRef.nativeElement.classList.toggle("bg-warning")) {
      this.bookingService.addSeat(this.seat);
    } else {
      this.bookingService.removeSeat(this.seat.id);
    }
    this.isFree = !this.isFree;
  }
  ngOnInit(): void {
    this.bookingService.seats$
      .pipe(
        first(),
        tap(
          (seats) =>
            seats.find((seat) => seat.id === this.seat.id)?.isAvailable &&
            (this.elRef.nativeElement.classList.add("bg-warning"),
            (this.isFree = false))
        )
      )
      .subscribe();
    this.sub = this.bookingService.itemRemoved$
      .pipe(
        filter(
          (id) =>
            this.seat.id === id &&
            this.elRef.nativeElement.classList.contains("bg-warning")
        ),
        tap((_) => {
          console.log("123");

          this.isFree = !this.isFree;
          this.elRef.nativeElement.classList.toggle("bg-warning");
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
