/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, Injectable } from "@angular/core";
import { IApiConfigDto, ICardWidget, IImtId } from "@models";
import { ApiService } from "app/services/api.service";
import { Observable, of } from "rxjs";

import { IPromotionService } from "../models";
import { IDdrListResponse } from "../pages/drr/drr.model";
import { IHeatMapFilterItem, IHeatMapOrders, IHeatMapSales } from "../pages/heatmap/heatmap.model";
import { IStatsChartResponse, IStatsListResponse } from "../pages/stats/stats.model";

@Injectable({
  providedIn: 'root'
})
export class PromotionService implements IPromotionService {

  private readonly _API = inject(ApiService)

  loadDdrCards(dto: IApiConfigDto): Observable<ICardWidget[]>{
    return this._API.makePostRequest(dto)
  };
  loadDdrTable(dto: IApiConfigDto): Observable<IDdrListResponse>{
    return this._API.makePostRequest(dto)
  };

  loadStatsChart(dto: IApiConfigDto): Observable<IStatsChartResponse>{
    return this._API.makePostRequest(dto)
  };
  loadStatsTable(dto: IApiConfigDto): Observable<IStatsListResponse>{
    return this._API.makePostRequest(dto)
  };

  loadHeatMapCatgories(dto: IApiConfigDto): Observable<IHeatMapFilterItem[]>{
    return this._API.makePostRequest(dto)
  };

  loadHeatMapSubjects(dto: IApiConfigDto): Observable<IHeatMapFilterItem[]>{
    return this._API.makePostRequest(dto)
  };
  loadHeatMapArticles(dto: IApiConfigDto): Observable<IHeatMapFilterItem[]>{
    return this._API.makePostRequest(dto)
  };
  
  loadHeatMapSales(dto: IApiConfigDto): Observable<IHeatMapSales>{
    return this._API.makePostRequest(dto)
  };
  loadHeatMapOrders(dto: IApiConfigDto): Observable<IHeatMapOrders>{
    return this._API.makePostRequest(dto)
  };
}