import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mpUnit'
})
export class UnitPipe implements PipeTransform {

  transform(value: number | string | null, unit: 'percent' | 'rubles' | 'item' | 'day' | 'count' | null): string {
    if(!value) return '-';
    switch (unit) {
      case 'percent':
        return `${value} %`    
      case 'rubles':
        return `${value} ₽`
      case 'item':
          return `${value} шт.`
      case 'day':
          return `${value} дн.`   
      default:
        return value.toString();
    }
  }
}