import { Directive, HostBinding, Input } from "@angular/core";

@Directive({
  selector: "[age]",
})
export class AgeDirective {
  @Input() age: number;

  constructor() {}

  @HostBinding("class") get textColor() {
    return {
      "text-danger": this.age > 17,
      "text-warning": this.age < 18 && this.age > 5,
      "text-info": this.age < 6,
    };
  }
}
