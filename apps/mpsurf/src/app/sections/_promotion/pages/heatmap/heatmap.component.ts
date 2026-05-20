import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { API_PROD_OLD, API_TEST_OLD } from '@consts';
import { IFiltersBox } from '@models';
import { Store } from '@ngxs/store';
import { FiltersBoxComponent } from '@ui-kit/filters-box/filters-box.component';
import { FilterBuilderService } from 'app/services/filter-builder.service';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { MainState } from 'app/states/main.state';
import { getCurrencyIcon } from 'app/utils';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { environment } from 'environments/environment';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { combineLatest, map } from 'rxjs';

import { LoadHeatMapArticles, LoadHeatMapCategories, LoadHeatMapOrders, LoadHeatMapSales, LoadHeatMapSubjects } from './heatmap.actions';
import { GenerateOrdersAverageCheckByDayOfWeek, GenerateOrdersAverageReceiptByHours, GenerateOrdersByDayOfWeek, GenerateOrdersByDayOfWeekFromTo, GenerateOrdersByHoursFromTo, GenerateOrdersInRubblesByDay, GenerateSalesByDayFromTo, GenerateSalesByDayOfWeek, GenerateSalesByHoursFromTo } from './heatmap.chart';
import { HEATMAP_FILTERS } from './heatmap.filters';
import { HeatMapCharts } from './heatmap.model';
import { PromotionHeatmapState } from './heatmap.state';

@Component({
  selector: 'app-heatmap',
  imports: [FiltersBoxComponent, NzSkeletonModule, NgApexchartsModule, AsyncPipe],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.scss'
})
export class HeatmapComponent implements OnInit {

  private readonly HOST = environment.api === 'test' ? API_TEST_OLD : API_PROD_OLD;

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _filterBuilder = inject(FilterBuilderService);
  private readonly _dateRangeService = inject(GlobalDateRangeService);
  private readonly shopId = inject(Store).selectSnapshot(MainState.selectedShop)?.id;

  filterGroups: IFiltersBox[][] = [];

  categories$ = this._store.select(PromotionHeatmapState.categories).pipe(takeUntilDestroyed(this._destroyRef));
  subjects$ = this._store.select(PromotionHeatmapState.subjects).pipe(takeUntilDestroyed(this._destroyRef));
  artilces$ = this._store.select(PromotionHeatmapState.articles).pipe(takeUntilDestroyed(this._destroyRef));

  sales$ = this._store.select(PromotionHeatmapState.sales).pipe(takeUntilDestroyed(this._destroyRef));
  isSalesLoading$ = this._store.select(PromotionHeatmapState.isSalesLoading).pipe(takeUntilDestroyed(this._destroyRef));

  orders$ = this._store.select(PromotionHeatmapState.orders).pipe(takeUntilDestroyed(this._destroyRef));
  isOrdersLoading$ = this._store.select(PromotionHeatmapState.isOrdersLoading).pipe(takeUntilDestroyed(this._destroyRef));

  isChartsLoading$ = combineLatest([this.isOrdersLoading$, this.isSalesLoading$])
    .pipe(takeUntilDestroyed(this._destroyRef), map(([loadingOrders, loadingSales]) => {
      return loadingOrders && loadingSales;
    }))

  salesByDayOfTheWeek: Partial<HeatMapCharts> | null = null;
  salesByDayFromTo: Partial<HeatMapCharts> | null = null;
  salesByHoursFromTo: Partial<HeatMapCharts> | null = null;

  ordersByDayOfTheWeek: Partial<HeatMapCharts> | null = null;
  ordersByDayOfWeekFromTo: Partial<HeatMapCharts> | null = null;
  ordersByHoursFromTo: Partial<HeatMapCharts> | null = null;
  ordersAverageCheckByDayOfWeek: Partial<HeatMapCharts> | null = null;
  ordersInRubblesByDay: Partial<HeatMapCharts> | null = null;
  ordersAverageReceiptByHours: Partial<HeatMapCharts> | null = null;

  protected DEFAULT_PARAMS: Record<string, string[] | string | number | boolean | object> = {}

