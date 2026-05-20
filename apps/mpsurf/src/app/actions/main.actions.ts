import { IApiConfigDto, IShop } from "@models";

export class GetShops {
  static readonly type = '[MainState] Get a list of the shops';
  constructor(public dto: IApiConfigDto){}
}

export class SetSelectedShop {
  static readonly type = '[MainState] Set shop';
  constructor(public shop: IShop){}
}

export class GetArticles {
  static readonly type = '[MainState] Fetch filters [articles]';
  constructor(public dto: IApiConfigDto){}
}

export class GetGoods {
  static readonly type = '[MainState] Fetch filters [goods]';
  constructor(public dto: IApiConfigDto){}
}

export class GetCategories {
  static readonly type = '[MainState] Fetch filters [categories]';
  constructor(public dto: IApiConfigDto){}
}

export class GetStatuses {
  static readonly type = '[MainState] Fetch filters [statuses]';
  constructor(public dto: IApiConfigDto){}
}

export class GetBrands {
  static readonly type = '[MainState] Fetch filters [brands]';
  constructor(public dto: IApiConfigDto){}
}

export class GetTags {
  static readonly type = '[MainState] Fetch filters [tags]';
  constructor(public dto: IApiConfigDto){}
}

export class GetSubjects {
  static readonly type = '[MainState] Fetch filters [subjects]';
  constructor(public dto: IApiConfigDto){}
}

export class GetWareHouses {
  static readonly type = '[MainState] Fetch filters [warehouses]';
  constructor(public dto: IApiConfigDto){}
}

export class GetImtIds {
  static readonly type = '[MainState] load ids';
  constructor(public dto: IApiConfigDto){}
}

export class Reset {
  static readonly type = '[MainState] Reset state';
}

