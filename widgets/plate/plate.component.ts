import { Component, HostBinding } from "@angular/core";

@Component({
  selector: "plate",
  templateUrl: "./plate.component.html",
  styleUrls: ["./plate.component.scss"],
})
export class PlateComponent {
  constructor() {}

  @HostBinding("class") get classes() {
    return "d-inline-block fs-5 bg-light my-1 mx-2 py-1 px-2";
  }
}