  ngOnInit(): void {

    this._dateRangeService.dateRange$.next([startOfMonth(new Date()), endOfMonth(new Date())]);
        
    this._dateRangeService.dateRange$.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(([date1, date2]) => {

        const [ startDate, endDate ] = [format(date1, 'yyyy-MM-dd'),  format(date2, 'yyyy-MM-dd')];

        if(!date1 || !date2) return;

        const params = {
          startDate,
          endDate,
          shop_id: this.shopId,
          ...this.DEFAULT_PARAMS
        }
  
        this._store.dispatch([
          new LoadHeatMapCategories({
            host: this.HOST,
            method: 'POST',
            endpoint: 'data',
            action:"getHeatmapListCat",
            params
          }),
          new LoadHeatMapSubjects({
            host: this.HOST,
            method: 'POST',
            endpoint: 'data',
            action:"getHeatmapListSubect",
            params
          }),
          new LoadHeatMapArticles({
            host: this.HOST,
            method: 'POST',
            endpoint: 'data',
            action:"getHeatmapListSku",
            params
          }),
          new LoadHeatMapSales({
            host: this.HOST,
            method: 'POST',
            endpoint: 'data',
            action:"getHeatmapSales",
            params
          }),
          new LoadHeatMapOrders({
            host: this.HOST,
            method: 'POST',
            endpoint: 'data',
            action:"getHeatmapOrders",
            params
          }),
        ])
        
      })

    combineLatest([this.categories$, this.subjects$, this.artilces$])
      .subscribe(() => this.filterGroups = this._filterBuilder.build(HEATMAP_FILTERS))

    combineLatest([this.sales$, this.orders$])
      .subscribe(([sales, orders]) => {
        if(sales && orders){

          this.salesByDayOfTheWeek = GenerateSalesByDayOfWeek(sales);
          this.salesByDayFromTo = GenerateSalesByDayFromTo(sales);
          this.salesByHoursFromTo = GenerateSalesByHoursFromTo(sales);

          this.ordersByDayOfTheWeek = GenerateOrdersByDayOfWeek(orders);
          this.ordersByDayOfWeekFromTo = GenerateOrdersByDayOfWeekFromTo(orders);
          this.ordersByHoursFromTo = GenerateOrdersByHoursFromTo(orders);
          this.ordersAverageCheckByDayOfWeek = GenerateOrdersAverageCheckByDayOfWeek(orders);
          this.ordersInRubblesByDay = GenerateOrdersInRubblesByDay(orders, getCurrencyIcon());
          this.ordersAverageReceiptByHours = GenerateOrdersAverageReceiptByHours(orders);
        }
      })

  }

  onFilterChangeEvent(event: Record<string, string[] | string | number | boolean| object>): void {
      const [ beginDate, endDate ] = [format(this._dateRangeService.dateRange$.value[0], 'yyyy-MM-dd'),  format(this._dateRangeService.dateRange$.value[1], 'yyyy-MM-dd')]
      
      this.DEFAULT_PARAMS = { beginDate, endDate };

      this.DEFAULT_PARAMS['shop_id'] = this.shopId as number;


      if(event['heatmapCategories']){
        this.DEFAULT_PARAMS['cat'] = { name: event['heatmapCategories'] } 
      }

      if(event['heatmapSubjects']){
        this.DEFAULT_PARAMS['sub'] = { name: event['heatmapSubjects'] } 
      }

      if(event['heatmapArticles']){
        this.DEFAULT_PARAMS['sku'] = { name: event['heatmapArticles'] } 
      }
      
      this._store.dispatch([
          new LoadHeatMapCategories({
            host: this.HOST,
            method: 'POST',
            endpoint: 'data',
            action:"getHeatmapListCat",
            params: this.DEFAULT_PARAMS
          }),
          new LoadHeatMapSubjects({
            host: this.HOST,
            method: 'POST',
            endpoint: 'data',
            action:"getHeatmapListSubect",
            params: this.DEFAULT_PARAMS
          }),
          new LoadHeatMapArticles({
            host: this.HOST,
            method: 'POST',
            endpoint: 'data',
            action:"getHeatmapListSku",
            params: this.DEFAULT_PARAMS
          }),
          new LoadHeatMapSales({
            host: this.HOST,
            method: 'POST',
            endpoint: 'data',
            action:"getHeatmapSales",
            params: {...this.DEFAULT_PARAMS, startDate: beginDate}
          }),
          new LoadHeatMapOrders({
            host: this.HOST,
            method: 'POST',
            endpoint: 'data',
            action:"getHeatmapOrders",
            params: {...this.DEFAULT_PARAMS, startDate: beginDate}
          }),
        ])
    }

}
