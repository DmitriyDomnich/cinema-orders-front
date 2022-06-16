import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { IOrder } from "src/app/core/models/order-model";

@Component({
  selector: "order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent {
  @Input() order: IOrder;

  @Output() onApprove = new EventEmitter<IOrder>();

  constructor(public elRef: ElementRef<HTMLElement>) {}
}
