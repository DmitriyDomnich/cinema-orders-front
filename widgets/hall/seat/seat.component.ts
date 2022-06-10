import { Component, HostBinding } from "@angular/core";

@Component({
  selector: "seat",
  template: "",
})
export class SeatComponent {
  constructor() {}

  @HostBinding("class") protected get classes() {
    return "";
  }
  @HostBinding("style") style = {
    cursor: "pointer",
    "text-align": "center",
  };
}
