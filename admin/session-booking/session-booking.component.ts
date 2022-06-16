import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
} from "rxjs";
import { BookingService } from "src/app/core/booking.service";
import { IOrder } from "src/app/core/models/order-model";
import { ISeat } from "src/app/core/models/seat-model";
import { OrdersService } from "src/app/core/orders.service";
import { HallComponent } from "src/app/widgets/hall/hall.component";

@Component({
  selector: "session-booking",
  templateUrl: "./session-booking.component.html",
  styleUrls: ["./session-booking.component.scss"],
})
export class SessionBookingComponent implements OnInit {
  @Input() sessionId: string;
  @ViewChild(HallComponent, { read: ElementRef })
  hallRef: ElementRef<HTMLElement>;
  @ViewChild(HallComponent)
  hallComponent: HallComponent;

  seats$: Observable<ISeat[]>;
  orders$ = new BehaviorSubject<IOrder[]>([]);
  data$: Observable<[ISeat[], IOrder[]]>;

  approveBooking(order: IOrder) {
    const currentOrders = this.orders$
      .getValue()
      .filter((currentOrder) => currentOrder.seatId !== order.seatId);
    this.orders$.next(currentOrders);

    const seatEl = this.getSeatEl(order);
    seatEl.classList.remove("bg-secondary");
    seatEl.classList.add("bg-danger");
    seatEl.innerHTML = '<i class="bi bi-lock-fill"></i>';
    // this.ordersService.createOrder(order.bId); //todo
  }

  getSeatEl(order: IOrder): HTMLElement {
    const index = this.getIndexFromSeat(order.seat);
    return <HTMLElement>this.hallRef.nativeElement.children[index];
  }

  private getIndexFromSeat(seat: string) {
    const [row, column] = seat.split(":").map(Number);
    const [, maxColumn] = this.hallComponent.getMaxRowAndColumnIndeces();

    return column + ((row - 1) * maxColumn - 1);
  }

  trackBy(index: number, item: IOrder) {
    return item.bId;
  }

  ngOnInit(): void {
    this.seats$ = this.bookingService
      .getSeatElsWithRoomById(this.sessionId)
      .pipe(map(({ seats }: any) => seats));

    this.data$ = combineLatest([
      this.seats$,
      this.ordersService.getOrdersBySessionId(this.sessionId).pipe(
        switchMap((orders) => {
          const currentOrders = this.orders$.getValue().concat(orders);
          this.orders$.next(currentOrders);
          return this.orders$;
        })
      ),
    ]);
  }

  constructor(
    private bookingService: BookingService,
    private ordersService: OrdersService
  ) {}
}
