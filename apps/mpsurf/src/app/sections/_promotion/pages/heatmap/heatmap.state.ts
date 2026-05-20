import { inject } from "@angular/core";
import { ApiRequestStateType, IFilterOption } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { PROMOTION_SERVICE_TOKEN } from "../../tokens";
import { LoadHeatMapArticles, LoadHeatMapCategories, LoadHeatMapOrders, LoadHeatMapSales, LoadHeatMapSubjects } from "./heatmap.actions";
import { IHeatMapOrders, IHeatMapSales } from "./heatmap.model";

export interface PromotionHeatmapStateModel {

  categories: IFilterOption[];
  subjects: IFilterOption[];
  artilces: IFilterOption[];

  sales: IHeatMapSales | null;
  orders: IHeatMapOrders | null;

  isCategoriesListloading: boolean;
  isSubjectsListloading: boolean;
  isArtilcesListloading: boolean;

  isSalesLoading: boolean;
  isOrdersLoading: boolean;

  categoriesStatus: ApiRequestStateType;
  subjectsStatus: ApiRequestStateType;
  artilcesStatus: ApiRequestStateType;

  salesStatus: ApiRequestStateType;
  ordersStatus: ApiRequestStateType;
  
}

@State<PromotionHeatmapStateModel>({
  name: 'PromotionHeatmapState',
  defaults: {

    categories: [],
    subjects: [],
    artilces: [],

    sales: null,
    orders: null,

    isCategoriesListloading: false,
    isSubjectsListloading: false,
    isArtilcesListloading: false,

    isSalesLoading: false,
    isOrdersLoading: false,

    categoriesStatus: 'success',
    subjectsStatus: 'success',
    artilcesStatus: 'success',

    salesStatus: 'success',
    ordersStatus: 'success',
  }
})
export class PromotionHeatmapState {

  private readonly promotionService = inject(PROMOTION_SERVICE_TOKEN);


  @Selector()
  static categories(state: PromotionHeatmapStateModel): IFilterOption[] {
    return state.categories
  }

  @Selector()
  static subjects(state: PromotionHeatmapStateModel): IFilterOption[] {
    return state.subjects
  }

  @Selector()
  static articles(state: PromotionHeatmapStateModel): IFilterOption[] {
    return state.artilces
  }

  @Selector()
  static sales(state: PromotionHeatmapStateModel): IHeatMapSales | null {
    return state.sales
  }

  @Selector()
  static orders(state: PromotionHeatmapStateModel): IHeatMapOrders | null {
    return state.orders
  }

  @Selector()
  static isSalesLoading(state: PromotionHeatmapStateModel): boolean {
    return state.isSalesLoading
  }

  @Selector()
  static isOrdersLoading(state: PromotionHeatmapStateModel): boolean {
    return state.isOrdersLoading
  }

  @Action(LoadHeatMapCategories)
  loadHeatMapCategories(ctx: StateContext<PromotionHeatmapStateModel>, {dto}: LoadHeatMapCategories) {
    ctx.patchState({
      categories: [],
      categoriesStatus: 'success',
      isCategoriesListloading: true
    })

    this.promotionService.loadHeatMapCatgories(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            categories: data.map(d => ({value: d.name, label: d.name})),
            isCategoriesListloading: false
          })
        },
        error() {
          ctx.patchState({
            categoriesStatus: 'error',
            isCategoriesListloading: false
          })
        }
      })
  }

  @Action(LoadHeatMapSubjects)
  loadHeatMapSubjects(ctx: StateContext<PromotionHeatmapStateModel>, {dto}: LoadHeatMapSubjects) {
    ctx.patchState({
      subjects: [],
      subjectsStatus: 'success',
      isSubjectsListloading: true
    })

    this.promotionService.loadHeatMapSubjects(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            subjects: data.map(d => ({value: d.name, label: d.name})),
            isSubjectsListloading: false
          })
        },
        error() {
          ctx.patchState({
            subjectsStatus: 'error',
            isSubjectsListloading: false
          })
        }
      })
  }

  @Action(LoadHeatMapArticles)
  loadHeatMapArticles(ctx: StateContext<PromotionHeatmapStateModel>, {dto}: LoadHeatMapArticles) {
    ctx.patchState({
      artilces: [],
      artilcesStatus: 'success',
      isArtilcesListloading: true
    })

    this.promotionService.loadHeatMapArticles(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            artilces: data.map(d => ({value: d.name, label: d.name})),
            isArtilcesListloading: false
          })
        },
        error() {
          ctx.patchState({
            artilcesStatus: 'error',
            isArtilcesListloading: false
          })
        }
      })
  }

  @Action(LoadHeatMapOrders)
  loadHeatMapOrders(ctx: StateContext<PromotionHeatmapStateModel>, {dto}: LoadHeatMapOrders) {
    ctx.patchState({
      orders: null,
      ordersStatus: 'success',
      isOrdersLoading: true
    })

    this.promotionService.loadHeatMapOrders(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            orders: data,
            isOrdersLoading: false
          })
        },
        error() {
          ctx.patchState({
            ordersStatus: 'error',
            isOrdersLoading: false
          })
        }
      })
  }

  @Action(LoadHeatMapSales)
  loadHeatMapSales(ctx: StateContext<PromotionHeatmapStateModel>, {dto}: LoadHeatMapSales) {
    ctx.patchState({
      sales: null,
      salesStatus: 'success',
      isSalesLoading: true
    })

    this.promotionService.loadHeatMapSales(dto)
      .subscribe({
        next(data) {
          ctx.patchState({
            sales: data,
            isSalesLoading: false
          })
        },
        error() {
          ctx.patchState({
            salesStatus: 'error',
            isSalesLoading: false
          })
        }
      })
  }

}