/* eslint-disable @typescript-eslint/prefer-for-of */
import {
  CDK_DRAG_CONFIG,
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ICustomizationItem, Marketplace } from '@models';
import { Store } from '@ngxs/store';
import { FiltersBoxComponent } from '@ui-kit/filters-box/filters-box.component';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColGroupDef, GridApi, GridReadyEvent, themeAlpine } from 'ag-grid-community';
import { IFiltersBox } from 'app/models/filters-box';
import { FilterBuilderService } from 'app/services/filter-builder.service';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { MainState } from 'app/states/main.state';
import { MARKETPLACE } from 'app/tokens';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { combineLatest,filter, tap } from 'rxjs';

import { LoadTableID_1, LoadTableID_2, LoadTableID_4 } from './rnp.actions';
import { RNP_FILTERS, RNP_FILTERS_OZON } from './rnp.filters';
import { generateColumnDefs } from './rnp.func';
import { IRnpTable, ITableItemData } from './rnp.model';
import { ProductAnalyticsRnpState } from './rnp.state';

enum TableEnum  {
  VORONKA,
  GENERAL,
  TURNOVER
}


const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};
@Component({
  selector: 'app-rnp',
  imports: [
    NzIconModule, 
    NzSelectModule, 
    FiltersBoxComponent,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    AgGridModule,
    AsyncPipe,
    DragDropModule,
    NzCheckboxModule,
    FormsModule, 
    MatDialogModule,
    NzButtonModule
  ],
  templateUrl: './rnp.component.html',
  styleUrl: './rnp.component.scss',
  providers:[ { provide: CDK_DRAG_CONFIG, useValue: DragConfig }]

})
export class RnpComponent implements OnInit {

  TableEnum = TableEnum;

  marketplaceEnum = Marketplace;

  filterGroups: IFiltersBox[][] = [];

  gridApi1!: GridApi;
  gridApi2!: GridApi;
  gridApi4!: GridApi;

  selectedPage = 1;
  paginationLength = 1;

  table1_data: ITableItemData[] = [];
  table2_data: ITableItemData[] = [];
  table4_data: ITableItemData[] = [];

  row_data1: ITableItemData[] = [];
  row_data2: ITableItemData[] = [];
  row_data4: ITableItemData[] = [];

  table1_columnDefs: ColGroupDef[] = [];
  table2_columnDefs: ColGroupDef[] = [];
  table4_columnDefs: ColGroupDef[] = [];

  defaultColDef: ColDef = {
    headerClass: 'header-centered',
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellStyle: { textAlign: 'center' },
  };

