import { IApiConfigDto, IBaseResponseData, ICardWidget } from "@models";
import { Observable } from "rxjs";

import { IDDSAccount, IDDSGridData, IDDSPartner } from "../pages/dds/dds.model";
import { IFinOperation } from "../pages/operations/operations.model";
import { IFullTableItem, IPlanFactById, IPlanFactChartItem, IPlanFactGeneralInfo, IPlanFactItem } from "../pages/plan-fact/plan-fact.model";
import { IPNLGridData } from "../pages/pnl/pnl.model";
import { IReconciliationRow } from "../pages/reconciliation/reconciliation.model";

export interface IFinancesService {
  loadDDSGrid: (dto: IApiConfigDto) => Observable<IDDSGridData>,
  loadDDSPartners: (dto: IApiConfigDto) => Observable<IDDSPartner[]>,
  loadDDSAccounts: (dto: IApiConfigDto) => Observable<IDDSAccount[]>,

  loadPnlGrid: (dto: IApiConfigDto) => Observable<IPNLGridData>,

  loadOperations: (dto: IApiConfigDto) => Observable<IFinOperation[]>,

  loadReconciliationRows: (dto: IApiConfigDto) => Observable<IReconciliationRow[]>,

  loadReconciliationCards: (dto: IApiConfigDto) => Observable<ICardWidget[]>,

  loadPlanFacts: (dto: IApiConfigDto) => Observable<IPlanFactItem[]>,

  loadPlanCards: (dto: IApiConfigDto) => Observable<ICardWidget[]>,

  loadPlanGeneralInfo: (dto: IApiConfigDto) => Observable<IPlanFactGeneralInfo>,

  loadPlanChart: (dto: IApiConfigDto) => Observable<IPlanFactChartItem[]>,

  loadPlanFulltable: (dto: IApiConfigDto) => Observable<IFullTableItem[]>,

  loadPlanFactByid: (dto: IApiConfigDto) => Observable<IPlanFactById>,

  upsertPlanfact: (dto: IApiConfigDto) => Observable<IBaseResponseData>,

  clonePlanfact: (dto: IApiConfigDto) => Observable<IBaseResponseData>,

  deletePlanfact: (dto: IApiConfigDto) => Observable<IBaseResponseData>,

}