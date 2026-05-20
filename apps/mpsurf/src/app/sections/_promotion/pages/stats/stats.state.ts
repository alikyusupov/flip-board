import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { PROMOTION_SERVICE_TOKEN } from "../../tokens";
import { LoadStatsChart, LoadStatsTable } from "./stats.actions";
import { IStatsChartItem, IStatsListItem } from "./stats.model";

export interface PromotionStatsStateModel {
  isTableLoading: boolean,
  isChartLoading: boolean,

  tableStatus: ApiRequestStateType,
  chartStatus: ApiRequestStateType,

  table: IStatsListItem[],
  chart: IStatsChartItem[],
}

@State<PromotionStatsStateModel>({
  name: 'PromotionStatsState',
  defaults: {

    isTableLoading: false,
    isChartLoading: false,

    tableStatus: 'success',
    chartStatus: 'success',

    table: [],
    chart: [],
  }
})
@Injectable()
export class PromotionStatsState {

  private readonly promotionService = inject(PROMOTION_SERVICE_TOKEN);


  @Selector()
  static chart(state: PromotionStatsStateModel): IStatsChartItem[] {
    return state.chart
  }

  @Selector()
  static isChartLoading(state: PromotionStatsStateModel): boolean {
    return state.isChartLoading;
  }


  @Selector()
  static table(state: PromotionStatsStateModel): IStatsListItem[] {
    return state.table
  }

  @Selector()
  static isTableLoading(state: PromotionStatsStateModel): boolean {
    return state.isTableLoading;
  }

  @Action(LoadStatsTable)
  loadStatsTable(ctx: StateContext<PromotionStatsStateModel>, {dto}: LoadStatsTable) {
    ctx.patchState({
      table: [],
      tableStatus: 'success',
      isTableLoading: true
    })

    this.promotionService.loadStatsTable(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            table: data.data,
            isTableLoading: false
          })
        },
        error() {
          ctx.patchState({
            tableStatus: 'error',
            isTableLoading: false
          })
        }
      })
  }

  @Action(LoadStatsChart)
  loadStatsChart(ctx: StateContext<PromotionStatsStateModel>, {dto}: LoadStatsChart) {
    ctx.patchState({
      chart: [],
      chartStatus: 'success',
      isChartLoading: true
    })

    this.promotionService.loadStatsChart(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            chart: data.data,
            isChartLoading: false
          })
        },
        error() {
          ctx.patchState({
            chartStatus: 'error',
            isChartLoading: false
          })
        }
      })
  }

}