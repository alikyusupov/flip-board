import { inject, Injectable } from '@angular/core';
import { ApiRequestStateType, IFilterOption } from '@models';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { filterOptionMapper } from 'app/utils';

import { PRODUCT_ANALYTICS_SERVICE_TOKEN } from '../../tokens';
import { GetSalesCategories, GetSalesNmids, GetSalesSubjects, GetSalesWareHouses, LoadChart, LoadTable } from './sales.actions';
import { ISalesChart, ISalesTable } from './sales.model';

export interface ProductAnalyticsSalesStateModel {
  isTableLoading: boolean,
  tableStatus: ApiRequestStateType,
  table: ISalesTable | null,

  isChartLoading: boolean,
  chartStatus: ApiRequestStateType,
  chart: ISalesChart | null,

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

@State<ProductAnalyticsSalesStateModel>({
  name: 'ProductAnalyticsSalesState',
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
export class ProductAnalyticsSalesState {

  private readonly productAnalyticsService = inject(PRODUCT_ANALYTICS_SERVICE_TOKEN);

  @Selector()
  static isTableLoading(state: ProductAnalyticsSalesStateModel): boolean {
    return state.isTableLoading
  }

  @Selector()
  static tableStatus(state: ProductAnalyticsSalesStateModel): ApiRequestStateType {
    return state.tableStatus
  }

  @Selector()
  static chart(state: ProductAnalyticsSalesStateModel): ISalesChart | null {
    return state.chart
  }

  @Selector()
  static isChartLoading(state: ProductAnalyticsSalesStateModel): boolean {
    return state.isChartLoading
  }

  @Selector()
  static chartStatus(state: ProductAnalyticsSalesStateModel): ApiRequestStateType {
    return state.chartStatus
  }

  @Selector()
  static table(state: ProductAnalyticsSalesStateModel): ISalesTable | null {
    return state.table
  }

  @Selector()
  static goods(state: ProductAnalyticsSalesStateModel): IFilterOption[] {
    return state.goods
  }

  @Selector()
  static categories(state: ProductAnalyticsSalesStateModel): IFilterOption[] {
    return state.categories
  }

  @Selector()
  static wareHouses(state: ProductAnalyticsSalesStateModel): IFilterOption[] {
    return state.wareHouses
  }

  @Selector()
  static subjects(state: ProductAnalyticsSalesStateModel): IFilterOption[] {
    return state.subjects
  }

  @Action(LoadTable)
  loadTable1(ctx: StateContext<ProductAnalyticsSalesStateModel>, {dto}: LoadTable) {

    ctx.patchState({ table: null, isTableLoading: true, tableStatus: 'success' });

    this.productAnalyticsService.loadSalesTable(dto)
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
  loadChart(ctx: StateContext<ProductAnalyticsSalesStateModel>, {dto}: LoadChart) {

    ctx.patchState({ chart: null, isChartLoading: true, chartStatus: 'success' });

    this.productAnalyticsService.loadSalesChart(dto)
      .subscribe({
        next(chart) {
          ctx.patchState({ chart: chart, isChartLoading: false });
        },
        error() {
          ctx.patchState({ isChartLoading: false, chartStatus: 'error' });
        },
      })
  }

  @Action(GetSalesNmids)
    getSalesNmids(ctx: StateContext<ProductAnalyticsSalesStateModel>, { dto }: GetSalesNmids) {
  
      ctx.patchState({ goods: [], isGoodsLoading: true, goodsStatus: 'success' });
  
      this.productAnalyticsService.getSalesGoods(dto)
        .subscribe({
          next(res) {
            ctx.patchState({ goods: res?.data.map(filterOptionMapper) || [], isGoodsLoading: false });
          },
          error() {
            ctx.patchState({ isGoodsLoading: false, goodsStatus: 'error' });
          },
        })
    }
  
    @Action(GetSalesCategories)
    getSalesCategories(ctx: StateContext<ProductAnalyticsSalesStateModel>, { dto }: GetSalesCategories) {
  
      ctx.patchState({ categories: [], isCategoriesLoading: true, categoriesStatus: 'success' });
  
      this.productAnalyticsService.getSalesCategories(dto)
        .subscribe({
          next(res) {
            ctx.patchState({ categories: res?.data.map(filterOptionMapper) || [], isCategoriesLoading: false });
          },
          error() {
            ctx.patchState({ isCategoriesLoading: false, categoriesStatus: 'error' });
          },
        })
    }
  
    @Action(GetSalesWareHouses)
    getSalesWareHouses(ctx: StateContext<ProductAnalyticsSalesStateModel>, { dto }: GetSalesWareHouses) {
  
      ctx.patchState({ wareHouses: [], isWareHousesLoading: true, warehousesStatus: 'success' });
  
      this.productAnalyticsService.getSalesWareHouses(dto)
        .subscribe({
          next(res) {
            ctx.patchState({ wareHouses: res?.data.map(filterOptionMapper) || [], isWareHousesLoading: false });
          },
          error() {
            ctx.patchState({ isWareHousesLoading: false, warehousesStatus: 'error' });
          },
        })
    }
  
    @Action(GetSalesSubjects)
    getSalesSubjects(ctx: StateContext<ProductAnalyticsSalesStateModel>, { dto }: GetSalesSubjects) {
  
      ctx.patchState({ subjects: [], isSubjectsLoading: true, subjectsStatus: 'success' });
  
      this.productAnalyticsService.getSalesSubjects(dto)
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