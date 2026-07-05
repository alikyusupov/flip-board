/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@angular/core";
import { IApiConfigDto, IBaseResponseData, ICardWidget } from "@models";
import { delay, Observable, of } from "rxjs";

import { IFinancesService } from "../models";
import { ACCOUNTS, GRID, PARTNERS } from "../pages/dds/dds.mock";
import { IDDSAccount, IDDSGridData, IDDSPartner } from "../pages/dds/dds.model";
import { FIN_OPERATIONS } from "../pages/operations/operations.mock";
import { IFinOperation, IFinOperationExportItem } from "../pages/operations/operations.model";
import { CLONE_PLAN_FACT_RESPONSE_MOCK, DELETE_PLAN_FACT_RESPONSE_MOCK, PLAN_FACT_BY_ID, PLAN_FACT_CARDS, PLAN_FACT_CHART, PLAN_FACT_FULLTABLE, PLAN_FACT_GENERAL_INFO, PLAN_FACT_LIST, UPSERT_PLAN_FACT_RESPONSE_MOCK } from "../pages/plan-fact/plan-fact.mock";
import { IFullTableItem, IPlanFactById, IPlanFactByIdArticle, IPlanFactChartItem, IPlanFactGeneralInfo, IPlanFactItem } from "../pages/plan-fact/plan-fact.model";
import { PNL_GRID_DATA } from "../pages/pnl/pnl.mock";
import { IPNLGridData } from "../pages/pnl/pnl.model";
import { RECONCILIATION_CARDS, RECONCILIATION_ROWS } from "../pages/reconciliation/reconciliation.mock";
import { IReconciliationRow } from "../pages/reconciliation/reconciliation.model";

@Injectable({
  providedIn: 'root'
})
export class FinancesMockService implements IFinancesService {

  loadPlanCards(dto: IApiConfigDto): Observable<ICardWidget[]>{
    return of(PLAN_FACT_CARDS).pipe(delay(1200))
  };

  loadPlanGeneralInfo(dto: IApiConfigDto): Observable<IPlanFactGeneralInfo>{
    return of(PLAN_FACT_GENERAL_INFO).pipe(delay(1200))
  };

  loadPlanChart(dto: IApiConfigDto): Observable<IPlanFactChartItem[]>{
    return of(PLAN_FACT_CHART).pipe(delay(1200))
  };

  loadPlanFulltable(dto: IApiConfigDto): Observable<IFullTableItem[]>{
    return of(PLAN_FACT_FULLTABLE).pipe(delay(1200))
  };

  loadPlanFactByid(dto: IApiConfigDto): Observable<IPlanFactById>{
    return of(PLAN_FACT_BY_ID).pipe(delay(1200))
  };

  loadPlanFacts(dto: IApiConfigDto): Observable<IPlanFactItem[]>{
    return of(PLAN_FACT_LIST).pipe(delay(1200))
  };

  loadPlanFactArticles(dto: IApiConfigDto): Observable<IPlanFactByIdArticle[]>{
    return of([]).pipe(delay(1200))
  };
  
  loadDDSGrid(dto: IApiConfigDto): Observable<IDDSGridData>{
    return of(GRID).pipe(delay(1200))
  };
  loadDDSPartners(dto: IApiConfigDto): Observable<IDDSPartner[]>{
    return of(PARTNERS).pipe(delay(1200))
  };
  loadDDSAccounts(dto: IApiConfigDto): Observable<IDDSAccount[]>{
    return of(ACCOUNTS).pipe(delay(1200))
  };

  loadPnlGrid(dto: IApiConfigDto): Observable<IPNLGridData>{
    return of(PNL_GRID_DATA).pipe(delay(1200))
  };

  loadOperations(dto: IApiConfigDto): Observable<IFinOperation[]>{
    return of(FIN_OPERATIONS).pipe(delay(1200))
  };

  loadOperationsExport(dto: IApiConfigDto): Observable<IFinOperationExportItem[]>{
    return of([]).pipe(delay(1200))
  };

  loadReconciliationRows(dto: IApiConfigDto): Observable<IReconciliationRow[]>{
    return of(RECONCILIATION_ROWS).pipe(delay(1200))
  };

  loadReconciliationCards(dto: IApiConfigDto): Observable<ICardWidget[]>{
    return of(RECONCILIATION_CARDS).pipe(delay(1200))
  };

  upsertPlanfact(dto: IApiConfigDto): Observable<IBaseResponseData>{
    return of(UPSERT_PLAN_FACT_RESPONSE_MOCK).pipe(delay(1200))
  }

  clonePlanfact(dto: IApiConfigDto): Observable<IBaseResponseData>{
    return of(CLONE_PLAN_FACT_RESPONSE_MOCK).pipe(delay(1200))
  };

  deletePlanfact(dto: IApiConfigDto): Observable<IBaseResponseData>{
    return of(DELETE_PLAN_FACT_RESPONSE_MOCK).pipe(delay(1200))
  };
    
}