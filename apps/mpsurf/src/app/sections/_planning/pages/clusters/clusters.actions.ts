import { IApiConfigDto } from "@models";

export class LoadClustersGrid {
  static readonly type = '[PlanningClustersState] load grid';
  constructor(public dto: IApiConfigDto){}
}