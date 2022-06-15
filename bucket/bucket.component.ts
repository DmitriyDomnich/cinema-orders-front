import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IBooking } from "../core/models/booking-model";
import { OrdersService } from "../core/orders.service";

@Component({
  selector: "bucket",
  templateUrl: "./bucket.component.html",
  styleUrls: ["./bucket.component.scss"],
})
export class BucketComponent implements OnInit {
  tickets$: Observable<IBooking[]>;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.tickets$ = this.ordersService.getSessions();
  }
}
