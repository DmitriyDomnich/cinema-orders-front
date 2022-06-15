import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "./search.component";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, TypeaheadModule, FormsModule],
  exports: [SearchComponent],
})
export class SearchModule {}
