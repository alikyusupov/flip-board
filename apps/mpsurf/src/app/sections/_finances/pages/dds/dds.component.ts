import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IFiltersBox } from '@models';
import { Store } from '@ngxs/store';
import { FiltersBoxComponent } from '@ui-kit/filters-box/filters-box.component';
import { FilterBuilderService } from 'app/services/filter-builder.service';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { getCurrencyIcon } from 'app/utils';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TreeNode } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { TreeTableModule } from 'primeng/treetable';

import { LoadDdsGrid } from './dds.actions';
import { generateChartOptions } from './dds.chart';
import { DDS_FILTERS } from './dds.filters';
import { IDDSGridData } from './dds.model';
import { FinancesDdsState } from './dds.state';

@Component({
  selector: 'app-dds',
  imports: [
    NgApexchartsModule, 
    TreeTableModule, 
    TooltipModule, 
    AsyncPipe, 
    SkeletonModule, 
    NzSkeletonModule,
    FiltersBoxComponent
  ],
  templateUrl: './dds.component.html',
  styleUrl: './dds.component.scss'
})
export class DdsComponent implements OnInit {

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _filterBuilder = inject(FilterBuilderService);
  private readonly _dateRangeService = inject(GlobalDateRangeService);

  filterGroups: IFiltersBox[][] = [];

  readonly specialHeaders = [
    'Доступные средства на начало периода',
    'Доступные средства на конец периода',
    'Оборот денег за период',
    'Операционная деятельность',
    'Финансовая деятельность',
    'Инвестиционная деятельность',
    'Деятельность вне МП',
    'Перемещения',
    'Поступления',
    'Списания',
  ];

  chartOptions = signal<Partial<ApexOptions> | null>(null);
  ddsDataTable: IDDSGridData | null= null;

  grid$ = this._store.select(FinancesDdsState.grid).pipe(takeUntilDestroyed(this._destroyRef));
  isGridLoading$ = this._store.select(FinancesDdsState.isDdsGridLoading).pipe(takeUntilDestroyed(this._destroyRef));

  tree: TreeNode[] = [];
  columns: {field: string, header: string}[] = [];


  protected DEFAULT_PARAMS: Record<string, string[] | string | number | boolean> = {
    "type_group": 2,
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
  
        this._store.dispatch(new LoadDdsGrid({
          method: 'GET',
          endpoint: 'fin-dds',
          params
        }));
  
      })

    this.grid$.subscribe(grid => {
      if(grid) {
        this.tree = grid.data;
        this.columns = [{field: '', header: 'Статья'}, ...grid.columns];

        this.chartOptions.set(generateChartOptions(grid, getCurrencyIcon()))
      }
    })

    this.filterGroups = this._filterBuilder.build(DDS_FILTERS);
    
  }

  onFilterChangeEvent(params: Record<string, string[] | string | number | boolean>): void {
  
    const [ startDate, endDate ] = [format(this._dateRangeService.dateRange$.value[0], 'yyyy-MM-dd'),  format(this._dateRangeService.dateRange$.value[1], 'yyyy-MM-dd')];

    this.DEFAULT_PARAMS = {
      ...params,
      startDate,
      endDate
    };
  
    this._store.dispatch(new LoadDdsGrid({
      method: 'GET',
      endpoint: 'fin-dds',
      params: this.DEFAULT_PARAMS
    }));
    
  }

}
