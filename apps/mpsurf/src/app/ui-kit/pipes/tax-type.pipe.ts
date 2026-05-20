import { Pipe, PipeTransform } from '@angular/core';
import { TAX_TYPES } from 'app/enums';

@Pipe({
  name: 'taxType'
})
export class TaxTypePipe implements PipeTransform {

  transform(value: number | null): string {

    if(!value) {
      return TAX_TYPES.UNDEFINED;
    }

    switch (value) {
      case 0:
        return TAX_TYPES.UNDEFINED;
      case 1:
        return TAX_TYPES.USN_DOKHODY;
      case 2:
        return TAX_TYPES.SAMOZANYATYI;
      case 5:
        return TAX_TYPES.USN_DOKHODY_RASKHODY;
      case 6:
        return TAX_TYPES.OTHER;
      default:
       return TAX_TYPES.UNDEFINED;
    }
  }

}
