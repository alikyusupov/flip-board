import { IApiConfigDto } from "@models";

export class LoadHeatMapCategories {
  static readonly type = '[PromotionHeatmapState] load categories';
  constructor(public dto: IApiConfigDto){}
}

export class LoadHeatMapSubjects {
  static readonly type = '[PromotionHeatmapState] load subjects';
  constructor(public dto: IApiConfigDto){}
}

export class LoadHeatMapArticles {
  static readonly type = '[PromotionHeatmapState] load articles';
  constructor(public dto: IApiConfigDto){}
}

export class LoadHeatMapSales {
  static readonly type = '[PromotionHeatmapState] load sales';
  constructor(public dto: IApiConfigDto){}
}

export class LoadHeatMapOrders {
  static readonly type = '[PromotionHeatmapState] load orders';
  constructor(public dto: IApiConfigDto){}
}