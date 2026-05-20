import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { FINANCES_SERVICE_TOKEN } from "../../tokens";
import { LoadOperations } from "./operations.actions";
import { IFinOperation } from "./operations.model";

export interface FinancesOperationStateModel {
  isOperationsListLoading: boolean,

  operationsListStatus: ApiRequestStateType,

  operationsList: IFinOperation[],
}

@State<FinancesOperationStateModel>({
  name: 'FinancesOperationsState',
  defaults: {

    isOperationsListLoading: false,

    operationsListStatus: 'success',

    operationsList: [],
  }
})
@Injectable()
export class FinancesOperationsState {

  private readonly financesService = inject(FINANCES_SERVICE_TOKEN);

  @Selector()
  static operationsList(state: FinancesOperationStateModel): IFinOperation[] {
    return state.operationsList
  }

  @Selector()
  static isOperationsListLoading(state: FinancesOperationStateModel): boolean {
    return state.isOperationsListLoading;
  }

  @Selector()
  static operationsListStatus(state: FinancesOperationStateModel): ApiRequestStateType {
    return state.operationsListStatus;
  }

  @Action(LoadOperations)
  loadOperations(ctx: StateContext<FinancesOperationStateModel>, {dto}: LoadOperations) {
    ctx.patchState({
      operationsList: [],
      operationsListStatus: 'success',
      isOperationsListLoading: true
    })

    this.financesService.loadOperations(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            operationsList: data,
            isOperationsListLoading: false
          })
        },
        error() {
          ctx.patchState({
            operationsListStatus: 'error',
            isOperationsListLoading: false
          })
        }
      })
  }
}