import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "time",
})
export class TimePipe implements PipeTransform {
  transform(startDate: any, minutes: number): Date {
    return new Date(new Date(startDate).getTime() + minutes * 60000);
  }
}
