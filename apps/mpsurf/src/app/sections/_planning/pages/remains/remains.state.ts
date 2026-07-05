import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType, IFilterOption } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { PLANNING_SERVICE_TOKEN } from "../../tokens";
import { LoadRemainsTable, LoadRemainsWarehouses } from "./remains.actions";
import { IRemainsTableResponse } from "./remains.models";

export interface PlanningRemainsStateModel {

  isTableLoading: boolean,
  isWarehousesLoading: boolean,

  tableStatus: ApiRequestStateType,
  warehousesStatus: ApiRequestStateType,

  table: IRemainsTableResponse | null,
  warehouses: IFilterOption[],
}

@State<PlanningRemainsStateModel>({
  name: 'PlanningRemainsState',
  defaults: {

    isTableLoading: false,
    isWarehousesLoading: false,

    tableStatus: 'success',
    warehousesStatus: 'success',

    table: null,
    warehouses: [],
  }
})
@Injectable()
export class PlanningRemainsState {

  private readonly planningService = inject(PLANNING_SERVICE_TOKEN);


  @Selector()
  static table(state: PlanningRemainsStateModel): IRemainsTableResponse | null {
    return state.table
  }

  @Selector()
  static isTableLoading(state: PlanningRemainsStateModel): boolean {
    return state.isTableLoading;
  }


  @Selector()
  static warehouses(state: PlanningRemainsStateModel): IFilterOption[] {
    return state.warehouses
  }

  @Selector()
  static isWarehousesLoading(state: PlanningRemainsStateModel): boolean {
    return state.isWarehousesLoading;
  }


  @Action(LoadRemainsTable)
  loadRemainsTable(ctx: StateContext<PlanningRemainsStateModel>, {dto}: LoadRemainsTable) {
    ctx.patchState({
      table: null,
      tableStatus: 'success',
      isTableLoading: true
    })

    this.planningService.loadTable(dto)
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

  @Action(LoadRemainsWarehouses)
  loadRemainsWarehouses(ctx: StateContext<PlanningRemainsStateModel>, {dto}: LoadRemainsWarehouses) {
    ctx.patchState({
      warehouses: [],
      warehousesStatus: 'success',
      isWarehousesLoading: true
    })

    this.planningService.loadWarehouses(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            warehouses: data.map(item => ({label: item, value: item})),
            isWarehousesLoading: false
          })
        },
        error() {
          ctx.patchState({
            warehousesStatus: 'error',
            isWarehousesLoading: false
          })
        }
      })
  }

}