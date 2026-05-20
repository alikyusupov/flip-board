import { Injectable } from '@angular/core';
import { IBaseResponse } from '@models';
import { delay, Observable, of } from 'rxjs';

import { IProfileService } from '../models';
import { SHOPS_MOCK, TAX_LIST_MOCK } from '../pages/shops/shops.mock';
import { IShopWB, ITaxItem } from '../pages/shops/shops.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileApiMockService implements IProfileService {

  getShops(): Observable<IShopWB[]> {
    return of(SHOPS_MOCK).pipe(delay(600))
  }

  updateConnectionName(): Observable<IBaseResponse>{
    return of({data: { is_error: 0, msg: 'Данные успешно изменены' }}).pipe(delay(800))
  };

  updateCurrency(): Observable<{ msg: string }>{
    return of({msg: 'Данные успешно изменены' }).pipe(delay(800))
  };

  fetchTaxList(): Observable<{ data: ITaxItem[] }>{
    return of({data: TAX_LIST_MOCK})
  };

  saveTaxList(): Observable<{ msg: string }>{
    return of({ msg: 'Объект сохранен' })
  };

}