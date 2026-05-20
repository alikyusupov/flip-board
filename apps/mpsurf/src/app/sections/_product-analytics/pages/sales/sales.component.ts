import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { API_PROD_OLD, API_TEST_OLD } from '@consts';
import { IFiltersBox, Marketplace } from '@models';
import { Store } from '@ngxs/store';
import { FiltersBoxComponent } from '@ui-kit/filters-box/filters-box.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, FilterModel, GridApi, GridOptions, GridReadyEvent, themeAlpine } from 'ag-grid-community';
import { FilterBuilderService } from 'app/services/filter-builder.service';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { MainState } from 'app/states/main.state';
import { MARKETPLACE } from 'app/tokens';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { environment } from 'environments/environment';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { combineLatest,filter } from 'rxjs';

import { GetSalesCategories, GetSalesNmids, GetSalesSubjects, GetSalesWareHouses, LoadChart, LoadTable } from './sales.actions';
import { getChartOptions } from './sales.chart';
import { SALES_TABLE_COLUMN_DEFS_OZON, SALES_TABLE_COLUMN_DEFS_WB, SALES_TABLE_COLUMN_DEFS_YA } from './sales.definition';
import { SALES_FILTERS_OZON, SALES_FILTERS_WB } from './sales.filters';
import { generateColumnDefsByDate, generateSummary } from './sales.func';
import { ISalesTableItem } from './sales.model';
import { ProductAnalyticsSalesState } from './sales.state';

