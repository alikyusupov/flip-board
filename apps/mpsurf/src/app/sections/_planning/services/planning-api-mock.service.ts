/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@angular/core";
import { IApiConfigDto } from "@models";
import { delay, Observable, of } from "rxjs";

import { IPlanningService } from "../models";
import { CLUSTERS_GRID } from "../pages/clusters/clusters.mock";
import { IClustersGrid } from "../pages/clusters/clusters.model";
import { COSTPRICE_GRID } from "../pages/costprice/costprice.mock";
import { ICostPriceResponse } from "../pages/costprice/costprice.model";
import { REMAINS_TABLE, REMAINS_WAREHOUSES } from "../pages/remains/remains.mock";
import { IRemainsTableResponse } from "../pages/remains/remains.models";

@Injectable({
  providedIn: 'root'
})
export class PlanningMockService implements IPlanningService {

  loadWarehouses(dto: IApiConfigDto): Observable<string[]>{
    return of(REMAINS_WAREHOUSES).pipe(delay(1200))
  };
  loadTable(dto: IApiConfigDto): Observable<IRemainsTableResponse>{
    return of(REMAINS_TABLE).pipe(delay(1200))
  };
  loadClustersGrid(dto: IApiConfigDto): Observable<IClustersGrid>{
    return of(CLUSTERS_GRID).pipe(delay(1200))
  };
  loadCostpriceGrid(dto: IApiConfigDto): Observable<ICostPriceResponse>{
    return of(COSTPRICE_GRID).pipe(delay(1200))
  };
}