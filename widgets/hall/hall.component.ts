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
  exportAs: "hall",
})
export class HallComponent implements OnInit {
  @Input() seats: ISeat[] | null;
  @Input() disableClicks = false;
  @ViewChild(SeatsDirective, { static: true }) seatDirective: SeatsDirective;

  gridCount: [number, number];

  constructor() {}

  @HostBinding("style") get style() {
    const [rowCount, columnCount] = this.gridCount;
    return {
      "grid-template-columns": `repeat(${columnCount}, 20px)`,
      "grid-template-rows": `repeat(${rowCount}, 30px)`,
      "pointer-events": this.disableClicks ? "none" : "initial",
    };
  }

  ngOnInit(): void {
    console.log(this.seats);
    const [rowCount, columnCount] = this.getMaxRowAndColumnIndeces();
    this.gridCount = [rowCount, columnCount];
    new SeatsFactory(this.seatDirective.viewContainerRef, this.seats!, [
      rowCount,
      columnCount,
    ]).create();
  }
  getMaxRowAndColumnIndeces(): [number, number] {
    return this.seats!.reduce(
      ([accRowCount, accColumnCount], { seat }) => {
        const [currRowCount, currColumnCount] = seat.split(":").map(Number);
        if (currRowCount > accRowCount) {
          accRowCount = currRowCount;
        }
        if (currColumnCount > accColumnCount) {
          accColumnCount = currColumnCount;
        }
        return [accRowCount, accColumnCount];
      },
      [0, 0]
    );
  }
}
