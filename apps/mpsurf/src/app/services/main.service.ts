import { inject, Injectable } from '@angular/core';
import { IApiConfigDto, IArticleFilterItem, IGoodFilterItem, IImtId, IMainService, IShop, IStatusFilterItem } from '@models';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MainService implements IMainService {

  private readonly _API = inject(ApiService);

  getShops(dto: IApiConfigDto): Observable<IShop[]> {
    return this._API.makePostRequest(dto)
  }

  getGoods(dto: IApiConfigDto): Observable<IGoodFilterItem[]> {
    return this._API.makeGetRequest(dto)
  };

  getArticles(dto: IApiConfigDto): Observable<IArticleFilterItem[]> {
    return this._API.makeGetRequest(dto)
  };

  getCategories(dto: IApiConfigDto): Observable<string[]> {
    return this._API.makeGetRequest(dto)
  };

  getStatuses(dto: IApiConfigDto): Observable<IStatusFilterItem[]> {
    return this._API.makeGetRequest(dto)
  };

  getBrands(dto: IApiConfigDto): Observable<string[]> {
    return this._API.makeGetRequest(dto)
  };

  getTags(dto: IApiConfigDto): Observable<string[]> {
    return this._API.makeGetRequest(dto)
  };

  getSubjects(dto: IApiConfigDto): Observable<string[]> {
    return this._API.makeGetRequest(dto)
  };

  getWareHouses(dto: IApiConfigDto): Observable<string[]> {
    return this._API.makeGetRequest(dto)
  };

  getImtIds(dto: IApiConfigDto): Observable<IImtId[]> {
    return this._API.makeGetRequest(dto)
  };
}