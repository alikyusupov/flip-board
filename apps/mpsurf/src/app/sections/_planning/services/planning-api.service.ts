/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, Injectable } from "@angular/core";
import { IApiConfigDto } from "@models";
import { ApiService } from "app/services/api.service";
import { Observable, of } from "rxjs";

import { IPlanningService } from "../models";
import { IClustersGrid } from "../pages/clusters/clusters.model";
import { ICostPriceResponse } from "../pages/costprice/costprice.model";
import { IRemainsTableResponse } from "../pages/remains/remains.models";

@Injectable({
  providedIn: 'root'
})
export class PlanningService implements IPlanningService {

  private readonly _API = inject(ApiService)

  loadWarehouses(dto: IApiConfigDto): Observable<string[]>{
    return this._API.makeGetRequest(dto)
  };
  loadTable(dto: IApiConfigDto): Observable<IRemainsTableResponse>{
    return this._API.makePostRequest(dto)
  };
  loadClustersGrid(dto: IApiConfigDto): Observable<IClustersGrid>{
    return this._API.makePostRequest(dto)
  };
  loadCostpriceGrid(dto: IApiConfigDto): Observable<ICostPriceResponse>{
    return this._API.makeGetRequest(dto)
  };

}