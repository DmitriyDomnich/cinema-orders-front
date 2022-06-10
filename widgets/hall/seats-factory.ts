import { ViewContainerRef } from "@angular/core";
import { ISeat } from "src/app/core/models/seat-model";
import { BusySeatComponent } from "./busy-seat/busy-seat.component";
import { EmptySeatComponent } from "./empty-seat/empty-seat.component";
import { FreeSeatComponent } from "./free-seat/free-seat.component";

export class SeatsFactory {
  private hallConfig: [number, number];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private seats: ISeat[]
  ) {
    const [rowCount, columnCount] = this.getSeatConfigurationByIndex(
      seats.length - 1
    )!;

    this.hallConfig = [rowCount, columnCount];
  }

  create() {
    const [rowCount, columnCount] = this.hallConfig;
    let currSeatIndex = 0;

    for (let i = 1; i <= rowCount; i++) {
      for (let j = 1; j <= columnCount; j++) {
        const seat = this.getSeatConfigurationByIndex(currSeatIndex);

        if (seat && i === seat[0] && j === seat[1]) {
          if (this.seats[currSeatIndex++].isAvailable) {
            this.viewContainerRef.createComponent(FreeSeatComponent);
          } else {
            this.viewContainerRef.createComponent(BusySeatComponent);
          }
        } else {
          this.viewContainerRef.createComponent(EmptySeatComponent);
        }
      }
    }
  }

  private getSeatConfigurationByIndex(index: number): [number, number] | null {
    try {
      const [row, column] = this.seats[index]?.seat.split(":").map(Number);
      return [row, column];
    } catch (err) {
      return null;
    }
  }
}
