import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  loginError = false;

  onSubmit() {
    this.auth.login(this.email, this.password).subscribe({
      next: (token) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.loginError = true
      }
    })
  }

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

}
