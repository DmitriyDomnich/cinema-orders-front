import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SessionRoutingModule } from "./session-routing.module";
import { SessionComponent } from "./session.component";
import { SharedModule } from "../shared/shared.module";
import { HallModule } from "../widgets/hall/hall.module";
import { SessionBookingModule } from "./session-booking/session-booking.module";
import { SESSIONS_TOKEN } from "./sessions-injection-token";
import { AlertModule } from "ngx-bootstrap/alert";
import { PlateModule } from "../widgets/plate/plate.module";

@NgModule({
  declarations: [SessionComponent],
  imports: [
    CommonModule,
    SessionRoutingModule,
    SharedModule,
    HallModule,
    SessionBookingModule,
    AlertModule,
    PlateModule,
  ],
  providers: [
    {
      provide: SESSIONS_TOKEN,
      useValue: new Map(),
    },
  ],
})
export class SessionModule {}
