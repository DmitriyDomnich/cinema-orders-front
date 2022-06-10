import { Component, HostBinding } from "@angular/core";
import { SeatComponent } from "../seat/seat.component";

@Component({
  selector: "busy-seat",
  templateUrl: "./busy-seat.component.html",
})
export class BusySeatComponent extends SeatComponent {
  constructor() {
    super();
  }
  @HostBinding("class") override get classes() {
    return `bg-danger border border-1 rounded border-dark`;
  }
}
