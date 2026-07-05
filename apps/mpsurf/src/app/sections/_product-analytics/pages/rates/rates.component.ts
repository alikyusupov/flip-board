import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { IFiltersBox, Marketplace } from '@models';
import { Store } from '@ngxs/store';
import { FiltersBoxComponent } from '@ui-kit/filters-box/filters-box.component';
import { RateCardComponent } from '@ui-kit/rate-card/rate-card.component';
import { AgGridAngular } from 'ag-grid-angular';
import { type ColDef,themeAlpine } from 'ag-grid-community'
import { FilterBuilderService } from 'app/services/filter-builder.service';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { ThemeService } from 'app/services/theme.service';
import { MainState } from 'app/states/main.state';
import { MARKETPLACE } from 'app/tokens';
import { DateSortFuncDesc } from 'app/utils';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import {
  NgApexchartsModule
} from "ng-apexcharts";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMenuThemeType } from 'ng-zorro-antd/menu';
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { combineLatest } from 'rxjs';

import { IRatesGridData, IRatesGridDay, IRatesGridSku, IRatesGridTotal } from '../../models';
import { LoadCards, LoadTableAndChart } from './rates.actions';
import { getChartOptions } from './rates.chart';
import { WB_MAIN_TAB_COLUMN_DEFS_BY_DATE, WB_MAIN_TAB_COLUMN_DEFS_BY_PRODUCT } from './rates.definition';
import { RATES_FILTERS, RATES_FILTERS_OZON } from './rates.filters';
import { ChartOptions, TableGroupBy } from './rates.model';
import { ProductAnalyticsRatesState } from './rates.state';

@Component({
  selector: 'app-rates',
  imports: [
    NzSelectModule,
    FormsModule,
    AgGridAngular,
    NzRadioModule,
    AsyncPipe,
    NzSkeletonModule,
    NzButtonModule,
    NzIconModule,
    NgApexchartsModule,
    FiltersBoxComponent,
    RateCardComponent,
    RouterLink
],
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.scss'
})
export class RatesComponent implements OnInit {

  private readonly _store = inject(Store);
  private readonly _theme = inject(ThemeService).theme$;
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _filterBuilder = inject(FilterBuilderService);
  private readonly _dateRangeService = inject(GlobalDateRangeService);

  protected marketplace = inject(MARKETPLACE);
  

  public rowData = signal<IRatesGridData | null>(null);
  public chart = signal<ChartOptions>(getChartOptions({days: [], skus: [],total: {}} as unknown as IRatesGridData));


  columnDefsByDate: ColDef[]  = WB_MAIN_TAB_COLUMN_DEFS_BY_DATE;
  columnDefsProduct: ColDef[] = WB_MAIN_TAB_COLUMN_DEFS_BY_PRODUCT;

  radioValue = TableGroupBy.BY_DATE;

  cards$ = this._store.select(ProductAnalyticsRatesState.cards);
  rowData$ = this._store.select(ProductAnalyticsRatesState.rowData);
  isCardsLoading$ = this._store.select(ProductAnalyticsRatesState.isCardsLoading);
  isRowDataLoading$ = this._store.select(ProductAnalyticsRatesState.isRowDataLoading);

  skeletons = Array.from({length: 10});

  theme = themeAlpine
  .withParams(
      {
        backgroundColor: "#030617",
        foregroundColor: "#FFFFFFCC",
        browserColorScheme: "dark",
      },
      "dark",
  );

  filterGroups: IFiltersBox[][] = [];
  
  TableGroupBy = TableGroupBy;
  tableDataByDate: IRatesGridDay[] = [];
  tableDataByProduct: IRatesGridSku[] = [];
  footerDataForDate: (IRatesGridTotal & { date: string })[] = [];
  footerDataForProduct: (IRatesGridTotal & { photo_new: string })[] = [];

  protected DEFAULT_PARAMS: Record<string, string[] | string | number | boolean> = {
    articles:[],
    categoryPnl:[],
    myStatus:[],
    brands:[],
    tags:[]
  }

  ngOnInit(): void {

    this._dateRangeService.dateRange$.next([startOfMonth(new Date()), endOfMonth(new Date())])

    this._dateRangeService.dateRange$.pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe(([date1, date2]) => {
      const [ startDate, endDate ] = [format(date1, 'yyyy-MM-dd'),  format(date2, 'yyyy-MM-dd')];

      if(!date1 || !date2) return;

      this._store.dispatch([
        new LoadCards({
          method: 'POST',
          endpoint: 'indicators/cards-v2',
          params: {
            startDate, 
            endDate,
            ...this.DEFAULT_PARAMS,
          }
        }), 
        new LoadTableAndChart({
          method: 'POST',
          endpoint: 'indicators/chart-grid-v2',
           params: {
            startDate, 
            endDate,
            ...this.DEFAULT_PARAMS,
          }
        }),
      ]);

    })
    

    this._theme.subscribe(theme => this.setTheme(theme));

    this.rowData$.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(rowData => {
          this.rowData.set(rowData);
          if(rowData) {
            this.chart.set(getChartOptions(rowData));

            this.tableDataByDate = rowData.days.sort((a, b) => DateSortFuncDesc(a as {date: string}, b as {date: string}));

            this.tableDataByProduct = rowData.skus;

            this.footerDataForDate = [{...rowData.total, date: 'Итого'}];

            this.footerDataForProduct = [{...rowData.total, photo_new: 'Итого'}];
          }
      })

    const filters$ = this.marketplace() === Marketplace.OZON
    ? [
        this._store.select(MainState.goods),
        this._store.select(MainState.categories),
        this._store.select(MainState.statuses),
        this._store.select(MainState.brands),
      ]
    : [
        this._store.select(MainState.goods),
        this._store.select(MainState.categories),
        this._store.select(MainState.statuses),
        this._store.select(MainState.brands),
        this._store.select(MainState.tags),
      ]

    const FILTERS = this.marketplace() === Marketplace.OZON ? RATES_FILTERS_OZON: RATES_FILTERS;

    combineLatest(filters$)
    .subscribe(() => this.filterGroups = this._filterBuilder.build(FILTERS))
  }


  setTheme(mode: NzMenuThemeType) {
    document.body.dataset['agThemeMode'] = mode;
  }

   onFilterChangeEvent(event: Record<string, string[] | string | number | boolean>): void {
  
      const [ startDate, endDate ] = [format(this._dateRangeService.dateRange$.value[0], 'yyyy-MM-dd'),  format(this._dateRangeService.dateRange$.value[1], 'yyyy-MM-dd')];

      this.DEFAULT_PARAMS = event;
  
      this._store.dispatch([
        new LoadCards({
          method: 'POST',
          endpoint: 'indicators/cards-v2',
          params: {
            startDate, 
            endDate,
            ...this.DEFAULT_PARAMS
          }
        }), 
        new LoadTableAndChart({
          method: 'POST',
          endpoint: 'indicators/chart-grid-v2',
           params: {
            startDate, 
            endDate,
            ...this.DEFAULT_PARAMS
          }
        }),
      ]);
  
    }

  onTableGroupingTypeChange($event: unknown) {
    console.log($event)
  }

}
