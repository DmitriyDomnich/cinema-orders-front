import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SeatCardComponent } from "./seat-card.component";
import { MovieInfoDirective } from "./directives/movie-info.directive";
import { SessionInfoDirective } from "./directives/session-info.directive";
import { CardStatusDirective } from "./directives/card-status.directive";

@NgModule({
  declarations: [
    SeatCardComponent,
    MovieInfoDirective,
    SessionInfoDirective,
    CardStatusDirective,
  ],
  imports: [CommonModule],
  exports: [
    SeatCardComponent,
    MovieInfoDirective,
    SessionInfoDirective,
    CardStatusDirective,
  ],
})
export class SeatCardModule {}
