import { Directive, ElementRef, HostBinding } from "@angular/core";

@Directive({
  selector: ".carousel-caption",
})
export class SlideInfoDirective {
  constructor(private elRef: ElementRef<HTMLElement>) {}

  @HostBinding("style.display") get display() {
    return (<HTMLElement>this.elRef.nativeElement.closest("carousel")!).dataset[
      "hovered"
    ] === "true"
      ? "block"
      : "none";
  }
}
