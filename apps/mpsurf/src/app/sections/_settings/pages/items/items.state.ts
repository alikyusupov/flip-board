import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { SETTINGS_SERVICE_TOKEN } from "../../tokens";
import { LoadItemsGrid } from "./items.actions";
import { ISettingsItemsGrid } from "./items.model";

export interface SettingsItemsStateModel {

  isGridLoading: boolean,

  gridStatus: ApiRequestStateType,

  grid: ISettingsItemsGrid[],
}

@State<SettingsItemsStateModel>({
  name: 'SettingsItemsState',
  defaults: {

    isGridLoading: false,

    gridStatus: 'success',

    grid: [],
  }
})
@Injectable()
export class SettingsItemsState {

  private readonly settingsService = inject(SETTINGS_SERVICE_TOKEN);


  @Selector()
  static grid(state: SettingsItemsStateModel): ISettingsItemsGrid[] {
    return state.grid
  }

  @Selector()
  static isGridLoading(state: SettingsItemsStateModel): boolean {
    return state.isGridLoading;
  }



  @Action(LoadItemsGrid)
  loadItemsGrid(ctx: StateContext<SettingsItemsStateModel>, {dto}: LoadItemsGrid) {
    ctx.patchState({
      grid: [],
      gridStatus: 'success',
      isGridLoading: true
    })

    this.settingsService.loadItemsGrid(dto)
      .subscribe({
        next(data) {

          ctx.patchState({
            grid: data,
            isGridLoading: false
          })
        },
        error() {
          ctx.patchState({
            gridStatus: 'error',
            isGridLoading: false
          })
        }
      })
  }

}