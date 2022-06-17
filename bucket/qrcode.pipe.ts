import { Pipe, PipeTransform } from "@angular/core";
import { IBooking } from "../core/models/booking-model";

@Pipe({
  name: "qrcode",
})
export class QrcodePipe implements PipeTransform {
  transform({ id, date, format, seshId, seat }: IBooking): string {
    return `${id}/${date}/${format}/${seshId}-${seat}`;
  }
}
