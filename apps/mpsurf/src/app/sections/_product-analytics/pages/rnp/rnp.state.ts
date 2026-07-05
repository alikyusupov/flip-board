import { inject, Injectable } from '@angular/core';
import { ApiRequestStateType } from '@models';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { PRODUCT_ANALYTICS_SERVICE_TOKEN } from '../../tokens';
import { LoadTableID_1, LoadTableID_2, LoadTableID_4 } from './rnp.actions';
import { IRnpTable } from './rnp.model';

export interface ProductAnalyticsRnpStateModel {
  isTable1Loading: boolean,
  isTable2Loading: boolean,
  isTable4Loading: boolean,

  table1Status: ApiRequestStateType,
  table2Status: ApiRequestStateType,
  table4Status: ApiRequestStateType,

  table1: IRnpTable | null,
  table2: IRnpTable | null,
  table4: IRnpTable | null,

}

@State<ProductAnalyticsRnpStateModel>({
  name: 'ProductAnalyticsRnpState',
  defaults: {
    isTable1Loading: false,
    isTable2Loading: false,
    isTable4Loading: false,

    table1Status: 'success',
    table2Status: 'success',
    table4Status: 'success',

    table1:  null,
    table2: null,
    table4: null,
  }
})
@Injectable()
export class ProductAnalyticsRnpState {

  private readonly productAnalyticsService = inject(PRODUCT_ANALYTICS_SERVICE_TOKEN);

  @Selector()
  static isTable1Loading(state: ProductAnalyticsRnpStateModel): boolean {
    return state.isTable1Loading
  }

  @Selector()
  static isTable2Loading(state: ProductAnalyticsRnpStateModel): boolean {
    return state.isTable2Loading
  }

  @Selector()
  static isTable4Loading(state: ProductAnalyticsRnpStateModel): boolean {
    return state.isTable4Loading
  }

  @Selector()
  static table1Status(state: ProductAnalyticsRnpStateModel): ApiRequestStateType {
    return state.table1Status
  }

  @Selector()
  static table2Status(state: ProductAnalyticsRnpStateModel): ApiRequestStateType {
    return state.table2Status
  }

  @Selector()
  static table4Status(state: ProductAnalyticsRnpStateModel): ApiRequestStateType {
    return state.table4Status
  }

  @Selector()
  static table1(state: ProductAnalyticsRnpStateModel): IRnpTable | null {
    return state.table1
  }

  @Selector()
  static table2(state: ProductAnalyticsRnpStateModel): IRnpTable | null {
    return state.table2
  }

  @Selector()
  static table4(state: ProductAnalyticsRnpStateModel): IRnpTable | null {
    return state.table4
  }



  @Action(LoadTableID_1)
  loadTable1(ctx: StateContext<ProductAnalyticsRnpStateModel>, {dto}: LoadTableID_1) {

    ctx.patchState({ table1: null, isTable1Loading: true, table1Status: 'success' });

    this.productAnalyticsService.loadRnpTable_1(dto)
      .subscribe({
        next(table) {
          ctx.patchState({ table1: table, isTable1Loading: false });
        },
        error() {
          ctx.patchState({ isTable1Loading: false, table1Status: 'error' });
        },
      })
  }

  @Action(LoadTableID_2)
  loadTable2(ctx: StateContext<ProductAnalyticsRnpStateModel>, {dto}: LoadTableID_2) {

    ctx.patchState({ table2: null, isTable2Loading: true, table2Status: 'success' });

    this.productAnalyticsService.loadRnpTable_2(dto)
      .subscribe({
        next(table) {
          ctx.patchState({ table2: table, isTable2Loading: false });
        },
        error() {
          ctx.patchState({ isTable2Loading: false, table2Status: 'error' });
        },
      })
  }

  @Action(LoadTableID_4)
  loadTable4(ctx: StateContext<ProductAnalyticsRnpStateModel>, {dto}: LoadTableID_4) {

    ctx.patchState({ table4: null, isTable4Loading: true, table4Status: 'success' });

    this.productAnalyticsService.loadRnpTable_4(dto)
      .subscribe({
        next(table) {
          ctx.patchState({ table4: table, isTable4Loading: false });
        },
        error() {
          ctx.patchState({ isTable4Loading: false, table4Status: 'error' });
        },
      })
  }

}