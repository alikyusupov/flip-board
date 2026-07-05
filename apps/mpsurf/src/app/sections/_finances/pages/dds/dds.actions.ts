import { IApiConfigDto } from "@models";

export class LoadDdsGrid {
  static readonly type = '[FinanceDdsState] load grid';
  constructor(public dto: IApiConfigDto){}
}

export class LoadAccounts {
  static readonly type = '[FinanceDdsState] load accounts';
  constructor(public dto: IApiConfigDto){}
}

export class LoadPartners {
  static readonly type = '[FinanceDdsState] load partners';
  constructor(public dto: IApiConfigDto){}
}