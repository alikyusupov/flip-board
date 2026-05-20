import { Observable } from "rxjs";

export type ApiRequestStateType = 'error' | 'success';

export interface ICardWidget {
  title: string;
  drr?: number | null;
  subfields: {
    name: string;
    value: number | string | null;
    valueDiff: number;
    unit: 'percent' | 'rubles' | 'item' | 'day' | 'count' | null;
    diffInPercents?: number | null;
    ratioInPercents?: number;
    description?: string | null;
  }[];
  salesPercent?: number | null;
  ordersPercent?: number | null;
  totalCount?: number | string | null;
  totalSum?: number | string | null;
  totalUnits?: number | string;
  diffInPercents?: number | null;
  underConstruction?: boolean;
  description?: string | null;
  totalSumDiff: number;
  totalCountDiff: number;
  ordersPercentDiff: number;
}

export interface IShop {
  id: number,
  user_id: number,
  name: string,
  marketplace: number
}

export interface IArticleFilterItem {
  name: string,
  code: string
}

export interface IGoodFilterItem {
  SKU: string,
  nmid: string,
  Barcode: string,
  photo: string
}

export interface IStatusFilterItem {
  id: number,
  index: number,
  name: string
}

export interface IImtIdFilterItem {
  "imtID": number,
  "vendorCode": string
}

export interface IMainService {
  getShops: (dto: IApiConfigDto) => Observable<IShop[]>;
  getArticles: (dto: IApiConfigDto) => Observable<IArticleFilterItem[]>;
  getGoods: (dto: IApiConfigDto) => Observable<IGoodFilterItem[]>;
  getCategories: (dto: IApiConfigDto) => Observable<string[]>;
  getStatuses: (dto: IApiConfigDto) => Observable<IStatusFilterItem[]>;
  getBrands: (dto: IApiConfigDto) => Observable<string[]>;
  getTags: (dto: IApiConfigDto) => Observable<string[]>;
  getSubjects: (dto: IApiConfigDto) => Observable<string[]>;
  getWareHouses: (dto: IApiConfigDto) => Observable<string[]>;
  getImtIds: (dto: IApiConfigDto) => Observable<IImtId[]>;
}

export interface IApiConfigDto{
  method: 'GET' | 'POST' | 'PATCH',
  host?: string,
  endpoint?: string,
  params?: Record<string, unknown>,
  action?: string
}

export enum Marketplace {
  WB = 'WB',
  OZON = 'OZON',
  YANDEX = 'YANDEX',
  UNKNOWN = 'UNKNOWN',
}

export interface IBaseResponseData {
  is_error: number,
  msg: string
}

export interface IBaseResponse {
  data: IBaseResponseData
}

export interface INzOption<T> {
  label: string,
  value: T
}

export interface ICustomizationItem { 
  name: string, 
  key: string, 
  checked: boolean, 
  disabled: boolean, 
  dragDisabled: boolean
}

export interface IImtId {
  "imtID": number,
  "vendorCode": string
}