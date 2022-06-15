import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
} from "rxjs";
import { SessionsService } from "src/app/core/sessions.service";

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  term = "";
  searchResults$: Observable<{ id: string; name: string }[]>;

  constructor(
    private sessionsService: SessionsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.searchResults$ = new Observable((sub) => {
      sub.next(this.term);
    }).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((_) =>
        this.sessionsService
          .getSessionsByTerm(this.term)
          .pipe(map((val) => val || []))
      )
    );
  }
}
