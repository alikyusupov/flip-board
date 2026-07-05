/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@angular/core";
import { IApiConfigDto } from "@models";
import { delay, Observable, of } from "rxjs";

import { ISettingsService } from "../models";
import { SETTINGS_ITEMS_GRID } from "../pages/items/items.mock";
import { ISettingsItemsGrid } from "../pages/items/items.model";
import { FIN_PARTNERS } from "../pages/partners/partners.mock";
import { IFinPartner } from "../pages/partners/partners.model";

@Injectable({
  providedIn: 'root'
})
export class SettingsMockService implements ISettingsService {

  loadItemsGrid(dto: IApiConfigDto): Observable<ISettingsItemsGrid[]>{
    return of(SETTINGS_ITEMS_GRID).pipe(delay(1200))
  };

  loadPartners(dto: IApiConfigDto): Observable<IFinPartner[]>{
    return of(FIN_PARTNERS).pipe(delay(1200))
  };
  
}