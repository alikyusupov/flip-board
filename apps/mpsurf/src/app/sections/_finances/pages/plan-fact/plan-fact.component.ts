 
import { Dialog } from '@angular/cdk/dialog';
import { AsyncPipe, DecimalPipe, NgStyle } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AG_GRID_RUSSIAN_LOCALE } from '@consts';
import { Store } from '@ngxs/store';
import { CardComponent } from '@ui-kit/card/card.component';
import { MpCurrencyPipe } from '@ui-kit/pipes/currency.pipe';
import { UnitPipe } from '@ui-kit/pipes/unit.pipe';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef,GridApi,GridOptions,GridReadyEvent,themeAlpine } from 'ag-grid-community';
import { CURRENCY } from 'app/tokens';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { filter, map } from 'rxjs';

import { PlanFactUpsertDialogComponent } from '../../dialogs/plan-fact-upsert-dialog/plan-fact-upsert-dialog.component';
import { ClonePlanFact, DeletePlanFact, LoadChart, LoadFullTable, LoadGeneralInfo, LoadPlanCards, LoadPlanFactById, LoadPlanFacts, ResetPlanFact } from './plan-fact.actions';
import { PLAN_FACT_COLUMN_DEFS } from './plan-fact.definition';
import { getChartOptions, getDateKeys, mapToRows } from './plan-fact.func';
import { IFullTableItem, IFullTableItemArticle } from './plan-fact.model';
import { FinancesPlanFactState } from './plan-fact.state';

export type DialogType = 'add' | 'delete' | 'edit'

@Component({
  selector: 'app-plan-fact',
  imports: [AsyncPipe, AgGridAngular, NzSkeletonModule, DecimalPipe, UnitPipe, CardComponent, NgApexchartsModule, MatTableModule, NgStyle, NzButtonModule, NzIconModule, NzModalModule, MpCurrencyPipe],
  templateUrl: './plan-fact.component.html',
  styleUrl: './plan-fact.component.scss'
})
export class PlanFactComponent implements OnInit, OnDestroy {

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _store = inject(Store);
  private readonly dialog = inject(Dialog);
  private readonly modalService = inject(NzModalService);
  protected readonly currency = inject(CURRENCY)

  public dataSource = new MatTableDataSource<IFullTableItem>([]);

  planId = 0;
  start = '';
  editMode = false;

  dateKeys = [];
  selectedDateType = 1;
  selectedUnitType = 1
  dateColumns: string[] = [];
  filteredColumns: string[] = [];
  columns: {field: string}[] = [];
  groups: IFullTableItem[] = [];
  displayedColumns: string[] = [];
  displayedColumns2: string[] = [];

  isPlanFactListLoading$ = this._store.select(FinancesPlanFactState.isPlanFactListLoading);
  planFactList$ = this._store.select(FinancesPlanFactState.planFactList);

  isPlanFactGeneralInfoLoading$ = this._store.select(FinancesPlanFactState.isPlanFactGeneralInfoLoading);
  planFactGeneralInfo$ = this._store.select(FinancesPlanFactState.planFactGeneralInfo);

  isPlanFactCardsLoading$ = this._store.select(FinancesPlanFactState.isPlanFactCardsLoading);
  planFactCards$ = this._store.select(FinancesPlanFactState.planFactCards);

  isPlanFactChartLoading$ = this._store.select(FinancesPlanFactState.isPlanFactChartLoading);
  planFactChartOptions$ = this._store.select(FinancesPlanFactState.planFactChart)
    .pipe(
      takeUntilDestroyed(this._destroyRef), 
      filter(chart => chart.length > 0),
      map(chart => getChartOptions(chart, 'rub'))
    )
  
  isPlanFactFulltableLoading$ = this._store.select(FinancesPlanFactState.isPlanFactFulltableLoading);

  mappedData$ = this._store.select(FinancesPlanFactState.planFactGeneralInfo)
    .pipe(
      takeUntilDestroyed(this._destroyRef), 
      filter(info => !!info),
      map(info => mapToRows(info.table, 'rub'))
    )

  readonly defaultColDef: ColDef = {
    headerClass: 'header-centered',
    sortable: true,
    resizable: true,
    filter: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellStyle: { textAlign: 'center' },
  };

  gridApi!: GridApi;

