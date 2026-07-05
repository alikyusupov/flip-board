import { IApiConfigDto } from "@models";

export class LoadOperations {
  static readonly type = '[FinanceOperationsState] load operations';
  constructor(public dto: IApiConfigDto){}
}