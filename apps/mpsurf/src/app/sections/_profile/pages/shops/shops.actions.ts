import { IApiConfigDto } from "@models";

export class LoadShops {
  static readonly type = '[ProfileShopsState] load shops';
  constructor(public dto: IApiConfigDto){}
}
export class UpdateConnectionName {
  static readonly type = '[ProfileShopsState] update connection name';
  constructor(public dto: IApiConfigDto){}
}
export class FetchShopTaxList {
  static readonly type = '[ProfileShopsState] fetch tax list';
  constructor(public dto: IApiConfigDto){}
}

export class SaveShopTaxList {
  static readonly type = '[ProfileShopsState] save tax list';
  constructor(public dto: IApiConfigDto){}
}

export class UpdateCurrency {
  static readonly type = '[ProfileShopsState] update currency';
  constructor(public dto: IApiConfigDto){}
}

