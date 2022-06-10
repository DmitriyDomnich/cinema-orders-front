import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HallComponent } from "./hall.component";
import { EmptySeatComponent } from "./empty-seat/empty-seat.component";
import { BusySeatComponent } from "./busy-seat/busy-seat.component";
import { FreeSeatComponent } from "./free-seat/free-seat.component";
import { SeatsDirective } from "./seats.directive";

@NgModule({
  declarations: [
    HallComponent,
    EmptySeatComponent,
    BusySeatComponent,
    FreeSeatComponent,
    SeatsDirective,
  ],
  imports: [CommonModule],
  exports: [HallComponent],
  providers: [
    {
      provide: "BookedCount",
      useValue: {
        value: 0,
      },
    },
  ],
})
export class HallModule {}
