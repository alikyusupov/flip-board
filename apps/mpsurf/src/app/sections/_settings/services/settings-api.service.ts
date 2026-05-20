/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, Injectable } from "@angular/core";
import { IApiConfigDto } from "@models";
import { ApiService } from "app/services/api.service";
import { Observable, of } from "rxjs";

import { ISettingsService } from "../models";
import { ISettingsItemsGrid } from "../pages/items/items.model";
import { IFinPartner } from "../pages/partners/partners.model";

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements ISettingsService {

  private readonly _API = inject(ApiService);

  loadItemsGrid(dto: IApiConfigDto): Observable<ISettingsItemsGrid[]>{
    return this._API.makeGetRequest(dto)
  };

  loadPartners(dto: IApiConfigDto): Observable<IFinPartner[]>{
    return this._API.makeGetRequest(dto)
  };
  
}