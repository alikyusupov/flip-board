import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IFiltersBox } from '@models';
import { Store } from '@ngxs/store';
import { FiltersBoxComponent } from '@ui-kit/filters-box/filters-box.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, themeAlpine } from 'ag-grid-community';
import { FilterBuilderService } from 'app/services/filter-builder.service';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { MainState } from 'app/states/main.state';
import { getCurrencyIcon } from 'app/utils';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { LoadStatsChart, LoadStatsTable } from './stats.actions';
import { getChartOptions } from './stats.chart';
import { genarateColumnDefs, generateSummary } from './stats.definition';
import { STATS_FILTERS } from './stats.filters';
import { IStatsListItem } from './stats.model';
import { PromotionStatsState } from './stats.state';


@Component({
  selector: 'app-stats',
  imports: [FiltersBoxComponent, AgGridAngular, AsyncPipe, NzSkeletonModule, NgApexchartsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit{

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _filterBuilder = inject(FilterBuilderService);
  private readonly _dateRangeService = inject(GlobalDateRangeService);

  chart$ = this._store.select(PromotionStatsState.chart).pipe(takeUntilDestroyed(this._destroyRef));
  table$ = this._store.select(PromotionStatsState.table).pipe(takeUntilDestroyed(this._destroyRef));

  isChartLoading$ = this._store.select(PromotionStatsState.isChartLoading).pipe(takeUntilDestroyed(this._destroyRef));
  isTableLoading$ = this._store.select(PromotionStatsState.isTableLoading).pipe(takeUntilDestroyed(this._destroyRef));

  articles$ = this._store.select(MainState.goods).pipe(takeUntilDestroyed(this._destroyRef));

  filterGroups: IFiltersBox[][] = [];

  skeletons = Array.from({length: 10});

  chartOptions = signal<Partial<ApexOptions> | null>(null);

  readonly defaultColDefs: ColDef = {
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellStyle: { textAlign: 'right' },
  };

  columnDefs: ColDef[] = [];
  summaryRow: unknown[] = [];
  rowData: Partial<IStatsListItem>[] = [];

  theme = themeAlpine
    .withParams(
        {
          backgroundColor: "#030617",
          foregroundColor: "#FFFFFFCC",
          browserColorScheme: "dark",
        },
        "dark",
    );

  protected DEFAULT_PARAMS: Record<string, string[] | string | number | boolean> = {
    "nmId":[]
  }

  ngOnInit(): void {

    this._dateRangeService.dateRange$.next([startOfMonth(new Date()), endOfMonth(new Date())]);
        
    this._dateRangeService.dateRange$.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(([date1, date2]) => {

        const [ beginDate, endDate ] = [format(date1, 'yyyy-MM-dd'),  format(date2, 'yyyy-MM-dd')];

        if(!date1 || !date2) return;

        const params = {
          beginDate,
          endDate,
          ...this.DEFAULT_PARAMS
        }
  
        this._store.dispatch([
          new LoadStatsChart({
            method: 'POST',
            endpoint: "adv-stat/chart",
            params
          }),
          new LoadStatsTable({
            method: 'POST',
            endpoint: "adv-stat/table",
            params
          }),
        ])
      
  
      })
  

    this.articles$
      .subscribe(() => this.filterGroups = this._filterBuilder.build(STATS_FILTERS));

    this.chart$
      .subscribe((items => {
        this.chartOptions.set(getChartOptions(items, getCurrencyIcon()))
      }))

    this.table$
      .subscribe((items) => {
        const currency = getCurrencyIcon();
        this.columnDefs = genarateColumnDefs(false, currency);
        this.rowData = items;
        this.summaryRow = generateSummary(items);
      })

  }

  onFilterChangeEvent(event: Record<string, string[] | string | number | boolean>): void {
    const [ beginDate, endDate ] = [format(this._dateRangeService.dateRange$.value[0], 'yyyy-MM-dd'),  format(this._dateRangeService.dateRange$.value[1], 'yyyy-MM-dd')]
    
    this.DEFAULT_PARAMS = {nmId: event['articles'], beginDate, endDate};
    
    this._store.dispatch([
      this._store.dispatch([
        new LoadStatsChart({
          method: 'PATCH',
          endpoint: "adv-stat/chart",
          params: this.DEFAULT_PARAMS
        }),
        new LoadStatsTable({
          method: 'PATCH',
          endpoint: "adv-stat/table",
          params: this.DEFAULT_PARAMS
        }),
      ])
    ])
  }

}
