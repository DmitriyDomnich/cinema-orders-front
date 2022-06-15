import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, share, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ISeat } from "./models/seat-model";

@Injectable({
  providedIn: "any",
})
export class BookingService {
  private seats = new BehaviorSubject<ISeat[]>([]);
  private itemRemoved = new Subject<number>();
  seats$ = this.seats.asObservable();
  itemRemoved$ = this.itemRemoved.asObservable().pipe(share());

  addSeat(...seat: ISeat[]) {
    this.seats.next(this.seats.getValue().concat(...seat));
  }
  removeSeat(seatId: number) {
    // * buggy when pressing toggling seats fast
    this.itemRemoved.next(seatId);

    const seats = this.seats.getValue().slice();
    seats.splice(
      seats.findIndex((currentSeat) => currentSeat.id === seatId),
      1
    );
    setTimeout(() => {
      this.seats.next(seats);
    }, 625);
  }

  addTicketsToBucket(seats: ISeat[]) {
    return this.http.post(`${environment.apiUrl}/bookings`, seats, {
      headers: {
        Authorization: localStorage.getItem("token")!,
      },
    });
  }

  getSeatsWithRoomById(id: string): Observable<ISeat[]> {
    return this.http
      .get<any>(`${environment.apiUrl}/session-seats`, {
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

  constructor(private http: HttpClient) {}
}
