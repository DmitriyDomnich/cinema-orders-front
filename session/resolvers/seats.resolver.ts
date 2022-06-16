import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { map, Observable } from "rxjs";
import { BookingService } from "src/app/core/booking.service";
import { ISeat } from "src/app/core/models/seat-model";

@Injectable({
  providedIn: "root",
})
export class SeatsResolver implements Resolve<ISeat[]> {
  constructor(private bookingService: BookingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ISeat[]> {
    return <any>(
      this.bookingService.getSeatElsWithRoomById(route.paramMap.get("id")!)
    );
  }
}
