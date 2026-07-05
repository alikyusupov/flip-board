import { Injectable } from '@angular/core';
import { IArticleFilterItem, ICardWidget } from '@models';
import { delay, Observable, of } from 'rxjs';

import { IProductAnalyticsService, IRatesGridData } from '../models';
import { ABC_GRID_DATA } from '../pages/abc/abc.mock';
import { IAbcGridData } from '../pages/abc/abc.model';
import { ORDERS_CATEGORIES, ORDERS_CHART_MOCK, ORDERS_NMIDS, ORDERS_SUBJECTS, ORDERS_TABLE_MOCK, ORDERS_WAREHOUSES } from '../pages/orders/orders.mock';
import { IOrdersChart, IOrdersTable } from '../pages/orders/orders.model';
import { cards, rows } from '../pages/rates/rates.mock';
import { RNP_TABLE_ID_1, RNP_TABLE_ID_2, RNP_TABLE_ID_4 } from '../pages/rnp/rnp.mock';
import { IRnpTable } from '../pages/rnp/rnp.model';
import { SALES_CATEGORIES, SALES_CHART_MOCK, SALES_NMIDS, SALES_SUBJECTS, SALES_TABLE_MOCK, SALES_WAREHOUSES } from '../pages/sales/sales.mock';
import { ISalesChart,ISalesTable } from '../pages/sales/sales.model';

@Injectable({
  providedIn: 'root'
})
export class ProductAnalyticsMockService implements IProductAnalyticsService {

  constructor() { 
    console.log("MOCK API")
  }

  loadAbcGrid(): Observable<IAbcGridData>{
    return of(ABC_GRID_DATA).pipe(delay(1200));
  };

  loadSalesTable(): Observable<ISalesTable> {
    return of(SALES_TABLE_MOCK).pipe(delay(1200))
  }
    
  loadSalesChart():  Observable<ISalesChart> {
    return of(SALES_CHART_MOCK).pipe(delay(1200))
  }

  loadOrdersChart(): Observable<IOrdersChart>{
    return of(ORDERS_CHART_MOCK).pipe(delay(1200))
  };

  loadCards(): Observable<ICardWidget[]>{
    return of(cards).pipe(delay(1200))
  };
  
  loadGrid(): Observable<IRatesGridData>{
    return of(rows).pipe(delay(600))
  }

  loadRnpTable_1(): Observable<IRnpTable>{
    return of(RNP_TABLE_ID_1).pipe(delay(1200))
  }

  loadRnpTable_2(): Observable<IRnpTable>{
    return of(RNP_TABLE_ID_2).pipe(delay(2400))
  }

  loadRnpTable_4(): Observable<IRnpTable>{
    return of(RNP_TABLE_ID_4).pipe(delay(3600))
  }

  loadOrdersTable(): Observable<IOrdersTable>{
    return of(ORDERS_TABLE_MOCK).pipe(delay(600))
  };

  getOrdersGoods(): Observable<{ data: IArticleFilterItem[] } | null> {
    return of(ORDERS_NMIDS)
  };
  getOrdersCategories(): Observable<{ data: IArticleFilterItem[] } | null> {
    return of(ORDERS_CATEGORIES)
  };
  getOrdersWareHouses(): Observable<{ data: IArticleFilterItem[] } | null> {
    return of(ORDERS_WAREHOUSES)
  };
  getOrdersSubjects(): Observable<{ data: IArticleFilterItem[] } | null> {
    return of(ORDERS_SUBJECTS)
  };

  getSalesGoods(): Observable<{ data: IArticleFilterItem[]} | null> {
    return of(SALES_NMIDS)
  };
  getSalesCategories(): Observable<{ data: IArticleFilterItem[]} | null> {
    return of(SALES_CATEGORIES)
  };
  getSalesWareHouses(): Observable<{ data: IArticleFilterItem[]} | null> {
    return of(SALES_WAREHOUSES)
  };
  getSalesSubjects(): Observable<{ data: IArticleFilterItem[]} | null> {
    return of(SALES_SUBJECTS)
  };
}
