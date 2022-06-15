import { Pipe, PipeTransform } from "@angular/core";
import { IBooking } from "../core/models/booking-model";
import { ISeat } from "../core/models/seat-model";

@Pipe({
  name: "seatFromBooking",
})
export class SeatFromBookingPipe implements PipeTransform {
  transform({ id, isAvailable, seat, price }: IBooking): ISeat {
    return {
      id,
      isAvailable,
      price,
      seat,
    };
  }
}
