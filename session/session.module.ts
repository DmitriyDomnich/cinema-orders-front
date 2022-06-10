import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SessionRoutingModule } from "./session-routing.module";
import { SessionComponent } from "./session.component";
import { SharedModule } from "../shared/shared.module";
import { HallModule } from "../widgets/hall/hall.module";

@NgModule({
  declarations: [SessionComponent],
  imports: [CommonModule, SessionRoutingModule, SharedModule, HallModule],
})
export class SessionModule {}
