import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieCoverSrc'
})
export class MovieCoverSrcPipe implements PipeTransform {

  readonly cdnImgUrl = 'https://s3.eu-central-1.amazonaws.com/cinema.cdn/images/';

  transform(src: string): string {
    return `${this.cdnImgUrl + src}`;
  }

}
