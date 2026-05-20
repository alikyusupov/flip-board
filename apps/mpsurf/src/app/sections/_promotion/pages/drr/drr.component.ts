import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IFiltersBox } from '@models';
import { Store } from '@ngxs/store';
import { CardComponent } from '@ui-kit/card/card.component';
import { FiltersBoxComponent } from '@ui-kit/filters-box/filters-box.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, themeAlpine } from 'ag-grid-community';
import { FilterBuilderService } from 'app/services/filter-builder.service';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { MainState } from 'app/states/main.state';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { combineLatest } from 'rxjs';

import { LoadDdrCards, LoadDdrTable } from './drr.actions';
import { DRR_COLUMN_DEFS } from './drr.definition';
import { DRR_FILTERS } from './drr.filters';
import { PromotionDdrState } from './drr.state';


@Component({
  selector: 'app-drr',
  imports: [FiltersBoxComponent, AgGridAngular, AsyncPipe, NzSkeletonModule, CardComponent],
  templateUrl: './drr.component.html',
  styleUrl: './drr.component.scss'
})
export class DrrComponent implements OnInit {

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _filterBuilder = inject(FilterBuilderService);
  private readonly _dateRangeService = inject(GlobalDateRangeService);
  

  cards$ = this._store.select(PromotionDdrState.cards).pipe(takeUntilDestroyed(this._destroyRef));
  table$ = this._store.select(PromotionDdrState.table).pipe(takeUntilDestroyed(this._destroyRef));

  isCardsLoading$ = this._store.select(PromotionDdrState.isCardsLoading).pipe(takeUntilDestroyed(this._destroyRef));
  isTableLoading$ = this._store.select(PromotionDdrState.isTableLoading).pipe(takeUntilDestroyed(this._destroyRef));

  articles$ = this._store.select(MainState.goods).pipe(takeUntilDestroyed(this._destroyRef));
  imtIds$ = this._store.select(MainState.imtIds).pipe(takeUntilDestroyed(this._destroyRef));

  filterGroups: IFiltersBox[][] = [];

  readonly defaultColDefs: Partial<ColDef> = {
    minWidth: 30,
    maxWidth: 400,
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    headerClass: 'header-centered',
  };

  columnDefs = DRR_COLUMN_DEFS;

  skeletons = Array.from({length: 10});

  cardSkeletons = Array.from({length: 2});

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
    "articles":[],
    "grouping":"article",
    "advType":[],
    "imtIds":[],
    "datetype": 1
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
          new LoadDdrTable({
            method: 'POST',
            endpoint: 'adverts/adv-stat',
            params
          }),
          new LoadDdrCards({
            method: 'POST',
            endpoint: 'adverts/cards',
            params
          }),
        ])
  
      })


    combineLatest([this.articles$, this.imtIds$])
      .subscribe(() => this.filterGroups = this._filterBuilder.build(DRR_FILTERS));

  }

  onFilterChangeEvent(event: Record<string, string[] | string | number | boolean>): void {
    const [ beginDate, endDate ] = [format(this._dateRangeService.dateRange$.value[0], 'yyyy-MM-dd'),  format(this._dateRangeService.dateRange$.value[1], 'yyyy-MM-dd')]
    
    this.DEFAULT_PARAMS = {...event, beginDate, endDate};
    
    this._store.dispatch([
      new LoadDdrTable({
        method: 'POST',
        endpoint: 'adverts/adv-stat',
        params: this.DEFAULT_PARAMS,
      }),
      new LoadDdrCards({
        method: 'POST',
        endpoint: 'adverts/cards',
        params: this.DEFAULT_PARAMS
      })
    ])
  }

}
