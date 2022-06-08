import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MovieCoverSrcPipe } from "./movie-cover-src.pipe";
import { JoinPipe } from "./join.pipe";

@NgModule({
  declarations: [MovieCoverSrcPipe, JoinPipe],
  imports: [CommonModule],
  exports: [JoinPipe],
})
export class SharedModule {}
