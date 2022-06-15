import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IBooking } from "./models/booking-model";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getSessions(): Observable<IBooking[]> {
    return this.http
      .get<any[]>(`${environment.apiUrl}/bookings`, {
        headers: {
          Authorization: localStorage.getItem("token")!,
        },
      })
      .pipe(
        map((data: any[]) =>
          data.map((pce) => ({
            id: pce.sId,
            seat: pce.seat,
            price: pce.price,
            isAvailable: pce.isAvailable,
            rName: pce.rName,
            format: pce.format,
            date: pce.date,
            seshId: pce.seshId,
            mName: pce.mName,
            ageRestriction: pce.ageRestriction,
          }))
        )
      );
  }

  getBookingsBySessionId(sessionId: string) {}
}
