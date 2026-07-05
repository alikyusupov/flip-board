import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_PROD, API_TEST } from '@consts';
import { IApiConfigDto } from '@models';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _API = environment.api === 'test' ? API_TEST : API_PROD;

  private readonly _http = inject(HttpClient);

  makeGetRequest<T>(dto: IApiConfigDto){

    const url = `${dto.host || this._API}/${dto.endpoint}`;
    let httpParams = new HttpParams();

    if(dto.params) {
       Object.entries(dto.params).forEach(([key, value]) => httpParams = httpParams.set(key, value as string ));
    }

    const paramsShopId = dto?.params?.['shop_id'] as number;

    if(paramsShopId) {
      httpParams = httpParams.set('shop_id', paramsShopId);
    }
    else {
      const shopStorage = sessionStorage.getItem('shop');
      const shopId = shopStorage ? JSON.parse(shopStorage).id : 0;
      httpParams = httpParams.set('shop_id', shopId);
    }

    return this._http.get<T>(url, { params: httpParams });
  }

  makePostRequest<T>(dto: IApiConfigDto){
    const url = `${dto.host || this._API}/${ dto.endpoint || '' }`;

    const payload: { params?: Record<string, unknown>, action?: string } = { };

    if(dto.params) {
      payload.params = dto.params;
    }

    if(dto.action) {
      payload.action = dto.action 
    }

    return this._http.post<T>(url, payload);
  }

  makeDeleteRequest<T>(dto: IApiConfigDto){

    const url = `${dto.host || this._API}/${dto.endpoint}`;
    let httpParams = new HttpParams();

    if(dto.params) {
       Object.entries(dto.params).forEach(([key, value]) => httpParams = httpParams.set(key, value as string ));
    }

    const paramsShopId = dto?.params?.['shop_id'] as number;

    if(paramsShopId) {
      httpParams = httpParams.set('shop_id', paramsShopId);
    }
    else {
      const shopStorage = sessionStorage.getItem('shop');
      const shopId = shopStorage ? JSON.parse(shopStorage).id : 0;
      httpParams = httpParams.set('shop_id', shopId);
    }

    return this._http.delete<T>(url, { params: httpParams });
  }

}