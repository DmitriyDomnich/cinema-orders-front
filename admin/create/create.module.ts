import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateComponent } from "./create.component";
import { AlertModule } from "ngx-bootstrap/alert";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { FormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    AlertModule,
    TypeaheadModule,
    FormsModule,
    BsDatepickerModule,
  ],
})
export class CreateModule {}
