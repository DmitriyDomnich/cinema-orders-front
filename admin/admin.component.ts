import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AccordionPanelComponent } from "ngx-bootstrap/accordion";
import { map, Observable } from "rxjs";
import { ISession } from "src/app/core/models/session-model";
import { SessionsService } from "src/app/core/sessions.service";

@Component({
  selector: "admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  @ViewChildren(AccordionPanelComponent, { read: ElementRef })
  accordeons: QueryList<ElementRef<HTMLElement>>;

  sessions$: Observable<ISession[]>;

  trackBy(index: number, item: ISession) {
    return item.id;
  }

  delete(index: number, id: string) {
    const item = this.accordeons.get(index);
    item?.nativeElement.remove();
    this.sessionsService.deleteSession(id).subscribe();
  }

  ngOnInit(): void {
    this.sessions$ = this.sessionsService
      .getSessions(undefined, undefined, undefined, false) //todo: refactor to object
      .pipe(map(({ sessions }) => sessions));
  }
  constructor(
    private sessionsService: SessionsService,
    public route: ActivatedRoute
  ) {}
}
