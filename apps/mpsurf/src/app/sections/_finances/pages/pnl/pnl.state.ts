import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { FINANCES_SERVICE_TOKEN } from "../../tokens";
import { LoadPnlGrid } from "./pnl.actions";
import { IPNLGridData } from "./pnl.model";

export interface FinancesPnlStateModel {
  isPnlGridLoading: boolean,

  gridStatus: ApiRequestStateType,

  grid: IPNLGridData | null,
}

@State<FinancesPnlStateModel>({
  name: 'FinancesPnlState',
  defaults: {

    isPnlGridLoading: false,

    gridStatus: 'success',

    grid: null,
  }
})
@Injectable()
export class FinancesPnlState {

  private readonly financesService = inject(FINANCES_SERVICE_TOKEN);

  @Selector()
  static grid(state: FinancesPnlStateModel): IPNLGridData | null {
    return state.grid
  }

  @Selector()
  static isPnlGridLoading(state: FinancesPnlStateModel): boolean {
    return state.isPnlGridLoading;
  }

  @Selector()
  static gridStatus(state: FinancesPnlStateModel): ApiRequestStateType {
    return state.gridStatus;
  }

  @Action(LoadPnlGrid)
  loadGrid(ctx: StateContext<FinancesPnlStateModel>, {dto}: LoadPnlGrid) {
    ctx.patchState({
      grid: null,
      gridStatus: 'success',
      isPnlGridLoading: true
    })

    this.financesService.loadPnlGrid(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            grid: data,
            isPnlGridLoading: false
          })
        },
        error() {
          ctx.patchState({
            gridStatus: 'error',
            isPnlGridLoading: false
          })
        }
      })
  }
}