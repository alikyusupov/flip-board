import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IFiltersBox } from '@models';
import { Store } from '@ngxs/store';
import { FiltersBoxComponent } from '@ui-kit/filters-box/filters-box.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, themeAlpine } from 'ag-grid-community';
import { FilterBuilderService } from 'app/services/filter-builder.service';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { MainState } from 'app/states/main.state';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { combineLatest } from 'rxjs';

import { LoadClustersGrid } from './clusters.actions';
import { generate_clusters } from './clusters.definition';
import { CLUSTERS_FILTERS } from './clusters.filters';
import { IClustersGrid } from './clusters.model';
import { PlanningClustersState } from './clusters.state';


@Component({
  selector: 'app-clusters',
  imports: [FiltersBoxComponent, NzSkeletonModule, AgGridAngular, AsyncPipe],
  templateUrl: './clusters.component.html',
  styleUrl: './clusters.component.scss'
})
export class ClustersComponent implements OnInit {

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _filterBuilder = inject(FilterBuilderService);
  private readonly _dateRangeService = inject(GlobalDateRangeService);

  readonly defaultColDefs: ColDef = {
    headerClass: 'header-centered',
    sortable: true,
    resizable: true,
    filter: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellStyle: { textAlign: 'center' },
  };

  filterGroups: IFiltersBox[][] = [];

  columnDefs: ColDef[] = [];
  rowData: IClustersGrid = [];

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

  categories$ = this._store.select(MainState.categories).pipe(takeUntilDestroyed(this._destroyRef));
  statuses$ = this._store.select(MainState.statuses).pipe(takeUntilDestroyed(this._destroyRef));
  tags$ = this._store.select(MainState.tags).pipe(takeUntilDestroyed(this._destroyRef));

  table$ = this._store.select(PlanningClustersState.table).pipe(takeUntilDestroyed(this._destroyRef));
  isTableLoading$ = this._store.select(PlanningClustersState.isTableLoading).pipe(takeUntilDestroyed(this._destroyRef));

   protected DEFAULT_PARAMS: Record<string, string[] | string | number | boolean> = {
    "tags":[],
    "myStatus":[],
    "categoryPnl": []
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
  
        
        this._store.dispatch(new LoadClustersGrid({
          method: 'POST',
          endpoint: 'clusters/data',
          params
        }))
  
      })


    combineLatest([this.categories$, this.statuses$, this.tags$])
      .subscribe(() => this.filterGroups =  this._filterBuilder.build(CLUSTERS_FILTERS))
    this.table$
      .subscribe(grid => {
        if(grid && grid[0]?.length){

          this.rowData = grid;

          this.columnDefs = generate_clusters(grid[0])
        }
      })
  }

  onFilterChangeEvent(event: Record<string, string[] | string | number | boolean>): void {
      const [ beginDate, endDate ] = [format(this._dateRangeService.dateRange$.value[0], 'yyyy-MM-dd'),  format(this._dateRangeService.dateRange$.value[1], 'yyyy-MM-dd')]
      
      this.DEFAULT_PARAMS = {...event, beginDate, endDate};
      
      this._store.dispatch(new LoadClustersGrid({
        method: 'POST',
        endpoint: 'clusters/data',
        params: this.DEFAULT_PARAMS
      }))
    }

}
