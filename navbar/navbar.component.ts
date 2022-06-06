import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'nav.navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  auth$: Observable<boolean>;

  constructor(
    public auth: AuthService
  ) {
    this.auth$ = auth.authState$;
  }

  ngOnInit(): void {

  }

}
