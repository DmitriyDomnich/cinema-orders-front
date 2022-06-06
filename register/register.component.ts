import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  email = '';
  password = '';
  password2 = '';
  registerError = false;

  onSubmit() {
    this.auth.register(this.email, this.password).subscribe({
      next: (token) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.registerError = true
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
