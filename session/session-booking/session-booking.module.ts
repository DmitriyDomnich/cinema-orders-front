import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SessionBookingComponent } from "./session-booking.component";
import { PopoverModule } from "ngx-bootstrap/popover";
import { RouterModule } from "@angular/router";
import { FullPricePipe } from "./full-price.pipe";
import { SeatCardModule } from "../../widgets/seat-card/seat-card.module";

@NgModule({
  declarations: [SessionBookingComponent, FullPricePipe],
  imports: [CommonModule, PopoverModule, RouterModule, SeatCardModule],
  exports: [SessionBookingComponent],
})
export class SessionBookingModule {}