  private readonly _store = inject(Store);
  private readonly _filterBuilder = inject(FilterBuilderService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  private readonly _dateRangeService = inject(GlobalDateRangeService);

  protected marketplace = inject(MARKETPLACE);
  

  isTable1_loading$ = this._store.select(ProductAnalyticsRnpState.isTable1Loading);
  isTable2_loading$ = this._store.select(ProductAnalyticsRnpState.isTable2Loading);
  isTable4_loading$ = this._store.select(ProductAnalyticsRnpState.isTable4Loading);

  voronka_categories: ICustomizationItem[] = []
  general_categories: ICustomizationItem[] = []
  turnover_categories: ICustomizationItem[] = []

  @ViewChild('customizator1') customizator_dialog!: TemplateRef<unknown>;

  incomingRows: string[] = [];

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
    "categoryPnl":[],
    "articles":[],
    "subjects":[],
    "pagination":1,
    "dateType":1,
    "tags":[],
    "myStatus":[],
    "imtIds":[],
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

      this.loadPanels(params);

    })

    const filters$ = this.marketplace() === Marketplace.OZON
      ? [
          this._store.select(MainState.goods),
          this._store.select(MainState.categories),
          this._store.select(MainState.subjects),
        ]
      : [
          this._store.select(MainState.goods),
          this._store.select(MainState.categories),
          this._store.select(MainState.subjects),
          this._store.select(MainState.imtIds),
        ]

    const FILTERS = this.marketplace() === Marketplace.OZON ? RNP_FILTERS_OZON: RNP_FILTERS

    combineLatest(filters$)
    .pipe(takeUntilDestroyed(this._destroyRef), tap(f => console.log(f)))
    .subscribe(() => this.filterGroups = this._filterBuilder.build(FILTERS));

    combineLatest([
      this._store.select(ProductAnalyticsRnpState.table1),
      this._store.select(ProductAnalyticsRnpState.table2),
      this._store.select(ProductAnalyticsRnpState.table4)
    ])
    .pipe(takeUntilDestroyed(this._destroyRef), filter(([table1, table2, table4]) => !!table1 && !!table2 && !!table4))
    .subscribe(([table1, table2, table4]) => {

      this.row_data1 = (table1 as IRnpTable).data[0].table;
      this.row_data2 = (table2 as IRnpTable).data[0].table;
      this.row_data4 = (table4 as IRnpTable).data[0].table;

      this.table1_columnDefs = generateColumnDefs((table1 as IRnpTable).data[0].groups);
 
      this.table2_columnDefs = generateColumnDefs((table2 as IRnpTable).data[0].groups);
 
      this.table4_columnDefs = generateColumnDefs((table4 as IRnpTable).data[0].groups);
      
      const saved_voronka_categories: ICustomizationItem[] = JSON.parse(localStorage.getItem('rnp_settings_voronka')!) || [];

      if(saved_voronka_categories.length){

        const output: ITableItemData[] = [];

        const tableData = (table2 as IRnpTable).data[0].table;

        const filteredItems = saved_voronka_categories.filter(cat => cat.checked);

        for (let i = 0; i < filteredItems.length; i++) {
          const element = tableData.find(d => d['Показатели'] === filteredItems[i].key);
          if(element){
            output.push(element)
          }
        }

        this.voronka_categories = saved_voronka_categories;
        this.table2_data = output;

      }
      else {
        this.table2_data = (table2 as IRnpTable).data[0].table;
        this.voronka_categories = [table2].flatMap(t => t?.data.flatMap(t => t.table)).map(t => t!['Показатели']).map(v => {
        return {
          name: v, 
          key: v, 
          checked: true, 
          disabled: false, 
          dragDisabled: false
        }
      }) as ICustomizationItem[];
      }
    
      const saved_general_categories: ICustomizationItem[] = JSON.parse(localStorage.getItem('rnp_settings_general')!) || [];

      if(saved_general_categories.length){

        const output: ITableItemData[] = [];

        const tableData = (table1 as IRnpTable).data[0].table;

        const filteredItems = saved_general_categories.filter(cat => cat.checked);

        for (let i = 0; i < filteredItems.length; i++) {

          const element = tableData.find(d => d['Показатели'] === filteredItems[i].key);

          if(element){
            output.push(element)
          }
          
        }

        this.table1_data = output;
        this.general_categories = saved_general_categories;

      }
      else {
        this.table1_data = (table1 as IRnpTable).data[0].table;
        this.general_categories = [table1].flatMap(t => t?.data.flatMap(t => t.table)).map(t => t!['Показатели']).map(v => {
          return {
            name: v, 
            key: v, 
            checked: true, 
            disabled: false, 
            dragDisabled: false
          }
        }) as ICustomizationItem[];
      }

      const saved_turnover_categories: ICustomizationItem[] = JSON.parse(localStorage.getItem('rnp_settings_turnover')!) || [];

      if(saved_turnover_categories.length){

        const output: ITableItemData[] = [];

        const tableData = (table4 as IRnpTable).data[0].table;

        const filteredItems = saved_turnover_categories.filter(cat => cat.checked);

        for (let i = 0; i < filteredItems.length; i++) {

          const element = tableData.find(d => d['Показатели'] === filteredItems[i].key);

          if(element){
            output.push(element)
          }
          
        }

        this.table4_data = output;
        this.turnover_categories = saved_turnover_categories;

      }
      else {
        this.table4_data = (table4 as IRnpTable).data[0].table;
        this.turnover_categories = [table4].flatMap(t => t?.data.flatMap(t => t.table)).map(t => t!['Показатели']).map(v => {
          return {
            name: v, 
            key: v, 
            checked: true, 
            disabled: false, 
            dragDisabled: false
          }
        }) as ICustomizationItem[];
      }
    })

  }
  

  onFilterChangeEvent(params: Record<string, string[] | string | number | boolean>): void {

    const [ startDate, endDate ] = [format(this._dateRangeService.dateRange$.value[0], 'yyyy-MM-dd'),  format(this._dateRangeService.dateRange$.value[1], 'yyyy-MM-dd')];

    this.DEFAULT_PARAMS = params;
  
    this.loadPanels({
      startDate,
      endDate, 
      ...this.DEFAULT_PARAMS,
      "pagination": this.selectedPage
    })
  
  }

  onPage(page: {pageIndex: number}): void {
    this.selectedPage = page.pageIndex + 1;
    const [ startDate, endDate ] = [format(this._dateRangeService.dateRange$.value[0], 'yyyy-MM-dd'),  format(this._dateRangeService.dateRange$.value[1], 'yyyy-MM-dd')]

    const params = {
      startDate,
      endDate,
      ...this.DEFAULT_PARAMS,
      "pagination": this.selectedPage,
    }

    this.DEFAULT_PARAMS = params;

    this.loadPanels(params);
  }

  loadPanels(params: Record<string, unknown>): void {

    this._store.dispatch([
      new LoadTableID_1({method: 'POST', endpoint: 'rnp/table', params: { ...params, id: 1 }}), 
      new LoadTableID_2({method: 'POST', endpoint: 'rnp/table', params: { ...params, id: 2}}), 
      new LoadTableID_4({method: 'POST', endpoint: 'rnp/table', params: { ...params, id: 4 }})
    ])
  }

  onGridReady1(params: GridReadyEvent) {
    this.gridApi1 = params.api;
  }

  onGridReady2(params: GridReadyEvent) {
    this.gridApi2 = params.api;
  }

  onGridReady4(params: GridReadyEvent) {
    this.gridApi4 = params.api;
  }

  dropGeneral(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.general_categories, event.previousIndex, event.currentIndex);
  }

  dropVoronka(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.voronka_categories, event.previousIndex, event.currentIndex);
  }

  dropTurnover(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.turnover_categories, event.previousIndex, event.currentIndex);
  }

  onCheckboxesChangeGeneral(event: boolean, key: string): void {
    this.general_categories = this.general_categories.map(ctg => {
      return ctg.key === key ? { ...ctg, checked: event } : ctg;
    })
  }

  onCheckboxesChangeVoronka(event: boolean, key: string): void {
    this.voronka_categories = this.voronka_categories.map(ctg => {
      return ctg.key === key ? { ...ctg, checked: event } : ctg;
    })
  }

  onCheckboxesChangeTurnover(event: boolean, key: string): void {
    this.turnover_categories = this.turnover_categories.map(ctg => {
      return ctg.key === key ? { ...ctg, checked: event } : ctg;
    })
  }

  setCheckboxesState(table: TableEnum, state: boolean): void {

    if(table === TableEnum.GENERAL) {
      this.general_categories = this.general_categories.map((ctg)=> ({...ctg, checked: state}));
    }
    else if(table === TableEnum.VORONKA) {
      this.voronka_categories = this.voronka_categories.map((ctg)=> ({...ctg, checked: state}));
    }
    else {
      this.turnover_categories = this.turnover_categories.map((ctg)=> ({...ctg, checked: state}));
    }
  }

  onCheckboxesSave(table: TableEnum): void {
    if(table === TableEnum.VORONKA){
      localStorage.setItem('rnp_settings_voronka', JSON.stringify(this.voronka_categories));
      const savedKeys = this.voronka_categories.filter(cat => cat.checked).map(cat => cat.key);

      const output: ITableItemData[] = [];

      savedKeys.forEach(key => {
        const data = this.row_data2.find(d => d['Показатели'] === key);
        if(data){
          output.push(data)
        }
      })

      this.table2_data = output;

    }
    else if(table === TableEnum.GENERAL) {
      localStorage.setItem('rnp_settings_general', JSON.stringify(this.general_categories));
      const savedKeys = this.general_categories.filter(cat => cat.checked).map(cat => cat.key);

      const output: ITableItemData[] = [];

      savedKeys.forEach(key => {
        const data = this.row_data1.find(d => d['Показатели'] === key);
        if(data){
          output.push(data)
        }
      })


      this.table1_data = output;
    }
    else {
      localStorage.setItem('rnp_settings_turnover', JSON.stringify(this.turnover_categories));
      const savedKeys = this.turnover_categories.filter(cat => cat.checked).map(cat => cat.key);

      const output: ITableItemData[] = [];

      savedKeys.forEach(key => {
        const data = this.row_data4.find(d => d['Показатели'] === key);
        if(data){
          output.push(data)
        }
      })

      this.table4_data = output;
    }
    this.dialog.closeAll()
  }

  openDialog(template: TemplateRef<unknown>) {
    const dialogRef = this.dialog.open(template);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
