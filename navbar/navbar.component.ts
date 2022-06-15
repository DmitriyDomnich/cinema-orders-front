import { Component, OnInit } from "@angular/core";
import { ResolveEnd, ResolveStart, Router } from "@angular/router";
import { filter, map, Observable, tap } from "rxjs";
import { AuthService, Role } from "../core/auth.service";

@Component({
  selector: "nav.navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  auth$: Observable<Role>;
  loading$: Observable<boolean>;

  constructor(public auth: AuthService, private router: Router) {
    this.auth$ = auth.authState$;
  }

  ngOnInit(): void {
    this.loading$ = this.router.events.pipe(
      filter((ev) => ev instanceof ResolveStart || ev instanceof ResolveEnd),
      map((ev) => {
        if (ev instanceof ResolveStart) {
          return false;
        }
        return true;
      })
    );
  }
}
