import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType, ICardWidget } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { FINANCES_SERVICE_TOKEN } from "../../tokens";
import { LoadReconciliationCards, LoadReconciliationRows } from "./reconciliation.actions";
import { IReconciliationRow } from "./reconciliation.model";

export interface FinancesReconciliationStateModel {
  isReconciliationListLoading: boolean,

  reconciliationListStatus: ApiRequestStateType,

  reconciliationList: IReconciliationRow[],

  isReconciliationCardsLoading: boolean,

  reconciliationCardsStatus: ApiRequestStateType,

  reconciliationCards: ICardWidget[],
}

@State<FinancesReconciliationStateModel>({
  name: 'FinancesReconciliationState',
  defaults: {

    isReconciliationListLoading: false,

    reconciliationListStatus: 'success',

    reconciliationList: [],

    isReconciliationCardsLoading: false,

    reconciliationCardsStatus: 'success',

    reconciliationCards: [],
  }
})
@Injectable()
export class FinancesReconciliationState {

  private readonly financesService = inject(FINANCES_SERVICE_TOKEN);

  @Selector()
  static reconciliationList(state: FinancesReconciliationStateModel): IReconciliationRow[] {
    return state.reconciliationList
  }

  @Selector()
  static isReconciliationListLoading(state: FinancesReconciliationStateModel): boolean {
    return state.isReconciliationListLoading;
  }

  @Selector()
  static reconciliationListStatus(state: FinancesReconciliationStateModel): ApiRequestStateType {
    return state.reconciliationListStatus;
  }

  @Selector()
  static reconciliationCards(state: FinancesReconciliationStateModel): ICardWidget[] {
    return state.reconciliationCards
  }

  @Selector()
  static isReconciliationCardsLoading(state: FinancesReconciliationStateModel): boolean {
    return state.isReconciliationCardsLoading;
  }

  @Selector()
  static reconciliationCardsStatus(state: FinancesReconciliationStateModel): ApiRequestStateType {
    return state.reconciliationCardsStatus;
  }

  @Action(LoadReconciliationRows)
  loadReconciliationRows(ctx: StateContext<FinancesReconciliationStateModel>, {dto}: LoadReconciliationRows) {
    ctx.patchState({
      reconciliationList: [],
      reconciliationListStatus: 'success',
      isReconciliationListLoading: true
    })

    this.financesService.loadReconciliationRows(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            reconciliationList: data,
            isReconciliationListLoading: false
          })
        },
        error() {
          ctx.patchState({
            reconciliationListStatus: 'error',
            isReconciliationListLoading: false
          })
        }
      })
  }

  @Action(LoadReconciliationCards)
  loadReconciliationCards(ctx: StateContext<FinancesReconciliationStateModel>, {dto}: LoadReconciliationCards) {
    ctx.patchState({
      reconciliationCards: [],
      reconciliationCardsStatus: 'success',
      isReconciliationCardsLoading: true
    })

    this.financesService.loadReconciliationCards(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            reconciliationCards: data,
            isReconciliationCardsLoading: false
          })
        },
        error() {
          ctx.patchState({
            reconciliationCardsStatus: 'error',
            isReconciliationCardsLoading: false
          })
        }
      })
  }
}