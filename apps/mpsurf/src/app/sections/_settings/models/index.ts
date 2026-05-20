import { IApiConfigDto } from "@models";
import { Observable } from "rxjs";

import { ISettingsItemsGrid } from "../pages/items/items.model";
import { IFinPartner } from "../pages/partners/partners.model";

export interface ISettingsService {

  //PRODUCTS
  loadItemsGrid: (dto: IApiConfigDto) => Observable<ISettingsItemsGrid[]>;


  //PARTNERS
  loadPartners: (dto: IApiConfigDto) => Observable<IFinPartner[]>;
  
}