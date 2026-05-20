import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagColor'
})
export class TagColorPipe implements PipeTransform {

  transform(value: number): string {

    if(value === 1) {
      return 'rgba(126, 17, 137, 1)'
    } 
    else if(value === 2) {
      return 'rgba(0, 91, 255, 1)'
    }
    else{
      return '#FFCC00'
    }
    
  }
}