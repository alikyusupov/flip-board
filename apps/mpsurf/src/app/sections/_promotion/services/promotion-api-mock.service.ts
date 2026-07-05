/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@angular/core";
import { IApiConfigDto, ICardWidget, IImtId } from "@models";
import { delay, Observable, of } from "rxjs";

import { IPromotionService } from "../models";
import { DDR_CARDS, DDR_LIST } from "../pages/drr/drr.mock";
import { IDdrListResponse } from "../pages/drr/drr.model";
import { HEATMAP_ARTICLES, HEATMAP_CATEGORIES, HEATMAP_ORDERS, HEATMAP_SALES, HEATMAP_SUBJECTS } from "../pages/heatmap/heatmap.mock";
import { IHeatMapFilterItem, IHeatMapOrders, IHeatMapSales } from "../pages/heatmap/heatmap.model";
import { STATS_CHART, STATS_LIST } from "../pages/stats/stats.mock";
import { IStatsChartResponse, IStatsListResponse } from "../pages/stats/stats.model";

@Injectable({
  providedIn: 'root'
})
export class PromotionMockService implements IPromotionService {

  loadDdrCards(dto: IApiConfigDto): Observable<ICardWidget[]>{
    return of(DDR_CARDS).pipe(delay(1200))
  };
  loadDdrTable(dto: IApiConfigDto): Observable<IDdrListResponse>{
    return of(DDR_LIST).pipe(delay(1200))
  };

  loadStatsChart(dto: IApiConfigDto): Observable<IStatsChartResponse>{
    return of(STATS_CHART).pipe(delay(1200))
  };
  loadStatsTable(dto: IApiConfigDto): Observable<IStatsListResponse>{
    return of(STATS_LIST).pipe(delay(1200))
  };

  loadHeatMapCatgories(dto: IApiConfigDto): Observable<IHeatMapFilterItem[]>{
    return of(HEATMAP_CATEGORIES).pipe(delay(1200))
  };

  loadHeatMapSubjects(dto: IApiConfigDto): Observable<IHeatMapFilterItem[]>{
    return of(HEATMAP_SUBJECTS).pipe(delay(1200))
  };
  loadHeatMapArticles(dto: IApiConfigDto): Observable<IHeatMapFilterItem[]>{
    return of(HEATMAP_ARTICLES).pipe(delay(1200))
  };
  
  loadHeatMapSales(dto: IApiConfigDto): Observable<IHeatMapSales>{
    return of(HEATMAP_SALES).pipe(delay(1200))
  };
  loadHeatMapOrders(dto: IApiConfigDto): Observable<IHeatMapOrders>{
    return of(HEATMAP_ORDERS).pipe(delay(1200))
  };
}