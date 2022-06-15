import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild("emailInput", { read: ElementRef })
  emailEl: ElementRef<HTMLInputElement>;
  email = "";
  password = "";
  loginError = false;

  onSubmit() {
    this.auth.login(this.email, this.password).subscribe({
      next: ({ isAdmin }) => {
        const sId = this.route.snapshot.queryParams["id"];
        if (sId) {
          this.router.navigate(["/s", sId]);
        } else {
          if (isAdmin) {
            console.log("nav to admin");

            this.router.navigateByUrl("/admin");
          } else {
            this.router.navigateByUrl("/");
          }
        }
      },
      error: (err) => {
        this.loginError = true;
      },
    });
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    public route: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    this.emailEl.nativeElement.focus();
  }
}
