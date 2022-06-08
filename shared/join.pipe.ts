import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "join",
})
export class JoinPipe implements PipeTransform {
  transform(vals: { id: string; name: string }[], separator: string): string {
    return vals.map((val) => val.name).join(separator || " ");
  }
}
