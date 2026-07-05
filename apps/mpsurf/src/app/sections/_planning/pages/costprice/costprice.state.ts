import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { PLANNING_SERVICE_TOKEN } from "../../tokens";
import { LoadCostPriceGrid } from "./costprice.actions";
import { ICostPriceResponse } from "./costprice.model";

export interface PlanningCostpriceStateModel {

  isTableLoading: boolean,

  tableStatus: ApiRequestStateType,

  table: ICostPriceResponse | null,
}

@State<PlanningCostpriceStateModel>({
  name: 'PlanningCostpriceState',
  defaults: {

    isTableLoading: false,

    tableStatus: 'success',

    table: null,
  }
})
@Injectable()
export class PlanningCostpriceState {

  private readonly planningService = inject(PLANNING_SERVICE_TOKEN);


  @Selector()
  static table(state: PlanningCostpriceStateModel): ICostPriceResponse | null {
    return state.table
  }

  @Selector()
  static isTableLoading(state: PlanningCostpriceStateModel): boolean {
    return state.isTableLoading;
  }



  @Action(LoadCostPriceGrid)
  loadCostPriceGrid(ctx: StateContext<PlanningCostpriceStateModel>, {dto}: LoadCostPriceGrid) {
    ctx.patchState({
      table: null,
      tableStatus: 'success',
      isTableLoading: true
    })

    this.planningService.loadCostpriceGrid(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            table: data,
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

}