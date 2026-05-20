import { inject, Injectable } from '@angular/core';
import { IFiltersBox } from '@models';
import { Store } from '@ngxs/store';
import { PlanningRemainsState } from 'app/sections/_planning/pages/remains/remains.state';
import { ProductAnalyticsOrdersState } from 'app/sections/_product-analytics/pages/orders/orders.state';
import { ProductAnalyticsSalesState } from 'app/sections/_product-analytics/pages/sales/sales.state';
import { PromotionHeatmapState } from 'app/sections/_promotion/pages/heatmap/heatmap.state';
import { MainState } from 'app/states/main.state';

@Injectable({
  providedIn: 'root'
})
export class FilterBuilderService {

  private readonly _store = inject(Store);

  build(datasets: IFiltersBox[][]): IFiltersBox[][] {
    const result =  datasets.map(dataset => dataset.map(config => {
      if(config.id === 'articles') {
        return {...config, options: this._store.selectSnapshot(MainState.goods)}
      }
      else if(config.id === 'categoryPnl') {
        return {...config, options: this._store.selectSnapshot(MainState.categories)}
      }
      else if(config.id === 'myStatus') {
        return {...config, options: this._store.selectSnapshot(MainState.statuses)}
      }
      else if(config.id === 'brands') {
        return {...config, options: this._store.selectSnapshot(MainState.brands)}
      }
      else if(config.id === 'tags') {
        return {...config, options: this._store.selectSnapshot(MainState.tags)}
      }
      else if(config.id === 'subjects') {
        return {...config, options: this._store.selectSnapshot(MainState.subjects)}
      }
      else if(config.id === 'imtIds') {
        return {...config, options: this._store.selectSnapshot(MainState.imtIds)}
      }
      else if(config.id === 'ordersGoods') {
        return {...config, options: this._store.selectSnapshot(ProductAnalyticsOrdersState.goods)}
      }
      else if(config.id === 'ordersSubjects') {
        return {...config, options: this._store.selectSnapshot(ProductAnalyticsOrdersState.subjects)}
      }
      else if(config.id === 'ordersWarehouses') {
        return {...config, options: this._store.selectSnapshot(ProductAnalyticsOrdersState.wareHouses)}
      }
      else if(config.id === 'ordersCategories') {
        return {...config, options: this._store.selectSnapshot(ProductAnalyticsOrdersState.categories)}
      }
      else if(config.id === 'salesGoods') {
        return {...config, options: this._store.selectSnapshot(ProductAnalyticsSalesState.goods)}
      }
      else if(config.id === 'salesSubjects') {
        return {...config, options: this._store.selectSnapshot(ProductAnalyticsSalesState.subjects)}
      }
      else if(config.id === 'salesWarehouses') {
        return {...config, options: this._store.selectSnapshot(ProductAnalyticsSalesState.wareHouses)}
      }
      else if(config.id === 'salesCategories') {
        return {...config, options: this._store.selectSnapshot(ProductAnalyticsSalesState.categories)}
      }
      else if(config.id === 'heatmapSubjects') {
        return {...config, options: this._store.selectSnapshot(PromotionHeatmapState.subjects)}
      }
      else if(config.id === 'heatmapArticles') {
        return {...config, options: this._store.selectSnapshot(PromotionHeatmapState.articles)}
      }
      else if(config.id === 'heatmapCategories') {
        return {...config, options: this._store.selectSnapshot(PromotionHeatmapState.categories)}
      }
      else if(config.id === 'remainsWarehouses') {
        return {...config, options: this._store.selectSnapshot(PlanningRemainsState.warehouses)}
      }
      return config
    }))
    return result;
  }

 
}