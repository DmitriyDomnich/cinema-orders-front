import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[itemCard]",
})
export class ItemCardDirective {
  constructor(private elRef: ElementRef<HTMLDivElement>) {}

  @HostListener("mouseenter") onHover() {
    const { classList } = this.elRef.nativeElement;
    classList.remove("border-dark");
    classList.add("shadow-lg", "border-info");
  }
  @HostListener("mouseleave") onLeave() {
    const { classList } = this.elRef.nativeElement;

    classList.remove("shadow-lg", "border-info");
    classList.add("border-dark");
  }
}
