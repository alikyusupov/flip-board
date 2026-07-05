import { IApiConfigDto, IArticleFilterItem, ICardWidget } from "@models";
import { Observable } from "rxjs";

import { IAbcGridData } from "../pages/abc/abc.model";
import { IOrdersChart, IOrdersTable } from "../pages/orders/orders.model";
import { IRnpTable } from "../pages/rnp/rnp.model";
import { ISalesChart, ISalesTable } from "../pages/sales/sales.model";

export interface IRatesGridDay {
  "ordersCount": string|null,
  "cancelsCount": string|null,
  "ordersTotal": number|null,
  "cancelsTotal": number|null,
  "salesCount": string|null,
  "returnsCount": string|null,
  "salesTotal": number|null,
  "returnsTotal": number|null,
  "photo_new": string | null,
  "date": string|null
}

export interface IRatesGridSku {
  "ordersCount": string|null,
  "cancelsCount": string|null,
  "ordersTotal": number|null,
  "cancelsTotal": number|null,
  "salesCount": string|null,
  "returnsCount": string|null,
  "salesTotal": number|null,
  "returnsTotal": number|null,
  "photo_new": string|null,
  "sku": string|null
}

export interface IRatesGridTotal {
  "ordersCount": string|null,
  "cancelsCount": string|null,
  "ordersTotal": number|null,
  "cancelsTotal": number|null,
  "salesCount": string|null,
  "returnsCount": string|null,
  "salesTotal": number|null,
  "returnsTotal": number|null,
  "photo_new": string | null
}

export interface IRatesGridData {
  days: IRatesGridDay[],
  skus: IRatesGridSku[]
  total: IRatesGridTotal
}

export interface IProductAnalyticsService {
  loadCards: (dto: IApiConfigDto) => Observable<ICardWidget[]> ;
  loadGrid: (dto: IApiConfigDto) => Observable<IRatesGridData>;
  loadRnpTable_1: (dto: IApiConfigDto) => Observable<IRnpTable>;
  loadRnpTable_2: (dto: IApiConfigDto) => Observable<IRnpTable>;
  loadRnpTable_4: (dto: IApiConfigDto) => Observable<IRnpTable>;
  loadOrdersTable: (dto: IApiConfigDto) => Observable<IOrdersTable>;
  loadOrdersChart: (dto: IApiConfigDto) => Observable<IOrdersChart>;
  loadSalesTable: (dto: IApiConfigDto) => Observable<ISalesTable>;
  loadSalesChart: (dto: IApiConfigDto) => Observable<ISalesChart>;
  //ORDERS
  getOrdersGoods: (dto: IApiConfigDto) => Observable<{data: IArticleFilterItem[]} | null>;
  getOrdersCategories: (dto: IApiConfigDto) => Observable<{data: IArticleFilterItem[]} | null>;
  getOrdersWareHouses: (dto: IApiConfigDto) => Observable<{data: IArticleFilterItem[]} | null>;
  getOrdersSubjects: (dto: IApiConfigDto) => Observable<{data: IArticleFilterItem[]} | null>;
  //SALES
  getSalesGoods: (dto: IApiConfigDto) => Observable<{data: IArticleFilterItem[]} | null>;
  getSalesCategories: (dto: IApiConfigDto) => Observable<{data: IArticleFilterItem[]} | null>;
  getSalesWareHouses: (dto: IApiConfigDto) => Observable<{data: IArticleFilterItem[]} | null>;
  getSalesSubjects: (dto: IApiConfigDto) => Observable<{data: IArticleFilterItem[]} | null>;
  //ABC
  loadAbcGrid: (dto: IApiConfigDto) => Observable<IAbcGridData>;

}