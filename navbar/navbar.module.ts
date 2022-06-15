import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar.component";
import { RouterModule } from "@angular/router";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { SearchModule } from "./search/search.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, ProgressbarModule, SearchModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
