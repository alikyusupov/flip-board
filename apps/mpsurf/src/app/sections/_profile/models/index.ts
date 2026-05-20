import { IApiConfigDto, IBaseResponse } from "@models";
import { Observable } from "rxjs";

import { IShopWB, ITaxItem } from "../pages/shops/shops.model";

export interface IProfileService {
  getShops: (dto: IApiConfigDto) => Observable<IShopWB[]> ;

  updateConnectionName: (dto: IApiConfigDto) => Observable<IBaseResponse>;

  updateCurrency: (dto: IApiConfigDto) => Observable<{ msg: string }>;

  fetchTaxList: (dto: IApiConfigDto) => Observable<{ data: ITaxItem[] }>;

  saveTaxList: (dto: IApiConfigDto) => Observable<{ msg: string }>;
}