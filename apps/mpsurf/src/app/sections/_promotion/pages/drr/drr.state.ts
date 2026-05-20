import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType, ICardWidget } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { PROMOTION_SERVICE_TOKEN } from "../../tokens";
import { LoadDdrCards, LoadDdrTable } from "./drr.actions";
import { IDdrListItem } from "./drr.model";

export interface PromotionDdrStateModel {
  isDdrTableLoading: boolean,
  isDdrCardsLoading: boolean,

  tableStatus: ApiRequestStateType,
  cardsStatus: ApiRequestStateType,

  table: IDdrListItem[],
  cards: ICardWidget[],
}

@State<PromotionDdrStateModel>({
  name: 'PromotionDdrState',
  defaults: {

    isDdrTableLoading: false,
    isDdrCardsLoading: false,

    tableStatus: 'success',
    cardsStatus: 'success',

    table: [],
    cards: [],
  }
})
@Injectable()
export class PromotionDdrState {

  private readonly promotionService = inject(PROMOTION_SERVICE_TOKEN);


  @Selector()
  static cards(state: PromotionDdrStateModel): ICardWidget[] {
    return state.cards
  }

  @Selector()
  static isCardsLoading(state: PromotionDdrStateModel): boolean {
    return state.isDdrCardsLoading;
  }


  @Selector()
  static table(state: PromotionDdrStateModel): IDdrListItem[] {
    return state.table
  }

  @Selector()
  static isTableLoading(state: PromotionDdrStateModel): boolean {
    return state.isDdrTableLoading;
  }


  @Action(LoadDdrTable)
  loadDdrTable(ctx: StateContext<PromotionDdrStateModel>, {dto}: LoadDdrTable) {
    ctx.patchState({
      table: [],
      tableStatus: 'success',
      isDdrTableLoading: true
    })

    this.promotionService.loadDdrTable(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            table: data.data,
            isDdrTableLoading: false
          })
        },
        error() {
          ctx.patchState({
            tableStatus: 'error',
            isDdrTableLoading: false
          })
        }
      })
  }

  @Action(LoadDdrCards)
  loadDdrCards(ctx: StateContext<PromotionDdrStateModel>, {dto}: LoadDdrCards) {
    ctx.patchState({
      cards: [],
      cardsStatus: 'success',
      isDdrCardsLoading: true
    })

    this.promotionService.loadDdrCards(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            cards: data,
            isDdrCardsLoading: false
          })
        },
        error() {
          ctx.patchState({
            cardsStatus: 'error',
            isDdrCardsLoading: false
          })
        }
      })
  }
}