import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType, IFilterOption, IShop } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetArticles, GetBrands, GetCategories, GetGoods, GetImtIds, GetShops, GetStatuses, GetSubjects, GetTags, Reset, SetSelectedShop } from "app/actions/main.actions";
import { MAIN_SERVICE_TOKEN } from "app/tokens";
import { filterOptionMapper } from "app/utils";



export interface MainStateModel {
  isShopListloading: boolean,
  isArticlesListLoading: boolean,
  isCategoriesListLoading: boolean,
  isStatusesListLoading: boolean,
  isBrandsListLoading: boolean,
  isTagsListLoading: boolean,
  isSubjectsListLoading: boolean,
  isWareHousesListLoading: boolean,
  isGoodsListLoading: boolean,
  isImtIdListLoading: boolean,

  shopListStatus: ApiRequestStateType,
  articlesListStatus: ApiRequestStateType,
  categoriesListStatus: ApiRequestStateType,
  statusesListStatus: ApiRequestStateType,
  brandsListStatus: ApiRequestStateType,
  tagsListStatus: ApiRequestStateType,
  subjectsListStatus: ApiRequestStateType,
  wareHousesListStatus: ApiRequestStateType,
  goodsListStatus: ApiRequestStateType,
  imdIdlistStatus: ApiRequestStateType,
  
  shops: IShop[],
  selectedShop: IShop | null,
  articles: IFilterOption[],
  categories: IFilterOption[],
  statuses: IFilterOption[],
  brands: IFilterOption[],
  tags: IFilterOption[],
  subjects: IFilterOption[],
  wareHouses: IFilterOption[],
  goods: IFilterOption[],
  imtIds: IFilterOption[]

}

const defaults: MainStateModel = {
  isShopListloading: false,
  isArticlesListLoading: false,
  isCategoriesListLoading: false,
  isStatusesListLoading: false,
  isBrandsListLoading: false,
  isTagsListLoading: false,
  isSubjectsListLoading: false,
  isWareHousesListLoading: false,
  isGoodsListLoading: false,
  isImtIdListLoading: false,

  shopListStatus: 'success',
  articlesListStatus: 'success',
  categoriesListStatus: 'success',
  statusesListStatus: 'success',
  brandsListStatus: 'success',
  tagsListStatus: 'success',
  subjectsListStatus: 'success',
  wareHousesListStatus: 'success',
  goodsListStatus: 'success',
  imdIdlistStatus: 'success',

  shops: sessionStorage.getItem('shopList') ? JSON.parse(sessionStorage.getItem('shopList') as string) : null,
  selectedShop: sessionStorage.getItem('shop') ? JSON.parse(sessionStorage.getItem('shop') as string) : null,
  articles: [],
  categories: [],
  statuses: [],
  brands: [],
  tags: [],
  subjects: [],
  wareHouses: [],
  goods: [],
  imtIds: []
}


@State<MainStateModel>({
  name: 'MainState',
  defaults
})
@Injectable()
export class MainState{

  private readonly mainService = inject(MAIN_SERVICE_TOKEN);

  @Selector()
  static isShopListloading(state: MainStateModel): boolean {
    return state.isShopListloading;
  }

  @Selector()
  static shopListStatus(state: MainStateModel): ApiRequestStateType {
    return state.shopListStatus
  }

  @Selector()
  static shops(state: MainStateModel): IShop[] {
    return state.shops
  }

  @Selector()
  static selectedShop(state: MainStateModel): IShop | null {
    return state.selectedShop
  }

  @Selector()
  static articles(state: MainStateModel): IFilterOption[] {
    return state.articles
  }

  @Selector()
  static goods(state: MainStateModel): IFilterOption[] {
    return state.goods
  }

  @Selector()
  static statuses(state: MainStateModel): IFilterOption[] {
    return state.statuses
  }

  @Selector()
  static tags(state: MainStateModel): IFilterOption[] {
    return state.tags
  }

  @Selector()
  static brands(state: MainStateModel): IFilterOption[] {
    return state.brands
  }

  @Selector()
  static categories(state: MainStateModel): IFilterOption[] {
    return state.categories
  }

  @Selector()
  static subjects(state: MainStateModel): IFilterOption[] {
    return state.subjects
  }

  @Selector()
  static imtIds(state: MainStateModel): IFilterOption[] {
    return state.imtIds
  }

  @Action(GetShops)
  loadShops(ctx: StateContext<MainStateModel>, { dto }: GetShops) {

    ctx.patchState({ 
      isShopListloading: true,
      shopListStatus: 'success',
      shops: [],
    });

    this.mainService.getShops(dto)
      .subscribe({
        next(shoplist) {
          ctx.patchState({ isShopListloading: false, shops: shoplist });
          sessionStorage.setItem('shopList', JSON.stringify(shoplist))
        },
        error() {
          ctx.patchState({ isShopListloading: false, shopListStatus: 'error',  });
        },
      })
  }

