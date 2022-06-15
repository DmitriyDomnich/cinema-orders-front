import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BucketRoutingModule } from "./bucket-routing.module";
import { BucketComponent } from "./bucket.component";
import { SeatCardModule } from "../widgets/seat-card/seat-card.module";
import { SeatFromBookingPipe } from "./seat-from-booking.pipe";
import { SharedModule } from "../shared/shared.module";
import { PlateModule } from "../widgets/plate/plate.module";
import { TooltipModule } from "ngx-bootstrap/tooltip";

@NgModule({
  declarations: [BucketComponent, SeatFromBookingPipe],
  imports: [
    CommonModule,
    BucketRoutingModule,
    SeatCardModule,
    SharedModule,
    PlateModule,
    TooltipModule,
  ],
})
export class BucketModule {}
