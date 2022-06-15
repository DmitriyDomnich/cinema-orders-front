import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { RouterModule } from "@angular/router";
import { SlideInfoDirective } from "./slide-info.directive";
import { SessionsModule } from "./sessions/sessions.module";
import { SessionsFilterComponent } from "./sessions-filter/sessions-filter.component";

@NgModule({
  declarations: [HomeComponent, SlideInfoDirective, SessionsFilterComponent],
  imports: [CommonModule, CarouselModule, RouterModule, SessionsModule],
})
export class HomeModule {}
