import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { UpdateComponent } from "./update.component";
import { FormsModule } from "@angular/forms";
import { AlertModule } from "ngx-bootstrap/alert";
import { defineLocale } from "ngx-bootstrap/chronos";
import { ukLocale } from "ngx-bootstrap/locale";
defineLocale("uk", ukLocale);

@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    TypeaheadModule,
    AlertModule,
    BsDatepickerModule,
    FormsModule,
  ],
})
export class UpdateModule {}
