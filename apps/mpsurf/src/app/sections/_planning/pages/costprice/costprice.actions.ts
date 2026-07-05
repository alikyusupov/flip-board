import { IApiConfigDto } from "@models";

export class LoadCostPriceGrid {
  static readonly type = '[PlanningCostpriceState] load grid';
  constructor(public dto: IApiConfigDto){}
}