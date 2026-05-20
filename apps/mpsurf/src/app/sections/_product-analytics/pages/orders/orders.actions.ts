import { IApiConfigDto } from "@models";

export class LoadTable {
  static readonly type = '[ProductAnalyticsOrdersState] load table';
  constructor(public dto: IApiConfigDto){}
}

export class LoadChart {
  static readonly type = '[ProductAnalyticsOrdersState] load chart';
  constructor(public dto: IApiConfigDto){}
}

export class GetOrdersNmids {
  static readonly type = '[ProductAnalyticsOrdersState] Fetch filters [orders goods]';
  constructor(public dto: IApiConfigDto){}
}

export class GetOrdersSubjects {
  static readonly type = '[ProductAnalyticsOrdersState] Fetch filters [orders subjects]';
  constructor(public dto: IApiConfigDto){}
}

export class GetOrdersWareHouses {
  static readonly type = '[ProductAnalyticsOrdersState] Fetch filters [orders warehouses]';
  constructor(public dto: IApiConfigDto){}
}

export class GetOrdersCategories {
  static readonly type = '[ProductAnalyticsOrdersState] Fetch filters [orders categories]';
  constructor(public dto: IApiConfigDto){}
} 