  gridOptionsPlanFact = {
    context: { componentParent: this },
    enableCellTextSelection: true,
    localeText: AG_GRID_RUSSIAN_LOCALE
  } as GridOptions;

  columnDefs = PLAN_FACT_COLUMN_DEFS;
  
  skeletons10 = Array.from({length: 10});

  skeletons3 = Array.from({length: 3});

  skeletons2 = Array.from({length: 2});


  theme = themeAlpine
    .withParams(
      {
        backgroundColor: "#030617",
        foregroundColor: "#FFFFFFCC",
        browserColorScheme: "dark",
      },
      "dark",
    );

  ngOnInit(): void {
    this._store.dispatch(new LoadPlanFacts({
      method: 'GET',
      endpoint: 'plan-fact',
    }));

    this._store.select(FinancesPlanFactState.planFactFulltable)
    .pipe(
      takeUntilDestroyed(this._destroyRef), 
      filter(table => !!table?.length),
    )
    .subscribe(data => {
      this.dataSource.data = data;
      this.groups = data;
      this.dateColumns = [
        'groupHeader',
        'plan_day',
        'total',
        ...getDateKeys(data as unknown as IFullTableItem[]),
      ];
      this.filteredColumns = getDateKeys(data);
      this.columns = [
        {
          field: 'type',
        },
        {
          field: 'plan_day',
        },
        {
          field: 'total',
        },
        ...this.filteredColumns.map(col => ({ field: col }))
      ];
      this.displayedColumns2 = this.columns.map(column => column.field === 'type' ? 'typeHeader' : column.field);
      this.displayedColumns = this.columns.map(column => column.field);

    })
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onRowClick(id: number, start: string): void {
    this.planId = id;
    this.start = start;
    this._store.dispatch([
      new LoadPlanCards({
        method: 'GET',
        endpoint: 'plan-fact/cards',
        params: { id }
      }),
      new LoadGeneralInfo({
        method: 'GET',
        endpoint: 'plan-fact/general-info',
        params: { id }
      }),
      new LoadChart({
        method: 'GET',
        endpoint: 'plan-fact/chart',
        params: { id }
      }),
      new LoadFullTable({
        method: 'GET',
        endpoint: 'plan-fact/full-table',
        params: { id, month: this.start }
      }),

    ])
  }

  onEditClick(id: number): void {
    this.editMode = true;

    this._store.dispatch(new LoadPlanFactById({
      method: 'GET',
      endpoint: `plan-fact/${id}`
    }))

    this.openDialog('edit');
  }

  onCloneClick(id: number): void {
    this._store.dispatch(new ClonePlanFact({
      method: 'GET',
      endpoint: `plan-fact/${id}`
    }))
  }

  onDeleteClick(id: number, plan_name: string): void {

    this.modalService.confirm({
      nzTitle: `Удаление плана ${plan_name}`,
      nzContent: `<b style="color: red;">Вы действительно хотите удалить план?</b>`,
      nzOkText: 'Да',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this._store.dispatch(new DeletePlanFact({
          method: 'DELETE',
          endpoint: `plan-fact/${id}`
        }))
      },
      nzCancelText: 'Нет',
      nzOnCancel: () => this.modalService.closeAll()
    });
  

  }

  groupHeaderClick(row: IFullTableItem) {
    if(!row?.articles?.length) {
      return
    }
    if (row.expanded) {
      row.expanded = false;
      const agg: IFullTableItemArticle[] = [];
      this.groups.forEach(g =>
        g.expanded ? agg.push(g, ...g.articles) : agg.push(g)
      );
      this.dataSource.data = agg as IFullTableItem[];
    } else {
      row.expanded = true;
      const agg: IFullTableItemArticle[] = [];
      this.groups.forEach(g =>
        g.expanded ? agg.push(g, ...g.articles) : agg.push(g)
      );
      this.dataSource.data = agg as IFullTableItem[];
    }
  }

  isGroup(index: number, item: IFullTableItem): number {
    return item.level;
  }

  isObject(entry: string | number | object): boolean {
    return typeof entry === 'object' && !!entry
  }

  openDialog(mode: DialogType): void {

    this.dialog.open(PlanFactUpsertDialogComponent, {
      minWidth: '50vw',
      maxHeight: '620px',
      data: {
        mode: mode,
      },
    });
  
  }

  ngOnDestroy(): void {
    this._store.dispatch(new ResetPlanFact())
  }
}
