import { IApiConfigDto } from "@models";

export class LoadPlanFacts {
  static readonly type = '[FinancePLanFactState] load planfacts';
  constructor(public dto: IApiConfigDto){}
}

export class LoadPlanCards {
  static readonly type = '[FinancePLanFactState] load cards';
  constructor(public dto: IApiConfigDto){}
}

export class LoadGeneralInfo {
  static readonly type = '[FinancePLanFactState] load general info';
  constructor(public dto: IApiConfigDto){}
}

export class LoadChart {
  static readonly type = '[FinancePLanFactState] load chart';
  constructor(public dto: IApiConfigDto){}
}

export class LoadFullTable {
  static readonly type = '[FinancePLanFactState] load full table';
  constructor(public dto: IApiConfigDto){}
}

export class LoadPlanFactById {
  static readonly type = '[FinancePLanFactState] load plan fact by id';
  constructor(public dto: IApiConfigDto){}
}

export class UpsertPlanFact {
  static readonly type = '[FinancePLanFactState] upsert plan fact';
  constructor(public dto: IApiConfigDto){}
}