import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[seats]",
})
export class SeatsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
