import { IApiConfigDto } from "@models";

export class LoadPnlGrid {
  static readonly type = '[FinancePnlState] load grid';
  constructor(public dto: IApiConfigDto){}
}