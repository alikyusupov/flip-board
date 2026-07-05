import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { PLANNING_SERVICE_TOKEN } from "../../tokens";
import { LoadClustersGrid } from "./clusters.actions";
import { IClustersGrid } from "./clusters.model";

export interface PlanningClustersStateModel {

  isTableLoading: boolean,

  tableStatus: ApiRequestStateType,

  table: IClustersGrid,
}

@State<PlanningClustersStateModel>({
  name: 'PlanningClustersState',
  defaults: {

    isTableLoading: false,

    tableStatus: 'success',

    table: [],
  }
})
@Injectable()
export class PlanningClustersState {

  private readonly planningService = inject(PLANNING_SERVICE_TOKEN);


  @Selector()
  static table(state: PlanningClustersStateModel): IClustersGrid {
    return state.table
  }

  @Selector()
  static isTableLoading(state: PlanningClustersStateModel): boolean {
    return state.isTableLoading;
  }



  @Action(LoadClustersGrid)
  loadClustersTable(ctx: StateContext<PlanningClustersStateModel>, {dto}: LoadClustersGrid) {
    ctx.patchState({
      table: [],
      tableStatus: 'success',
      isTableLoading: true
    })

    this.planningService.loadClustersGrid(dto)
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