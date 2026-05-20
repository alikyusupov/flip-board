import { inject, Injectable } from '@angular/core';
import { IApiConfigDto, IBaseResponse } from '@models';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

import { IProfileService } from '../models';
import { IShopWB, ITaxItem } from '../pages/shops/shops.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService implements IProfileService {

  private readonly _API = inject(ApiService)

  getShops(dto: IApiConfigDto): Observable<IShopWB[]> {
    return this._API.makePostRequest(dto)
  }

  updateConnectionName(dto: IApiConfigDto): Observable<IBaseResponse>{
    return this._API.makePostRequest(dto)
  };

  updateCurrency(dto: IApiConfigDto): Observable<{ msg: string }>{
    return this._API.makeGetRequest(dto)
  };

  fetchTaxList(dto: IApiConfigDto): Observable<{ data: ITaxItem[] }>{
    return this._API.makeGetRequest(dto)
  };

  saveTaxList(dto: IApiConfigDto): Observable<{ msg: string }>{
    return this._API.makePostRequest(dto)
  };

}