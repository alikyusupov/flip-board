import { inject, Injectable } from '@angular/core';
import { IApiConfigDto, IArticleFilterItem, ICardWidget } from '@models';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

import { IProductAnalyticsService, IRatesGridData } from '../models';
import { IAbcGridData } from '../pages/abc/abc.model';
import { IOrdersChart, IOrdersTable } from '../pages/orders/orders.model';
import { IRnpTable } from '../pages/rnp/rnp.model';
import { ISalesChart, ISalesTable } from '../pages/sales/sales.model';

@Injectable({
  providedIn: 'root'
})
export class ProductAnalyticsService implements IProductAnalyticsService {

  private readonly _API = inject(ApiService);

  constructor() { 
    console.log("API")
  }

  loadAbcGrid(dto: IApiConfigDto): Observable<IAbcGridData>{
    return this._API.makePostRequest(dto);
  };
  
  loadSalesTable(dto: IApiConfigDto): Observable<ISalesTable> {
    return this._API.makePostRequest(dto);
  }
  
  loadSalesChart(dto: IApiConfigDto):  Observable<ISalesChart> {
    return this._API.makePostRequest(dto);
  }

  loadOrdersChart(dto: IApiConfigDto): Observable<IOrdersChart>{
    return this._API.makePostRequest(dto);
  };
  
  loadCards(dto: IApiConfigDto): Observable<ICardWidget[]>{
    return this._API.makePostRequest(dto);
  };

  loadGrid(dto: IApiConfigDto): Observable<IRatesGridData>{
    return this._API.makePostRequest(dto)
  }

  loadRnpTable_1(dto: IApiConfigDto): Observable<IRnpTable>{
    return this._API.makePostRequest(dto);
  }
  
  loadRnpTable_2(dto: IApiConfigDto): Observable<IRnpTable>{
    return this._API.makePostRequest(dto);
  }
  
  loadRnpTable_4(dto: IApiConfigDto): Observable<IRnpTable>{
    return this._API.makePostRequest(dto);
  }

  loadOrdersTable(dto: IApiConfigDto): Observable<IOrdersTable>{
    return this._API.makePostRequest(dto);
  };

  getOrdersGoods(dto: IApiConfigDto): Observable<{data: IArticleFilterItem[]} | null>{
    return this._API.makePostRequest(dto);
  };
  getOrdersCategories(dto: IApiConfigDto): Observable<{data: IArticleFilterItem[]} | null>{
    return this._API.makePostRequest(dto);
  };
  getOrdersWareHouses(dto: IApiConfigDto): Observable<{data: IArticleFilterItem[]} | null>{
    return this._API.makePostRequest(dto);
  };
  getOrdersSubjects(dto: IApiConfigDto): Observable<{data: IArticleFilterItem[]} | null>{
    return this._API.makePostRequest(dto);
  };

  getSalesGoods(dto: IApiConfigDto): Observable<{data: IArticleFilterItem[]} | null>{
    return this._API.makePostRequest(dto);
  };
  getSalesCategories(dto: IApiConfigDto): Observable<{data: IArticleFilterItem[]} | null>{
    return this._API.makePostRequest(dto);
  };
  getSalesWareHouses(dto: IApiConfigDto): Observable<{data: IArticleFilterItem[]} | null>{
    return this._API.makePostRequest(dto);
  };
  getSalesSubjects(dto: IApiConfigDto): Observable<{data: IArticleFilterItem[]} | null>{
    return this._API.makePostRequest(dto);
  };
}
