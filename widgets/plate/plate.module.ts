import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlateComponent } from "./plate.component";

@NgModule({
  declarations: [PlateComponent],
  imports: [CommonModule],
  exports: [PlateComponent],
})
export class PlateModule {}
