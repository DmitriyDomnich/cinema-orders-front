import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { SessionBookingComponent } from "./session-booking/session-booking.component";
import { HallModule } from "../widgets/hall/hall.module";
import { SeatCardModule } from "../widgets/seat-card/seat-card.module";
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [AdminComponent, SessionBookingComponent, OrderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SeatCardModule,
    AccordionModule,
    HallModule,
  ],
})
export class AdminModule {}
