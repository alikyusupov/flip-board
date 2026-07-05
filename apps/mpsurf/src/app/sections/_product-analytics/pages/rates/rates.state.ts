import { inject, Injectable } from '@angular/core';
import { ApiRequestStateType, ICardWidget } from '@models';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { IRatesGridData } from '../../models';
import { PRODUCT_ANALYTICS_SERVICE_TOKEN } from '../../tokens';
import { LoadCards, LoadTableAndChart } from './rates.actions';

export interface ProductAnalyticsRatesStateModel {
  isCardsLoading: boolean,
  isRowDataLoading: boolean,
  status: ApiRequestStateType,
  cards: ICardWidget[],
  rowData: IRatesGridData,
}

@State<ProductAnalyticsRatesStateModel>({
  name: 'ProductAnalyticsRatesState',
  defaults: {
    isCardsLoading: false,
    isRowDataLoading: false,
    status: 'success',
    cards: [],
    rowData: {
      days: [],
      skus: [],
      total: {}
    } as unknown as IRatesGridData,
  }
})
@Injectable()
export class ProductAnalyticsRatesState {

  private readonly productAnalyticsService = inject(PRODUCT_ANALYTICS_SERVICE_TOKEN);

  @Selector()
  static cards(state: ProductAnalyticsRatesStateModel): ICardWidget[] {
    return state.cards
  }

  @Selector()
  static isCardsLoading(state: ProductAnalyticsRatesStateModel): boolean {
    return state.isCardsLoading;
  }

  @Selector()
  static rowData(state: ProductAnalyticsRatesStateModel): IRatesGridData| null {
    return state.rowData
  }

  @Selector()
  static isRowDataLoading(state: ProductAnalyticsRatesStateModel): boolean {
    return state.isRowDataLoading;
  }

  @Action(LoadCards)
  loadCards(ctx: StateContext<ProductAnalyticsRatesStateModel>, {dto}: LoadCards) {

    ctx.patchState({ cards: [], isCardsLoading: true });

    this.productAnalyticsService.loadCards(dto)
      .subscribe({
        next(cards) {
          ctx.patchState({ cards: cards, isCardsLoading: false });
        },
        error() {
          ctx.patchState({ isCardsLoading: false });
        },
      })
  }

  @Action(LoadTableAndChart)
  loadTableAndChart(ctx: StateContext<ProductAnalyticsRatesStateModel>, {dto}: LoadTableAndChart) {

    ctx.patchState({ 
      rowData: {
        days: [],
        skus: [],
        total: {}
      } as unknown as IRatesGridData, 
      isRowDataLoading: true 
    });

    this.productAnalyticsService.loadGrid(dto)
      .subscribe({
        next(data) {
          ctx.patchState({ rowData: data, isRowDataLoading: false });
        },
        error() {
          ctx.patchState({ isRowDataLoading: false });
        },
      })
  }
}