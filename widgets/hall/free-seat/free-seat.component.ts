import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
} from "@angular/core";
import { SeatComponent } from "../seat/seat.component";

@Component({
  selector: "free-seat",
  templateUrl: "./free-seat.component.html",
  styleUrls: ["./free-seat.component.scss"],
})
export class FreeSeatComponent extends SeatComponent {
  isFree = true;

  constructor(
    private elRef: ElementRef<HTMLElement>,
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
    this.elRef.nativeElement.classList.toggle("bg-warning");
    this.isFree = !this.isFree;
  }
}
