import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MovieCoverSrcPipe } from "./movie-cover-src.pipe";
import { JoinPipe } from "./join.pipe";
import { AgeDirective } from "./age.directive";

@NgModule({
  declarations: [MovieCoverSrcPipe, JoinPipe, AgeDirective],
  imports: [CommonModule],
  exports: [JoinPipe, AgeDirective],
})
export class SharedModule {}
