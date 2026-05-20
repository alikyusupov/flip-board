import { IApiConfigDto } from "@models";

export class LoadCards {
  static readonly type = '[ProductAnalyticsRatesState] load cards';
  constructor(public dto: IApiConfigDto){}
}
export class LoadTableAndChart {
  static readonly type = '[ProductAnalyticsRatesState] load table row data and chart data';
  constructor(public dto: IApiConfigDto){}
}
