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
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { combineLatest } from 'rxjs';

import { LoadRemainsTable, LoadRemainsWarehouses } from './remains.actions';
import { REMAINS_COLUMN_DEFS } from './remains.definition';
import { REMAINS_FILTERS } from './remains.filters';
import { IRemainsListItem } from './remains.models';
import { PlanningRemainsState } from './remains.state';


@Component({
  selector: 'app-remains',
  imports: [FiltersBoxComponent, AgGridAngular, AsyncPipe, NzSkeletonModule],
  templateUrl: './remains.component.html',
  styleUrl: './remains.component.scss'
})
export class RemainsComponent implements OnInit {

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _filterBuilder = inject(FilterBuilderService);
  private readonly _dateRangeService = inject(GlobalDateRangeService);
  

  filterGroups: IFiltersBox[][] = [];

  warehouses$ = this._store.select(PlanningRemainsState.warehouses).pipe(takeUntilDestroyed(this._destroyRef));
  articles$ = this._store.select(MainState.articles).pipe(takeUntilDestroyed(this._destroyRef));
  table$ = this._store.select(PlanningRemainsState.table).pipe(takeUntilDestroyed(this._destroyRef));

  isTableLoading$ = this._store.select(PlanningRemainsState.isTableLoading).pipe(takeUntilDestroyed(this._destroyRef));

  columnDefs = REMAINS_COLUMN_DEFS;
  rowData: IRemainsListItem[] = [];
  summaryData = [];

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

  readonly defaultColDefs: ColDef = {
    headerClass: 'header-centered',
    sortable: true,
    resizable: true,
    filter: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellStyle: { textAlign: 'center' },
  };

  protected DEFAULT_PARAMS: Record<string, string[] | string | number | boolean> = {
    "warehouses":[],
    "articles":[],
    "goods_on_way":false
  }

  ngOnInit(): void {

    this._store.dispatch([
      new LoadRemainsTable({
        method: 'POST',
        endpoint: 'stocks/list',
        params: this.DEFAULT_PARAMS
      }),
      new LoadRemainsWarehouses({
        method: 'GET',
        endpoint: 'stocks/warehouses',
      }),
    ])

    combineLatest([
      this.warehouses$, this.articles$
    ])
    this.warehouses$
      .subscribe(() => this.filterGroups = this._filterBuilder.build(REMAINS_FILTERS));

    this.table$
      .subscribe(grid => {
        if(grid) {
          this.rowData = grid?.data || [];
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this.summaryData = [{...grid?.total, photo: 'Итого'}];
        }

      })
  }

  onFilterChangeEvent(params: Record<string, string[] | string | number | boolean>): void {

    this.DEFAULT_PARAMS = params;

    this._store.dispatch(new LoadRemainsTable({
      method: 'POST',
      endpoint: 'stocks/list',
      params: this.DEFAULT_PARAMS
    }))
  }
}
