import { IApiConfigDto } from "@models";

export class LoadTable {
  static readonly type = '[ProductAnalyticsSalesState] load table';
  constructor(public dto: IApiConfigDto){}
}

export class LoadChart {
  static readonly type = '[ProductAnalyticsSalesState] load chart';
  constructor(public dto: IApiConfigDto){}
}

export class GetSalesNmids {
  static readonly type = '[ProductAnalyticsSalesState] Fetch filters [sales goods]';
  constructor(public dto: IApiConfigDto){}
}

export class GetSalesSubjects {
  static readonly type = '[ProductAnalyticsSalesState] Fetch filters [sales subjects]';
  constructor(public dto: IApiConfigDto){}
}

export class GetSalesWareHouses {
  static readonly type = '[ProductAnalyticsSalesState] Fetch filters [sales warehouses]';
  constructor(public dto: IApiConfigDto){}
}

export class GetSalesCategories {
  static readonly type = '[ProductAnalyticsSalesState] Fetch filters [sales categories]';
  constructor(public dto: IApiConfigDto){}
} 