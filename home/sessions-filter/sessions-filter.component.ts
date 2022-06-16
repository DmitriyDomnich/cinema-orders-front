import { HttpParams } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { fromEvent, map, Observable, pipe, tap } from "rxjs";
import { IGenre } from "src/app/core/models/genre-model";
import { SessionsService } from "src/app/core/sessions.service";

@Component({
  selector: "sessions-filter",
  templateUrl: "./sessions-filter.component.html",
  styleUrls: ["./sessions-filter.component.scss"],
})
export class SessionsFilterComponent implements OnInit {
  genres$: Observable<IGenre[]>;

  selectedGenres: string[];
  selectedDate: number | null;

  toggleGenre(value: string) {
    const index = this.selectedGenres.findIndex(
      (selected) => selected === value
    );

    if (index === -1) {
      this.selectedGenres.push(value);
    } else {
      this.selectedGenres.splice(index, 1);
    }
  }

  navigate() {
    let params = Object.create(null);
    if (this.selectedDate) {
      params.date = this.selectedDate;
    }
    if (this.selectedGenres.length) {
      params.genres = this.selectedGenres.join();
    }
    if (Object.keys(params).length) {
      // console.log(params);

      this.router
        .navigate(["/"], {
          queryParams: params,
        })
        .then((val) => console.log(val, "navigated"));
    } else {
      this.router.navigate(["/"]);
    }
  }

  checkGenre(index: number): Observable<any> {
    return this.route.queryParamMap.pipe(
      map((param) => {
        const [selectedGenres] = param.getAll("genres");
        return selectedGenres?.split(",").find((checked) => +checked === index);
      })
    );
  }

  countUntilNextMonthTime() {
    const now = new Date();

    const date = now.setMonth(now.getMonth() + 1);
    const val = new Date(new Date(date).setDate(1)).getTime();
    // console.log(val);

    return val;
  }
  countUntilNextWeekTime() {
    const now = new Date();

    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + (7 - now.getDay() + 1)
    ).getTime();
    return date;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionsService: SessionsService
  ) {}
  ngOnInit(): void {
    this.genres$ = this.sessionsService.getGenres();
    this.selectedGenres =
      this.route.snapshot.queryParamMap.getAll("genres")[0]?.split(",") || [];
    this.selectedDate = +this.route.snapshot.queryParamMap.get("date")! || null;
  }
}
