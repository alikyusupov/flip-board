import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { FINANCES_SERVICE_TOKEN } from "../../tokens";
import { LoadAccounts, LoadDdsGrid, LoadPartners } from "./dds.actions";
import { IDDSAccount, IDDSGridData, IDDSPartner } from "./dds.model";

export interface FinancesDdsStateModel {
  isDdsGridLoading: boolean,
  isAccountListLoading: boolean,
  isPartnersListLoading: boolean,

  gridStatus: ApiRequestStateType,
  accountListStatus: ApiRequestStateType,
  partnerListStatus: ApiRequestStateType,

  grid: IDDSGridData | null,
  accountList: IDDSAccount[],
  partnerList: IDDSPartner[],
}

@State<FinancesDdsStateModel>({
  name: 'FinancesDdsState',
  defaults: {

    isDdsGridLoading: false,
    isAccountListLoading: false,
    isPartnersListLoading: false,

    gridStatus: 'success',
    accountListStatus: 'success',
    partnerListStatus: 'success',

    grid: null,
    accountList: [],
    partnerList: [],
  }
})
@Injectable()
export class FinancesDdsState {

  private readonly financesService = inject(FINANCES_SERVICE_TOKEN);

  @Selector()
  static grid(state: FinancesDdsStateModel): IDDSGridData | null {
    return state.grid
  }

  @Selector()
  static isDdsGridLoading(state: FinancesDdsStateModel): boolean {
    return state.isDdsGridLoading;
  }

  @Selector()
  static gridStatus(state: FinancesDdsStateModel): ApiRequestStateType {
    return state.gridStatus;
  }

  @Action(LoadDdsGrid)
  loadGrid(ctx: StateContext<FinancesDdsStateModel>, {dto}: LoadDdsGrid) {
    ctx.patchState({
      grid: null,
      gridStatus: 'success',
      isDdsGridLoading: true
    })

    this.financesService.loadDDSGrid(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            grid: data,
            isDdsGridLoading: false
          })
        },
        error() {
          ctx.patchState({
            gridStatus: 'error',
            isDdsGridLoading: false
          })
        }
      })
  }

  @Action(LoadPartners)
  loadPartners(ctx: StateContext<FinancesDdsStateModel>, {dto}: LoadPartners) {
    ctx.patchState({
      partnerList: [],
      partnerListStatus: 'success',
      isPartnersListLoading: true
    })

    this.financesService.loadDDSPartners(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            partnerList: data,
            isPartnersListLoading: false
          })
        },
        error() {
          ctx.patchState({
            partnerListStatus: 'error',
            isPartnersListLoading: false
          })
        }
      })
  }

  @Action(LoadAccounts)
  loadAccounts(ctx: StateContext<FinancesDdsStateModel>, {dto}: LoadAccounts) {
    ctx.patchState({
      accountList: [],
      accountListStatus: 'success',
      isAccountListLoading: true
    })

    this.financesService.loadDDSAccounts(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            accountList: data,
            isAccountListLoading: false
          })
        },
        error() {
          ctx.patchState({
            accountListStatus: 'error',
            isAccountListLoading: false
          })
        }
      })
  }

}