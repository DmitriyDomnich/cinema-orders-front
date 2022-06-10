import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ISeat } from "src/app/core/models/seat-model";
import { SeatsFactory } from "./seats-factory";
import { SeatsDirective } from "./seats.directive";

@Component({
  selector: "hall",
  templateUrl: "./hall.component.html",
  styleUrls: ["./hall.component.scss"],
})
export class HallComponent implements OnInit {
  @Input() seats: ISeat[] | null;
  @ViewChild(SeatsDirective, { static: true }) seatDirective: SeatsDirective;

  gridCount: [number, number];

  constructor() {}

  @HostBinding("style") get gridTemplateColumns() {
    const [rowCount, columnCount] = this.gridCount;
    return {
      "grid-template-columns": `repeat(${columnCount}, 20px)`,
      "grid-template-rows": `repeat(${rowCount}, 30px)`,
    };
  }

  ngOnInit(): void {
    console.log(this.seats);
    const [rowCount, columnCount] =
      this.seats![this.seats!.length - 1].seat.split(":").map(Number);
    this.gridCount = [rowCount, columnCount];
    new SeatsFactory(this.seatDirective.viewContainerRef, this.seats!).create();
  }
}
