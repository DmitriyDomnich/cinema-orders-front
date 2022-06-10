import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ISeat } from "./models/seat-model";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getSeatsWithRoomById(id: string): Observable<ISeat[]> {
    return this.http
      .get<any>(`${environment.api_url}/session-seats`, {
        params: {
          id,
        },
      })
      .pipe(
        map((seats) => ({
          ...seats,
          room: seats.room,
          seats: seats.seats.map((seat: any) => ({
            ...seat,
            isAvailable: !!+seat.isAvailable,
          })),
        }))
      );
  }
}
