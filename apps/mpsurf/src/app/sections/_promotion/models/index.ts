import { IApiConfigDto, ICardWidget } from "@models";
import { Observable } from "rxjs";

import { IDdrListResponse } from "../pages/drr/drr.model";
import { IHeatMapFilterItem, IHeatMapOrders, IHeatMapSales } from "../pages/heatmap/heatmap.model";
import { IStatsChartResponse, IStatsListResponse } from "../pages/stats/stats.model";

export interface IPromotionService {

  //DDR
  loadDdrCards: (dto: IApiConfigDto) => Observable<ICardWidget[]>;
  loadDdrTable: (dto: IApiConfigDto) => Observable<IDdrListResponse>;
  //STATS
  loadStatsChart: (dto: IApiConfigDto) => Observable<IStatsChartResponse>;
  loadStatsTable: (dto: IApiConfigDto) => Observable<IStatsListResponse>;
  //HEATMAP
  loadHeatMapCatgories: (dto: IApiConfigDto) => Observable<IHeatMapFilterItem[]>;
  loadHeatMapSubjects: (dto: IApiConfigDto) => Observable<IHeatMapFilterItem[]>;
  loadHeatMapArticles: (dto: IApiConfigDto) => Observable<IHeatMapFilterItem[]>;

  loadHeatMapSales: (dto: IApiConfigDto) => Observable<IHeatMapSales>;
  loadHeatMapOrders: (dto: IApiConfigDto) => Observable<IHeatMapOrders>;
}