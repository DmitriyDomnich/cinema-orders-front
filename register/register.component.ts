import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  @ViewChild("emailInput", { read: ElementRef, static: true })
  emailEl: ElementRef<HTMLInputElement>;
  email = "";
  password = "";
  password2 = "";
  registerError = false;

  onSubmit() {
    this.auth.register(this.email, this.password).subscribe({
      next: (token) => {
        const sId = this.route.snapshot.queryParamMap.get("id");
        if (sId) {
          this.router.navigate(["/s", sId]);
        } else {
          this.router.navigateByUrl("/");
        }
      },
      error: (err) => {
        this.registerError = true;
      },
    });
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.emailEl.nativeElement.focus();
  }
}
