import { Pipe, PipeTransform } from "@angular/core";
import { ISeat } from "src/app/core/models/seat-model";

@Pipe({
  name: "fullPrice",
})
export class FullPricePipe implements PipeTransform {
  transform(seats: ISeat[]): number {
    return seats.reduce((acc, { price }) => acc + price, 0);
  }
}
