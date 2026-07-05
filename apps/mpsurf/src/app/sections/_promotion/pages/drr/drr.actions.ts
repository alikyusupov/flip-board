import { IApiConfigDto } from "@models";

export class LoadDdrTable {
  static readonly type = '[PromotionDdrState] load table';
  constructor(public dto: IApiConfigDto){}
}

export class LoadDdrCards {
  static readonly type = '[PromotionDdrState] load cards';
  constructor(public dto: IApiConfigDto){}
}

