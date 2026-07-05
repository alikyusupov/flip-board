import { IApiConfigDto } from "@models";

export class LoadRemainsTable {
  static readonly type = '[PlanningRemainsState] load table';
  constructor(public dto: IApiConfigDto){}
}

export class LoadRemainsWarehouses {
  static readonly type = '[PlanningRemainsState] load warehouses';
  constructor(public dto: IApiConfigDto){}
}
