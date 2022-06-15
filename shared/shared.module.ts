import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MovieCoverSrcPipe } from "./movie-cover-src.pipe";
import { JoinPipe } from "./join.pipe";
import { AgeDirective } from "./age.directive";
import { TimePipe } from "./time.pipe";

@NgModule({
  declarations: [MovieCoverSrcPipe, JoinPipe, AgeDirective, TimePipe],
  imports: [CommonModule],
  exports: [JoinPipe, AgeDirective, TimePipe],
})
export class SharedModule {}
