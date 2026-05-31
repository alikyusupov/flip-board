/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, Injectable } from "@angular/core";
import { IApiConfigDto, IBaseResponseData, ICardWidget } from "@models";
import { ApiService } from "app/services/api.service";
import { Observable, of } from "rxjs";

import { IFinancesService } from "../models";
import { IDDSAccount,IDDSGridData, IDDSPartner } from "../pages/dds/dds.model";
import { IFinOperation } from "../pages/operations/operations.model";
import { IFullTableItem, IPlanFactById, IPlanFactByIdArticle, IPlanFactChartItem, IPlanFactGeneralInfo, IPlanFactItem } from "../pages/plan-fact/plan-fact.model";
import { IPNLGridData } from "../pages/pnl/pnl.model";
import { IReconciliationRow } from "../pages/reconciliation/reconciliation.model";

@Injectable({
  providedIn: 'root'
})
export class FinancesService implements IFinancesService {

  private readonly _API = inject(ApiService);

  loadPlanCards(dto: IApiConfigDto): Observable<ICardWidget[]> {
    return this._API.makeGetRequest(dto)
  };

  loadPlanGeneralInfo(dto: IApiConfigDto): Observable<IPlanFactGeneralInfo> {
    return this._API.makeGetRequest(dto)
  };

  loadPlanChart(dto: IApiConfigDto): Observable<IPlanFactChartItem[]> {
    return this._API.makeGetRequest(dto)
  };

  loadPlanFulltable(dto: IApiConfigDto): Observable<IFullTableItem[]> {
    return this._API.makeGetRequest(dto)
  };

  loadPlanFactByid(dto: IApiConfigDto): Observable<IPlanFactById> {
    return this._API.makeGetRequest(dto)
  };

  loadPlanFacts(dto: IApiConfigDto): Observable<IPlanFactItem[]>{
    return this._API.makeGetRequest(dto)
  };

  loadPlanFactArticles(dto: IApiConfigDto): Observable<IPlanFactByIdArticle[]>{
    return this._API.makeGetRequest(dto)
  };

  loadDDSGrid(dto: IApiConfigDto): Observable<IDDSGridData>{
    return this._API.makeGetRequest(dto)
  };
  loadDDSPartners(dto: IApiConfigDto): Observable<IDDSPartner[]>{
    return of([])
  };
  loadDDSAccounts(dto: IApiConfigDto): Observable<IDDSAccount[]>{
    return of([])
  };

  loadPnlGrid(dto: IApiConfigDto): Observable<IPNLGridData>{
    return this._API.makePostRequest(dto)
  };

  loadOperations(dto: IApiConfigDto): Observable<IFinOperation[]>{
    return this._API.makeGetRequest(dto)
  };

  loadReconciliationRows(dto: IApiConfigDto): Observable<IReconciliationRow[]>{
    return this._API.makeGetRequest(dto)
  };

  loadReconciliationCards(dto: IApiConfigDto): Observable<ICardWidget[]>{
    return this._API.makeGetRequest(dto)
  };

  upsertPlanfact(dto: IApiConfigDto): Observable<IBaseResponseData>{
    return this._API.makePostRequest(dto)
  }

  clonePlanfact(dto: IApiConfigDto): Observable<IBaseResponseData>{
    return this._API.makePostRequest(dto)
  };
  
  deletePlanfact(dto: IApiConfigDto): Observable<IBaseResponseData>{
    return this._API.makeDeleteRequest(dto)
  };
    
}