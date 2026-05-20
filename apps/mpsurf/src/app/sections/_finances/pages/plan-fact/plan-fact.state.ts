/* eslint-disable @typescript-eslint/no-this-alias */
import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType, ICardWidget } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { NzNotificationService } from "ng-zorro-antd/notification";

import { FINANCES_SERVICE_TOKEN } from "../../tokens";
import { LoadChart, LoadFullTable, LoadGeneralInfo, LoadPlanCards, LoadPlanFactById, LoadPlanFacts, UpsertPlanFact } from "./plan-fact.actions";
import { IFullTableItem, IPlanFactById, IPlanFactChartItem, IPlanFactGeneralInfo, IPlanFactItem } from "./plan-fact.model";

export interface FinancesPlanFactStateModel {

  isPlanFactListLoading: boolean,
  isPlanFactCardsLoading: boolean,
  isPlanFactGeneralInfoLoading: boolean,
  isPlanFactChartLoading: boolean,
  isPlanFactFulltableLoading: boolean,
  isPlanFactByIdLoading: boolean,

  planFactListStatus: ApiRequestStateType,
  planFactCardsStatus: ApiRequestStateType,
  planFactGeneralInfoStatus: ApiRequestStateType,
  planFactChartStatus: ApiRequestStateType,
  planFactFulltableStatus: ApiRequestStateType,
  planFactByIdStatus: ApiRequestStateType,

  planFactList: IPlanFactItem[],
  planFactCards: ICardWidget[],
  planFactGeneralInfo: IPlanFactGeneralInfo | null,
  planFactChart: IPlanFactChartItem[],
  planFactFulltable: IFullTableItem[],
  planFactById: IPlanFactById | null,
}

@State<FinancesPlanFactStateModel>({
  name: 'FinancesPlanFactState',
  defaults: {
    isPlanFactListLoading: false,
    planFactListStatus: 'success',
    planFactList: [],

    isPlanFactCardsLoading: false,
    isPlanFactGeneralInfoLoading: false,
    isPlanFactChartLoading: false,
    isPlanFactFulltableLoading: false,
    isPlanFactByIdLoading: false,

    planFactCardsStatus: "success",
    planFactGeneralInfoStatus: "success",
    planFactChartStatus: "success",
    planFactFulltableStatus: "success",
    planFactByIdStatus: "success",

    planFactCards: [],
    planFactGeneralInfo: null,
    planFactChart: [],
    planFactFulltable: [],
    planFactById: null
  }
})
@Injectable()
export class FinancesPlanFactState {

  private readonly financesService = inject(FINANCES_SERVICE_TOKEN);
  private readonly notification = inject(NzNotificationService)

  @Selector()
  static planFactList(state: FinancesPlanFactStateModel): IPlanFactItem[] {
    return state.planFactList
  }

  @Selector()
  static isPlanFactListLoading(state: FinancesPlanFactStateModel): boolean {
    return state.isPlanFactListLoading;
  }

  @Selector()
  static planFactListStatus(state: FinancesPlanFactStateModel): ApiRequestStateType {
    return state.planFactListStatus;
  }

  @Selector()
  static planFactCards(state: FinancesPlanFactStateModel): ICardWidget[] {
    return state.planFactCards;
  }

  @Selector()
  static isPlanFactCardsLoading(state: FinancesPlanFactStateModel): boolean {
    return state.isPlanFactCardsLoading;
  }

  @Selector()
  static planFactCardsStatus(state: FinancesPlanFactStateModel): ApiRequestStateType {
    return state.planFactCardsStatus;
  }

  @Selector()
  static planFactGeneralInfo(state: FinancesPlanFactStateModel): IPlanFactGeneralInfo | null {
    return state.planFactGeneralInfo;
  }

  @Selector()
  static isPlanFactGeneralInfoLoading(state: FinancesPlanFactStateModel): boolean {
    return state.isPlanFactGeneralInfoLoading;
  }

  @Selector()
  static planFactGeneralInfoStatus(state: FinancesPlanFactStateModel): ApiRequestStateType {
    return state.planFactGeneralInfoStatus;
  }

  @Selector()
  static planFactChart(state: FinancesPlanFactStateModel): IPlanFactChartItem[] {
    return state.planFactChart;
  }

  @Selector()
  static isPlanFactChartLoading(state: FinancesPlanFactStateModel): boolean {
    return state.isPlanFactChartLoading;
  }

  @Selector()
  static planFactChartStatus(state: FinancesPlanFactStateModel): ApiRequestStateType {
    return state.planFactChartStatus;
  }

  @Selector()
  static planFactFulltable(state: FinancesPlanFactStateModel): IFullTableItem[] {
    return state.planFactFulltable;
  }

  @Selector()
  static isPlanFactFulltableLoading(state: FinancesPlanFactStateModel): boolean {
    return state.isPlanFactFulltableLoading;
  }

