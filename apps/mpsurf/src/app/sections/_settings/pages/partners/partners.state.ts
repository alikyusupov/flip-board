import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { SETTINGS_SERVICE_TOKEN } from "../../tokens";
import { LoadPartners } from "./partners.actions";
import { IFinPartner } from "./partners.model";

export interface SettingsPartnersStateModel {

  isGridLoading: boolean,

  gridStatus: ApiRequestStateType,

  grid: IFinPartner[],
}

@State<SettingsPartnersStateModel>({
  name: 'SettingsPartnersState',
  defaults: {

    isGridLoading: false,

    gridStatus: 'success',

    grid: [],
  }
})
@Injectable()
export class SettingsPartnersState {

  private readonly settingsService = inject(SETTINGS_SERVICE_TOKEN);


  @Selector()
  static grid(state: SettingsPartnersStateModel): IFinPartner[] {
    return state.grid
  }

  @Selector()
  static isGridLoading(state: SettingsPartnersStateModel): boolean {
    return state.isGridLoading;
  }



  @Action(LoadPartners)
  loadPartners(ctx: StateContext<SettingsPartnersStateModel>, {dto}: LoadPartners) {
    ctx.patchState({
      grid: [],
      gridStatus: 'success',
      isGridLoading: true
    })

    this.settingsService.loadPartners(dto)
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