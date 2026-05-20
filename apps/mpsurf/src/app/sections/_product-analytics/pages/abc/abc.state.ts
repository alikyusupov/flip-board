import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType, ICardWidget } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { PRODUCT_ANALYTICS_SERVICE_TOKEN } from "../../tokens";
import { LoadAbcTable } from "./abc.actions";
import { generateCardData } from "./abc.func";
import { IAbcGridData } from "./abc.model";

export interface ProductAnalyticsAbcStateModel {
  isCardsLoading: boolean,
  isTableLoading: boolean,

  cardsStatus: ApiRequestStateType,
  tableStatus: ApiRequestStateType,

  cards: ICardWidget[],
  table: IAbcGridData | null,
}

@State<ProductAnalyticsAbcStateModel>({
  name: 'ProductAnalyticsAbcState',
  defaults: {
    isCardsLoading: false,
    isTableLoading: false,

    cardsStatus: 'success',
    tableStatus: 'success',

    cards: [],
    table: {
      data: [],
      otherDeductions: {},
      total: {},
      totalRecord: 0
    } as unknown as IAbcGridData,
  }
})
@Injectable()
export class ProductAnalyticsAbcState {

  private readonly productAnalyticsService = inject(PRODUCT_ANALYTICS_SERVICE_TOKEN);

  @Selector()
  static cards(state: ProductAnalyticsAbcStateModel): ICardWidget[] {
    return state.cards
  }

  @Selector()
  static isCardsLoading(state: ProductAnalyticsAbcStateModel): boolean {
    return state.isCardsLoading;
  }

  @Selector()
  static cardsStatus(state: ProductAnalyticsAbcStateModel): ApiRequestStateType {
    return state.cardsStatus;
  }

  @Selector()
  static table(state: ProductAnalyticsAbcStateModel): IAbcGridData | null {
    return state.table
  }

  @Selector()
  static isTableLoading(state: ProductAnalyticsAbcStateModel): boolean {
    return state.isTableLoading;
  }

  @Selector()
  static tableStatus(state: ProductAnalyticsAbcStateModel): ApiRequestStateType {
    return state.tableStatus;
  }


  @Action(LoadAbcTable)
  loadTable(ctx: StateContext<ProductAnalyticsAbcStateModel>, {dto}: LoadAbcTable) {

    ctx.patchState({ 
      table: null, 
      cards: [],
      isTableLoading: true,
      tableStatus: 'success',
      isCardsLoading: true,
      cardsStatus: 'success'
    });

    this.productAnalyticsService.loadAbcGrid(dto)
      .subscribe({
        next(data) {
          ctx.patchState({ 
            table: data, 
            isTableLoading: false, 
            tableStatus: 'success',
            cards: generateCardData(data.data),
            isCardsLoading: false,
            cardsStatus: 'success'
          });
        },
        error() {
          ctx.patchState({ 
            isTableLoading: false, 
            tableStatus: 'error',
            isCardsLoading: false,
            cardsStatus: 'error'
          });
        },
      })
  }

}