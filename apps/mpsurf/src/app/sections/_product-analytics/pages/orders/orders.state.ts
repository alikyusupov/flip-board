import { inject, Injectable } from '@angular/core';
import { ApiRequestStateType, IFilterOption } from '@models';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { filterOptionMapper } from 'app/utils';

import { PRODUCT_ANALYTICS_SERVICE_TOKEN } from '../../tokens';
import { GetOrdersCategories, GetOrdersNmids, GetOrdersSubjects, GetOrdersWareHouses, LoadChart, LoadTable } from './orders.actions';
import { IOrdersChart, IOrdersTable } from './orders.model';

export interface ProductAnalyticsOrdersStateModel {
  isTableLoading: boolean,
  tableStatus: ApiRequestStateType,
  table: IOrdersTable | null,

  isChartLoading: boolean,
  chartStatus: ApiRequestStateType,
  chart: IOrdersChart | null,

  isGoodsLoading: boolean,
  goodsStatus: ApiRequestStateType,
  goods: IFilterOption[],

  isCategoriesLoading: boolean,
  categoriesStatus: ApiRequestStateType,
  categories: IFilterOption[],

  isWareHousesLoading: boolean,
  warehousesStatus: ApiRequestStateType,
  wareHouses: IFilterOption[],

  isSubjectsLoading: boolean,
  subjectsStatus: ApiRequestStateType,
  subjects: IFilterOption[],

}

@State<ProductAnalyticsOrdersStateModel>({
  name: 'ProductAnalyticsOrdersState',
  defaults: {
    isTableLoading: false,
    tableStatus: 'success',
    table:  null,

    isChartLoading: false,
    chartStatus: 'success',
    chart:  null,

    isGoodsLoading: false,
    goodsStatus: 'success',
    goods: [],

    isCategoriesLoading: false,
    categoriesStatus: 'success',
    categories: [],

    isWareHousesLoading: false,
    warehousesStatus: 'success',
    wareHouses: [],

    isSubjectsLoading: false,
    subjectsStatus: 'success',
    subjects: [],
  }
})
@Injectable()
export class ProductAnalyticsOrdersState {

  private readonly productAnalyticsService = inject(PRODUCT_ANALYTICS_SERVICE_TOKEN);

  @Selector()
  static isTableLoading(state: ProductAnalyticsOrdersStateModel): boolean {
    return state.isTableLoading
  }

  @Selector()
  static tableStatus(state: ProductAnalyticsOrdersStateModel): ApiRequestStateType {
    return state.tableStatus
  }

  @Selector()
  static chart(state: ProductAnalyticsOrdersStateModel): IOrdersChart | null {
    return state.chart
  }

  @Selector()
  static isChartLoading(state: ProductAnalyticsOrdersStateModel): boolean {
    return state.isChartLoading
  }

  @Selector()
  static chartStatus(state: ProductAnalyticsOrdersStateModel): ApiRequestStateType {
    return state.chartStatus
  }

  @Selector()
  static table(state: ProductAnalyticsOrdersStateModel): IOrdersTable | null {
    return state.table
  }

  @Selector()
  static goods(state: ProductAnalyticsOrdersStateModel): IFilterOption[] {
    return state.goods
  }

  @Selector()
  static categories(state: ProductAnalyticsOrdersStateModel): IFilterOption[] {
    return state.categories
  }

  @Selector()
  static wareHouses(state: ProductAnalyticsOrdersStateModel): IFilterOption[] {
    return state.wareHouses
  }

  @Selector()
  static subjects(state: ProductAnalyticsOrdersStateModel): IFilterOption[] {
    return state.subjects
  }

  @Action(LoadTable)
  loadTable1(ctx: StateContext<ProductAnalyticsOrdersStateModel>, {dto}: LoadTable) {

    ctx.patchState({ table: null, isTableLoading: true, tableStatus: 'success' });

    this.productAnalyticsService.loadOrdersTable(dto)
      .subscribe({
        next(table) {
          ctx.patchState({ table: table, isTableLoading: false });
        },
        error() {
          ctx.patchState({ isTableLoading: false, tableStatus: 'error' });
        },
      })
  }

  @Action(LoadChart)
  loadChart(ctx: StateContext<ProductAnalyticsOrdersStateModel>, {dto}: LoadChart) {

    ctx.patchState({ chart: null, isChartLoading: true, chartStatus: 'success' });

    this.productAnalyticsService.loadOrdersChart(dto)
      .subscribe({
        next(chart) {
          ctx.patchState({ chart: chart, isChartLoading: false });
        },
        error() {
          ctx.patchState({ isChartLoading: false, chartStatus: 'error' });
        },
      })
  }

  @Action(GetOrdersNmids)
  getOrdersNmids(ctx: StateContext<ProductAnalyticsOrdersStateModel>, { dto }: GetOrdersNmids) {

    ctx.patchState({ goods: [], isGoodsLoading: true, goodsStatus: 'success' });

    this.productAnalyticsService.getOrdersGoods(dto)
      .subscribe({
        next(res) {
          ctx.patchState({ goods: res?.data.map(filterOptionMapper) || [], isGoodsLoading: false });
        },
        error() {
          ctx.patchState({ isGoodsLoading: false, goodsStatus: 'error' });
        },
      })
  }

  @Action(GetOrdersCategories)
  getOrdersCategories(ctx: StateContext<ProductAnalyticsOrdersStateModel>, { dto }: GetOrdersCategories) {

    ctx.patchState({ categories: [], isCategoriesLoading: true, categoriesStatus: 'success' });

    this.productAnalyticsService.getOrdersCategories(dto)
      .subscribe({
        next(res) {
          ctx.patchState({ categories: res?.data.map(filterOptionMapper) || [], isCategoriesLoading: false });
        },
        error() {
          ctx.patchState({ isCategoriesLoading: false, categoriesStatus: 'error' });
        },
      })
  }

  @Action(GetOrdersWareHouses)
  getOrdersWareHouses(ctx: StateContext<ProductAnalyticsOrdersStateModel>, { dto }: GetOrdersWareHouses) {

    ctx.patchState({ wareHouses: [], isWareHousesLoading: true, warehousesStatus: 'success' });

    this.productAnalyticsService.getOrdersWareHouses(dto)
      .subscribe({
        next(res) {
          ctx.patchState({ wareHouses: res?.data.map(filterOptionMapper) || [], isWareHousesLoading: false });
        },
        error() {
          ctx.patchState({ isWareHousesLoading: false, warehousesStatus: 'error' });
        },
      })
  }

  @Action(GetOrdersSubjects)
  getOrdersSubjects(ctx: StateContext<ProductAnalyticsOrdersStateModel>, { dto }: GetOrdersSubjects) {

    ctx.patchState({ subjects: [], isSubjectsLoading: true, subjectsStatus: 'success' });

    this.productAnalyticsService.getOrdersCategories(dto)
      .subscribe({
        next(res) {
          ctx.patchState({ subjects: res?.data.map(filterOptionMapper) || [], isSubjectsLoading: false });
        },
        error() {
          ctx.patchState({ isSubjectsLoading: false, subjectsStatus: 'error' });
        },
      })
  }

}