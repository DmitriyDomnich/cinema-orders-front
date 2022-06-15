import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from "@angular/core";
import { filter, first, tap } from "rxjs";
import { BookingService } from "src/app/core/booking.service";
import { ISeat } from "src/app/core/models/seat-model";

@Component({
  selector: "seat-card",
  templateUrl: "./seat-card.component.html",
  styleUrls: ["./seat-card.component.scss"],
})
export class SeatCardComponent implements OnInit {
  @Input() seat: ISeat;
  @Input() showCloseBtn = true;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    public bookingService: BookingService
  ) {}

  @HostBinding("class") get classes() {
    return {
      animate__animated: this.showCloseBtn,
      animate__backInLeft: this.showCloseBtn,
      "my-2": true,
      border: true,
      "w-100": true,
      "border-2": true,
      "border-success": !!this.seat.isAvailable,
      "border-danger": !!!this.seat.isAvailable,
      "border-info": this.showCloseBtn,
      "rounded-3": true,
      "bg-light": true,
      "p-3": true,
      "d-flex": true,
      "justify-content-between": true,
    };
  }

  ngOnInit(): void {
    if (this.showCloseBtn) {
      this.bookingService.itemRemoved$
        .pipe(
          filter((seatId) => seatId === this.seat.id),
          first(),
          tap((_) =>
            this.elRef.nativeElement.classList.add("animate__backOutLeft")
          )
        )
        .subscribe();
    }
  }
}
