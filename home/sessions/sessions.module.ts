import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SessionsViewComponent } from "./sessions-view.component";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { SharedModule } from "src/app/shared/shared.module";
import { ItemCardDirective } from "./item-card.directive";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [SessionsViewComponent, ItemCardDirective],
  imports: [CommonModule, PaginationModule, RouterModule, SharedModule],
  exports: [SessionsViewComponent],
})
export class SessionsModule {}