@Component({
  selector: 'app-sales',
  imports: [NgApexchartsModule, AgGridAngular, FiltersBoxComponent, AsyncPipe, NzSkeletonModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {

  private readonly HOST = environment.api === 'test' ? API_TEST_OLD : API_PROD_OLD;


  filterGroups: IFiltersBox[][] = [];

  salesGridOptions: GridOptions = {
    context: { componentParent: this },
    enableCellTextSelection: true,
  };

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

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _filterBuilder = inject(FilterBuilderService);
  private readonly _dateRangeService = inject(GlobalDateRangeService);
  private readonly _shopId = inject(Store).selectSnapshot(MainState.selectedShop)?.id;

  protected marketplace = inject(MARKETPLACE);
  
  protected gridApi: GridApi | null = null;
  protected rows: ISalesTableItem[] = [];
  protected summaryRow: Partial<ISalesTableItem>[] = [];

  protected filterModel: FilterModel | null | undefined = null;

  chart$ = this._store.select(ProductAnalyticsSalesState.chart);
  table$ = this._store.select(ProductAnalyticsSalesState.table);

  isChartloading$ = this._store.select(ProductAnalyticsSalesState.isChartLoading);
  isTableLoading$ = this._store.select(ProductAnalyticsSalesState.isTableLoading);
  
  chartOptions = signal<Partial<ApexOptions> | null>(null);
  rowData = signal<ISalesTableItem[]>([]);
  columnDefs = signal<ColDef<ISalesTableItem>[]>([]);

  protected DEFAULT_PARAMS: Record<string, string[] | string | number | boolean> = 
  this.marketplace() === Marketplace.WB
    ? {
        "barcodes":[],
        "warehouses":[],
        "categories":[],
        "subjects":[],
        "tags":[],
        "grouping":"article",
        "type":"2",
        "dateType":1,
      }
    : {
        "barcodes":[],
        "categories":[],
        "myStatus":[],
        "brands":[],
        "grouping":"size",
        "type":"2",
        "dateType":1,
      }

  ngOnInit(): void {

    if(this.marketplace() === Marketplace.WB) {
      this._store.dispatch([
        new GetSalesNmids({method: 'POST', endpoint: 'data', action: 'getSalesNm', host: this.HOST, params: {...this.DEFAULT_PARAMS, shop_id: this._shopId} }),
        new GetSalesCategories({method: 'POST', endpoint: 'data', action: 'getSalesCategory', host: this.HOST, params: {...this.DEFAULT_PARAMS, shop_id: this._shopId} }),
        new GetSalesWareHouses({method: 'POST', endpoint: 'data', action: 'getSalesWh', host: this.HOST, params: {...this.DEFAULT_PARAMS, shop_id: this._shopId} }),
        new GetSalesSubjects({method: 'POST', endpoint: 'data', action: 'getSalesSubject', host: this.HOST, params: {...this.DEFAULT_PARAMS, shop_id: this._shopId} })
      ])
    }
    else {
      this._store.dispatch([
        new GetSalesNmids({method: 'POST', endpoint: 'data', action: 'getSalesNm', host: this.HOST, params: {...this.DEFAULT_PARAMS, shop_id: this._shopId} }),
        new GetSalesCategories({method: 'POST', endpoint: 'data', action: 'getSalesCategory', host: this.HOST, params: {...this.DEFAULT_PARAMS, shop_id: this._shopId} }),
      ])
    }


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
  
        this._store.dispatch([
          new LoadChart({ method: 'POST', endpoint: 'sales/chart', params }),
          new LoadTable({ method: 'POST', endpoint: 'sales/table', params }),
        ])
  
      })


    const filters$ = this.marketplace() === Marketplace.WB
      ? [
          this._store.select(ProductAnalyticsSalesState.goods),
          this._store.select(ProductAnalyticsSalesState.wareHouses),
          this._store.select(ProductAnalyticsSalesState.categories),
          this._store.select(ProductAnalyticsSalesState.subjects),
          this._store.select(MainState.subjects),
        ]
      : [
          this._store.select(ProductAnalyticsSalesState.goods),
          this._store.select(ProductAnalyticsSalesState.categories),
          this._store.select(MainState.statuses),
          this._store.select(MainState.brands),
        ]

    const FILTERS = this.marketplace() === Marketplace.WB ? SALES_FILTERS_WB : SALES_FILTERS_OZON;

    combineLatest(filters$)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this.filterGroups = this._filterBuilder.build(FILTERS));


    this.chart$.pipe(takeUntilDestroyed(this._destroyRef), filter(chart => !!chart))
      .subscribe(chart => this.chartOptions.set(getChartOptions(chart, '')));

    this.table$.pipe(takeUntilDestroyed(this._destroyRef), filter(table => !!table))
      .subscribe(({table}) => {

        if(this.DEFAULT_PARAMS['type'] === 1){
          this.columnDefs.set(this.selectColumnDefs());
          this.gridApi?.forEachNode((node) => {
            if(node.data.self_buyouts) {
                node.setSelected(true)
            } 
          });
        }
        else {
          this.columnDefs.set(
            generateColumnDefsByDate(table[0], this.marketplace(), false, this.DEFAULT_PARAMS['grouping'] as string)
          )
        }

        this.rowData.set(table);
       
      });
  }

  onGridReady(params: GridReadyEvent): void {
    
    this.gridApi = params.api;

    if(this.filterModel) {

      this.gridApi.setFilterModel(this.filterModel);
  
    }

    this.makeSummary()

  }

  onGridFilterChanged(): void {

    this.filterModel = this.gridApi?.getFilterModel();

    this.makeSummary();
  }

   onFilterChangeEvent(event: Record<string, string[] | string | number | boolean>): void {
  
    const [ startDate, endDate ] = [format(this._dateRangeService.dateRange$.value[0], 'yyyy-MM-dd'),  format(this._dateRangeService.dateRange$.value[1], 'yyyy-MM-dd')];

    this.DEFAULT_PARAMS = this.marketplace() === Marketplace.WB 
    ? {
        "barcodes": event['salesGoods'],
        "warehouses": event['salesWarehouses'],
        "categories": event['salesCategories'],
        "subjects": event['salesSubjects'],
        "tags": event['tags'],
        "grouping": event['grouping'],
        "type": event['type'],
        "dateType": event['dateType'],
      }
    : {
        "barcodes": event['salesGoods'],
        "categories": event['salesCategories'],
        "myStatus": event['myStatus'],
        "brands": event['brands'],
        "grouping": event['grouping'],
        "type": event['type'],
        "dateType": event['dateType'],
      }

    const params = {
      startDate,
      endDate,
      ...this.DEFAULT_PARAMS
    }


    this._store.dispatch([
      new LoadChart({ method: 'POST', endpoint: 'sales/chart', params }),
      new LoadTable({ method: 'POST', endpoint: 'sales/table', params }),
    ])
  }

  private selectColumnDefs(): ColDef[] {
  
    if(this.marketplace() === Marketplace.WB) {
      return SALES_TABLE_COLUMN_DEFS_WB
    }
    else if(this.marketplace() === Marketplace.OZON){
      return  SALES_TABLE_COLUMN_DEFS_OZON
    }
    else{
      return  SALES_TABLE_COLUMN_DEFS_YA
    }

  }

  private makeSummary(): void {
    this.rows = [];

    if (this.gridApi) {
      this.gridApi.forEachNodeAfterFilter((node) => {
        this.rows.push(node.data);
      });
    } else {
      this.rows = [...this.rowData()];
    }

    this.summaryRow = generateSummary(this.rows, this.DEFAULT_PARAMS['type'] as string, this.columnDefs(), this.marketplace());
  }

}
