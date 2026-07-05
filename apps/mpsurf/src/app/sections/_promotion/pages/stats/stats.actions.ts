import { IApiConfigDto } from "@models";

export class LoadStatsTable {
  static readonly type = '[PromotionStatsState] load table';
  constructor(public dto: IApiConfigDto){}
}

export class LoadStatsChart {
  static readonly type = '[PromotionStatsState] load cards';
  constructor(public dto: IApiConfigDto){}
}
