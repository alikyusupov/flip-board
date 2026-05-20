import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IFiltersBox } from '@models';
import { Store } from '@ngxs/store';
import { FiltersBoxComponent } from '@ui-kit/filters-box/filters-box.component';
import { FilterBuilderService } from 'app/services/filter-builder.service';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { MainState } from 'app/states/main.state';
import { getCurrencyIcon } from 'app/utils';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TreeNode } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { TreeTableModule } from 'primeng/treetable';
import { combineLatest } from 'rxjs';

import { LoadPnlGrid } from './pnl.actions';
import { generateChartOptions } from './pnl.chart';
import { PNL_FILTERS } from './pnl.filters';
import { FinancesPnlState } from './pnl.state';

@Component({
  selector: 'app-pnl',
  imports: [
    FiltersBoxComponent, 
    TreeTableModule,
    SkeletonModule,
    AsyncPipe,
    NgApexchartsModule,
    NzSkeletonModule
  ],
  templateUrl: './pnl.component.html',
  styleUrl: './pnl.component.scss'
})
export class PnlComponent implements OnInit {

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _filterBuilder = inject(FilterBuilderService);
  private readonly _dateRangeService = inject(GlobalDateRangeService);

  filterGroups: IFiltersBox[][] = [];

  chartOptions = signal<Partial<ApexOptions> | null>(null);

  grid$ = this._store.select(FinancesPnlState.grid).pipe(takeUntilDestroyed(this._destroyRef));
  isGridLoading$ = this._store.select(FinancesPnlState.isPnlGridLoading).pipe(takeUntilDestroyed(this._destroyRef));

  tree: TreeNode[] = [];
  columns: {field: string, header: string}[] = [];

  protected DEFAULT_PARAMS: Record<string, string[] | string | number | boolean> = {
    "type_group":3,
    "adv_oper":"0",
    "realization_report":"0",
    "categoryPnl":[],
    "articles":[],
    "subjects":[],
    "myStatus":[],
    "tags":[],
  }

  ngOnInit(): void {

    this._dateRangeService.dateRange$.next([startOfMonth(new Date()), endOfMonth(new Date())]);

    this._dateRangeService.dateRange$.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(([date1, date2]) => {

        const [ startDate, endDate ] = [format(date1, 'yyyy-MM-dd'),  format(date2, 'yyyy-MM-dd')];

        if(!date1 || !date2) return;

        const params = {
          startDate,
          endDate,
          ...this.DEFAULT_PARAMS
        }
  
        this._store.dispatch(new LoadPnlGrid({
          method: 'POST',
          endpoint: 'fin-pnl/pnl-data',
          params
        }));
  
      })

    combineLatest([
      this._store.select(MainState.goods),
      this._store.select(MainState.subjects),
      this._store.select(MainState.categories),
      this._store.select(MainState.tags),
      this._store.select(MainState.statuses),
    ])
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this.filterGroups = this._filterBuilder.build(PNL_FILTERS));

    this.grid$.subscribe(grid => {
      if(grid) {
        this.tree = grid.data;
        this.columns = [{field: '', header: 'Статья'}, ...grid.columns];

        this.chartOptions.set(generateChartOptions(grid, getCurrencyIcon()));

      }
    })
    
  }

  onFilterChangeEvent(params: Record<string, string[] | string | number | boolean>): void {

    const [ startDate, endDate ] = [format(this._dateRangeService.dateRange$.value[0], 'yyyy-MM-dd'),  format(this._dateRangeService.dateRange$.value[1], 'yyyy-MM-dd')];

    this.DEFAULT_PARAMS = {
      ...params,
      startDate,
      endDate
    };
  
    this._store.dispatch(new LoadPnlGrid({
      method: 'POST',
      endpoint: 'fin-pnl/pnl-data',
      params: this.DEFAULT_PARAMS
    }));
  
  }

}