  @Action(GetArticles)
  getArticles(ctx: StateContext<MainStateModel>, { dto }: GetArticles) {

    ctx.patchState({ 
      isArticlesListLoading: true,
      articlesListStatus: 'success',
      articles: [],
    });

    this.mainService.getArticles(dto)
      .subscribe({
        next(articles) {
          ctx.patchState({ isArticlesListLoading: false, articles: articles.map(filterOptionMapper) });
        },
        error() {
          ctx.patchState({ isArticlesListLoading: false, articlesListStatus: 'error',  });
        },
      })
  }

  @Action(GetCategories)
  getCategories(ctx: StateContext<MainStateModel>, { dto }: GetCategories) {

    ctx.patchState({ 
      isCategoriesListLoading: true,
      categoriesListStatus: 'success',
      categories: [],
    });

    this.mainService.getCategories(dto)
      .subscribe({
        next(categories) {
          ctx.patchState({ isCategoriesListLoading: false, categories: categories.map(filterOptionMapper) });
        },
        error() {
          ctx.patchState({ isCategoriesListLoading: false, categoriesListStatus: 'error',  });
        },
      })
  }

  @Action(GetStatuses)
  getStatuses(ctx: StateContext<MainStateModel>, { dto }: GetStatuses) {

    ctx.patchState({ 
      isStatusesListLoading: true,
      statusesListStatus: 'success',
      statuses: [],
    });

    this.mainService.getStatuses(dto)
      .subscribe({
        next(statuses) {
          ctx.patchState({ isStatusesListLoading: false, statuses: statuses.map(filterOptionMapper) });
        },
        error() {
          ctx.patchState({ isStatusesListLoading: false, statusesListStatus: 'error',  });
        },
      })
  }

  @Action(GetGoods)
  getGoods(ctx: StateContext<MainStateModel>, { dto }: GetGoods) {

    ctx.patchState({ 
      isGoodsListLoading: true,
      goodsListStatus: 'success',
      goods: [],
    });

    this.mainService.getGoods(dto)
      .subscribe({
        next(goods) {
          ctx.patchState({ isGoodsListLoading: false, goods: goods.map(filterOptionMapper) });
        },
        error() {
          ctx.patchState({ isGoodsListLoading: false, goodsListStatus: 'error',  });
        },
      })
  }

  @Action(GetBrands)
  getBrands(ctx: StateContext<MainStateModel>, { dto }: GetBrands) {

    ctx.patchState({ 
      isBrandsListLoading: true,
      brandsListStatus: 'success',
      brands: [],
    });

    this.mainService.getBrands(dto)
      .subscribe({
        next(brands) {
          ctx.patchState({ isBrandsListLoading: false, brands: brands.map(filterOptionMapper) });
        },
        error() {
          ctx.patchState({ isBrandsListLoading: false, brandsListStatus: 'error',  });
        },
      })
  }

  @Action(GetTags)
  getTags(ctx: StateContext<MainStateModel>, { dto }: GetTags) {

    ctx.patchState({ 
      isTagsListLoading: true,
      tagsListStatus: 'success',
      tags: [],
    });

    this.mainService.getTags(dto)
      .subscribe({
        next(tags) {
          ctx.patchState({ isTagsListLoading: false, tags: tags.map(filterOptionMapper) });
        },
        error() {
          ctx.patchState({ isTagsListLoading: false, tagsListStatus: 'error',  });
        },
      })
  }

  @Action(GetSubjects)
  getSubjects(ctx: StateContext<MainStateModel>, { dto }: GetTags) {

    ctx.patchState({ 
      isSubjectsListLoading: true,
      subjectsListStatus: 'success',
      subjects: [],
    });

    this.mainService.getSubjects(dto)
      .subscribe({
        next(subjects) {
          ctx.patchState({ isSubjectsListLoading: false, subjects: subjects.map(filterOptionMapper) });
        },
        error() {
          ctx.patchState({ isSubjectsListLoading: false, subjectsListStatus: 'error',  });
        },
      })
  }

  @Action(GetImtIds)
  getImtIds(ctx: StateContext<MainStateModel>, { dto }: GetImtIds) {

    ctx.patchState({ 
      isImtIdListLoading: true,
      imdIdlistStatus: 'success',
      imtIds: [],
    });

    this.mainService.getImtIds(dto)
      .subscribe({
        next(imtIds) {
          ctx.patchState({ isImtIdListLoading: false, imtIds: imtIds.map(filterOptionMapper) });
        },
        error() {
          ctx.patchState({ isImtIdListLoading: false, imdIdlistStatus: 'error',  });
        },
      })
  }

  @Action(SetSelectedShop)
  setSelectedShop(ctx: StateContext<MainStateModel>, {shop}: SetSelectedShop) {

    sessionStorage.setItem('shop', JSON.stringify(shop))

    ctx.patchState({ 
      selectedShop: shop,
    });

  }

  @Action(Reset)
  reset(ctx: StateContext<MainStateModel>) {

    sessionStorage.removeItem('isAuthorized');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('shop');
    sessionStorage.removeItem('shopList');

    ctx.setState(defaults)

  }

}