import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ISession } from "src/app/core/models/session-model";
import { ItemCardDirective } from "./item-card.directive";

@Component({
  selector: "sessions-view",
  templateUrl: "./sessions-view.component.html",
  styleUrls: ["./sessions-view.component.scss"],
})
export class SessionsViewComponent implements OnChanges {
  @Input() sessions: ISession[] | null;
  @Input() sessionCount: number | null;
  @ViewChild(ItemCardDirective, { read: ElementRef })
  firstCard: ElementRef<HTMLDivElement>;

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes["sessions"]?.isFirstChange() === false &&
      this.route.snapshot.queryParamMap.keys.length
    ) {
      this.firstCard.nativeElement.scrollIntoView(true);
    }
  }
}
