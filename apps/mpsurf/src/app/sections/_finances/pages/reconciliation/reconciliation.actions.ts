import { IApiConfigDto } from "@models";

export class LoadReconciliationRows {
  static readonly type = '[FinanceReconciliationState] load rows';
  constructor(public dto: IApiConfigDto){}
}

export class LoadReconciliationCards {
  static readonly type = '[FinanceReconciliationState] load cards';
  constructor(public dto: IApiConfigDto){}
}