  @Selector()
  static planFactFulltableStatus(state: FinancesPlanFactStateModel): ApiRequestStateType {
    return state.planFactFulltableStatus;
  }

  @Selector()
  static planFactById(state: FinancesPlanFactStateModel): IPlanFactById | null {
    return state.planFactById;
  }

  @Selector()
  static isPlanFactByIdLoading(state: FinancesPlanFactStateModel): boolean {
    return state.isPlanFactByIdLoading;
  }

  @Selector()
  static planFactByIdStatus(state: FinancesPlanFactStateModel): ApiRequestStateType {
    return state.planFactByIdStatus;
  }

  @Action(LoadPlanFacts)
  loadPlanfacts(ctx: StateContext<FinancesPlanFactStateModel>, {dto}: LoadPlanFacts) {
    ctx.patchState({
      planFactList: [],
      planFactListStatus: 'success',
      isPlanFactListLoading: true
    })

    this.financesService.loadPlanFacts(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            planFactList: data,
            isPlanFactListLoading: false
          })
        },
        error() {
          ctx.patchState({
            planFactListStatus: 'error',
            isPlanFactListLoading: false
          })
        }
      })
  }

  @Action(LoadPlanCards)
  loadPlanCards(ctx: StateContext<FinancesPlanFactStateModel>, {dto}: LoadPlanCards) {
    ctx.patchState({
      planFactCards: [],
      planFactCardsStatus: 'success',
      isPlanFactCardsLoading: true
    })

    this.financesService.loadPlanCards(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            planFactCards: data,
            isPlanFactCardsLoading: false
          })
        },
        error() {
          ctx.patchState({
            planFactCardsStatus: 'error',
            isPlanFactCardsLoading: false
          })
        }
      })
  }

  @Action(LoadGeneralInfo)
  loadGeneralInfo(ctx: StateContext<FinancesPlanFactStateModel>, {dto}: LoadGeneralInfo) {
    ctx.patchState({
      planFactGeneralInfo: null,
      planFactGeneralInfoStatus: 'success',
      isPlanFactGeneralInfoLoading: true
    })

    this.financesService.loadPlanGeneralInfo(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            planFactGeneralInfo: data,
            isPlanFactGeneralInfoLoading: false
          })
        },
        error() {
          ctx.patchState({
            planFactGeneralInfoStatus: 'error',
            isPlanFactGeneralInfoLoading: false
          })
        }
      })
  }

  @Action(LoadChart)
  loadChart(ctx: StateContext<FinancesPlanFactStateModel>, {dto}: LoadChart) {
    ctx.patchState({
      planFactChart: [],
      planFactChartStatus: 'success',
      isPlanFactChartLoading: true
    })

    this.financesService.loadPlanChart(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            planFactChart: data,
            isPlanFactChartLoading: false
          })
        },
        error() {
          ctx.patchState({
            planFactChartStatus: 'error',
            isPlanFactChartLoading: false
          })
        }
      })
  }

  @Action(LoadFullTable)
  loadFullTable(ctx: StateContext<FinancesPlanFactStateModel>, {dto}: LoadFullTable) {
    ctx.patchState({
      planFactFulltable: [],
      planFactFulltableStatus: 'success',
      isPlanFactFulltableLoading: true
    })

    this.financesService.loadPlanFulltable(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            planFactFulltable: data,
            isPlanFactFulltableLoading: false
          })
        },
        error() {
          ctx.patchState({
            planFactFulltableStatus: 'error',
            isPlanFactFulltableLoading: false
          })
        }
      })
  }

  @Action(LoadPlanFactById)
  loadPlanFactById(ctx: StateContext<FinancesPlanFactStateModel>, {dto}: LoadPlanFactById) {
    ctx.patchState({
      planFactById: null,
      planFactByIdStatus: 'success',
      isPlanFactByIdLoading: true
    })

    this.financesService.loadPlanFactByid(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            planFactById: data,
            isPlanFactByIdLoading: false
          })
        },
        error() {
          ctx.patchState({
            planFactByIdStatus: 'error',
            isPlanFactByIdLoading: false
          })
        }
      })
  }

  @Action(UpsertPlanFact)
  upsertPlanFact(ctx: StateContext<FinancesPlanFactStateModel>, {dto}: UpsertPlanFact) {

    const self = this;
   
    this.financesService.upsertPlanfact(dto)
      .subscribe({
        next(res) {

          if(res.is_error){
            self.notification.create('error', 'Статус:', res.msg);

          } else {
            self.notification.create('success', 'Статус:', res.msg);
            ctx.dispatch(new LoadPlanFacts({
              method: 'GET',
              endpoint: 'plan-fact',
            }))
          } 

        },
        error() {

           self.notification.create('error', 'Статус:', 'Ошибка создания плана')
          
        }
      })
  }
}