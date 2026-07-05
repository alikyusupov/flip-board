import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flagDetector'
})
export class FlagDetectorPipe implements PipeTransform {

  transform(code: string): string {
    return `/assets/flags/${code.toLowerCase()}.svg`
  }

}
