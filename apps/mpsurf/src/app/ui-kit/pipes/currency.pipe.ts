import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mpcurrency'
})
export class MpCurrencyPipe implements PipeTransform {

  transform(value: string | null): {description: string, icon: string} {
    if(!value) {
      return  {
        description: `Российский рубль`,
        icon: '₽'
      }
    };
    switch (value) {
      case 'RUB':
        return  {
          description: `Российский рубль`,
          icon: '₽'
        };    
      case 'KGS':
        return  {
          description: `Киргизский сом`,
          icon: 'сом'
        };
      case 'BYN':
        return  {
          description: `Белорусский рубль`,
          icon: 'р.'
        };
      case 'KZT':
        return {
          description: `Казахстанский тенге`,
          icon: '₸'
        } 
      case 'AMD':
        return {
          description: `Армянский драм`,
          icon: 'драм'
        }
      case 'GEL':
        return {
          description: `Грузинский лари`,
          icon: '₾'
        }
      case 'USD':
        return {
          description: `Доллар США`,
          icon: '$'
        }
      default:
        return  {
          description: `Российский рубль`,
          icon: '₽'
        };
    }
  }
}
