import { Injectable } from '@angular/core';
import { IArticleFilterItem, IGoodFilterItem, IImtId, IMainService, IShop, IStatusFilterItem } from '@models';
import { SHOPS_MOCK } from 'app/mocks';
import { BRANDS_MOCK, CATEGORIES_MOCK, GOODS_MOCK, STATUSES_MOCK, SUBJECTS_MOCK, TAGS_MOCK } from 'app/mocks/filters.mocks';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainMockService implements IMainService {

  getShops(): Observable<IShop[]> {
    return of(SHOPS_MOCK)
  }

  getGoods(): Observable<IGoodFilterItem[]> {
    return of(GOODS_MOCK)
  };

  getArticles(): Observable<IArticleFilterItem[]> {
    return of([])
  };

  getCategories(): Observable<string[]> {
    return of(CATEGORIES_MOCK)
  };

  getStatuses(): Observable<IStatusFilterItem[]> {
    return of(STATUSES_MOCK)
  };

  getBrands(): Observable<string[]> {
    return of(BRANDS_MOCK)
  };

  getTags(): Observable<string[]> {
    return of(TAGS_MOCK)
  };

  getSubjects(): Observable<string[]> {
    return of(SUBJECTS_MOCK)
  };

  getWareHouses(): Observable<string[]> {
    return of([])
  };

  getImtIds(): Observable<IImtId[]> {
    return of([])
  };

}