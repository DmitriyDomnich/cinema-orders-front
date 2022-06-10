import { Component, HostBinding } from "@angular/core";
import { SeatComponent } from "../seat/seat.component";

@Component({
  selector: "empty-seat",
  templateUrl: "./empty-seat.component.html",
  styleUrls: ["./empty-seat.component.scss"],
})
export class EmptySeatComponent extends SeatComponent {
  constructor() {
    super();
  }
  @HostBinding("style.cursor") cursor = "initial";
}
