import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IFiltersBox } from '@models';
import { Store } from '@ngxs/store';
import { CardComponent } from '@ui-kit/card/card.component';
import { FiltersBoxComponent } from '@ui-kit/filters-box/filters-box.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, themeAlpine } from 'ag-grid-community';
import { FilterBuilderService } from 'app/services/filter-builder.service';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { MainState } from 'app/states/main.state';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { combineLatest } from 'rxjs';

import { LoadAbcTable } from './abc.actions';
import { ABC_FILTERS } from './abc.filters';
import { generateColumnDefs } from './abc.func';
import { IAbcGridDataItem } from './abc.model';
import { ProductAnalyticsAbcState } from './abc.state';


@Component({
  selector: 'app-abc',
  imports: [
    AgGridAngular, 
    FiltersBoxComponent, 
    AsyncPipe,
    NzSkeletonModule, 
    CardComponent,
  ],
  templateUrl: './abc.component.html',
  styleUrl: './abc.component.scss',
})
export class AbcComponent implements OnInit {

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _filterBuilder = inject(FilterBuilderService);
  private readonly _dateRangeService = inject(GlobalDateRangeService);

  filterGroups: IFiltersBox[][] = [];

  salesGridOptions: GridOptions = {
    context: { componentParent: this },
    enableCellTextSelection: true,
  };
  
  skeletons = Array.from({length: 10});
  cardSkeletons = Array.from({length: 3});

  theme = themeAlpine
    .withParams(
        {
          backgroundColor: "#030617",
          foregroundColor: "#FFFFFFCC",
          browserColorScheme: "dark",
        },
        "dark",
    );

  table$ = this._store.select(ProductAnalyticsAbcState.table).pipe(takeUntilDestroyed(this._destroyRef));
  isTableLoading$ = this._store.select(ProductAnalyticsAbcState.isTableLoading).pipe(takeUntilDestroyed(this._destroyRef));;

  cards$ = this._store.select(ProductAnalyticsAbcState.cards).pipe(takeUntilDestroyed(this._destroyRef));
  isCardsLoading$ = this._store.select(ProductAnalyticsAbcState.isCardsLoading).pipe(takeUntilDestroyed(this._destroyRef));;

  rowData: IAbcGridDataItem[] = [];

  readonly defaultColDef: ColDef = {
    headerClass: 'header-centered',
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellStyle: { textAlign: 'center' },
  };

  columnDefs: ColDef[] = [];

  wbChecked = signal(false);
  fboFbsChecked = signal(false);
  isOzon = signal(false);

  groupingOptions = !this.isOzon()
  ? [
      { name: 'Артикулу', value: 'article' },
      { name: 'Размеру', value: 'size' },
      { name: 'Бренду', value: 'brand' },
      { name: 'Предмету', value: 'subject' },
      { name: 'Собственной категории', value: 'category_pnl' },
    ]
  :
  [
    { name: 'Артикулу', value: 'article' },
    { name: 'Предмету', value: 'subject' },
    { name: 'Собственной категории', value: 'category_pnl' },
  ]

  selectedGrouping = this.groupingOptions[0];

  gridOptions: GridOptions = {
    context: { componentParent: this },
    enableCellTextSelection: true,
  };

  protected DEFAULT_PARAMS: Record<string, string[] | string | number | boolean> = {
    "adv_oper": "1",
    "wb_oper": "0",
    "fbo_fbs": "0",
    "myStatus": [],
    "categoryPnl": [],
    "tags": [],
    "grouping": "article"
  }

  ngOnInit(): void {

    this._dateRangeService.dateRange$.next([startOfMonth(new Date()), endOfMonth(new Date())])

    this.columnDefs = generateColumnDefs(this.wbChecked(), this.fboFbsChecked(), this.isOzon(), this.selectedGrouping.value);

    combineLatest([
      this._store.select(MainState.statuses),
      this._store.select(MainState.categories),
      this._store.select(MainState.tags),
    ])
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this.filterGroups = this._filterBuilder.build(ABC_FILTERS));

    this.table$.subscribe(grid => {
      if(!grid) return;
      this.rowData = grid.data;
    })

    this._dateRangeService.dateRange$.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(([date1, date2]) => {

        if(!date1 || !date2) return;
        
        const [ beginDate, endDate ] = [format(date1, 'yyyy-MM-dd'),  format(date2, 'yyyy-MM-dd')];

        this._store.dispatch(new LoadAbcTable({
          method: 'POST',
          endpoint: 'abc/list-v2',
          params: {
            "beginDate": beginDate,
            "endDate": endDate,
            ...this.DEFAULT_PARAMS
          }
        }));

      })

  }

  onFilterChangeEvent(event: Record<string, string[] | string | number | boolean>): void {

    const [ beginDate, endDate ] = [format(this._dateRangeService.dateRange$.value[0], 'yyyy-MM-dd'),  format(this._dateRangeService.dateRange$.value[1], 'yyyy-MM-dd')]

    this.DEFAULT_PARAMS = event;
    
    this._store.dispatch(new LoadAbcTable({
      method: 'POST',
      endpoint: 'abc/list-v2',
      params: {
        beginDate,
        endDate,
        ...this.DEFAULT_PARAMS
      }
    }));

  }

}
