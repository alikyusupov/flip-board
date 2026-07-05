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
import { combineLatest, filter } from 'rxjs';

import { GetOrdersCategories, GetOrdersNmids, GetOrdersSubjects, GetOrdersWareHouses, LoadChart, LoadTable } from './orders.actions';
import { getChartOptions } from './orders.chart';
import { ORDERS_TABLE_COLUMN_DEFS_OZON, ORDERS_TABLE_COLUMN_DEFS_WB, ORDERS_TABLE_COLUMN_DEFS_YA } from './orders.definition';
import { ORDERS_FILTERS_OZON, ORDERS_FILTERS_WB } from './orders.filters';
import { generateColumnDefsByDate, generateSummary } from './orders.func';
import { IOrdersTableItem } from './orders.model';
import { ProductAnalyticsOrdersState } from './orders.state';

@Component({
  selector: 'app-orders',
  imports: [NgApexchartsModule, AgGridAngular, FiltersBoxComponent, AsyncPipe, NzSkeletonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

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
  protected rows: IOrdersTableItem[] = [];
  protected summaryRow: Partial<IOrdersTableItem>[] = [];

  protected filterModel: FilterModel | null | undefined = null;

  chart$ = this._store.select(ProductAnalyticsOrdersState.chart);
  table$ = this._store.select(ProductAnalyticsOrdersState.table);

  isChartloading$ = this._store.select(ProductAnalyticsOrdersState.isChartLoading);
  isTableLoading$ = this._store.select(ProductAnalyticsOrdersState.isTableLoading);

  chartOptions = signal<Partial<ApexOptions> | null>(null);
  rowData = signal<IOrdersTableItem[]>([]);
  columnDefs = signal<ColDef[]>([]);

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
        new GetOrdersNmids({method: 'POST', endpoint: 'data', action: 'getOrdersNm', host: this.HOST, params: {...this.DEFAULT_PARAMS, shop_id: this._shopId} }),
        new GetOrdersCategories({method: 'POST', endpoint: 'data', action: 'getOrdersCategory', host: this.HOST, params: {...this.DEFAULT_PARAMS, shop_id: this._shopId} }),
        new GetOrdersWareHouses({method: 'POST', endpoint: 'data', action: 'getOrdersWh', host: this.HOST, params: {...this.DEFAULT_PARAMS, shop_id: this._shopId} }),
        new GetOrdersSubjects({method: 'POST', endpoint: 'data', action: 'getOrdersSubject', host: this.HOST, params: {...this.DEFAULT_PARAMS, shop_id: this._shopId} }),
      ])
    }
    else {
      this._store.dispatch([
        new GetOrdersNmids({method: 'POST', endpoint: 'data', action: 'getOrdersNm', host: this.HOST, params: {...this.DEFAULT_PARAMS, shop_id: this._shopId} }),
        new GetOrdersCategories({method: 'POST', endpoint: 'data', action: 'getOrdersCategory', host: this.HOST, params: {...this.DEFAULT_PARAMS, shop_id: this._shopId} }),
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
          new LoadTable({method: 'POST', endpoint: 'orders/table', params }),
          new LoadChart({method: 'POST', endpoint: 'orders/chart', params }),
        ])
  
      })

    const filters$ = this.marketplace() === Marketplace.WB
      ? [
          this._store.select(ProductAnalyticsOrdersState.goods),
          this._store.select(ProductAnalyticsOrdersState.wareHouses),
          this._store.select(ProductAnalyticsOrdersState.categories),
          this._store.select(ProductAnalyticsOrdersState.subjects),
          this._store.select(MainState.subjects),
        ]
      : [
          this._store.select(ProductAnalyticsOrdersState.goods),
          this._store.select(ProductAnalyticsOrdersState.categories),
          this._store.select(MainState.statuses),
          this._store.select(MainState.brands),
        ]
    
    const FILTERS = this.marketplace() === Marketplace.WB ? ORDERS_FILTERS_WB : ORDERS_FILTERS_OZON;

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
        "barcodes": event['ordersGoods'],
        "warehouses": event['ordersWarehouses'],
        "categories": event['ordersCategories'],
        "subjects": event['ordersSubjects'],
        "tags": event['tags'],
        "grouping": event['grouping'],
        "type": event['type'],
        "dateType": event['dateType'],
      }
    : {
        "barcodes": event['ordersGoods'],
        "categories": event['ordersCategories'],
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
      new LoadTable({method: 'POST', endpoint: 'orders/table', params }),
      new LoadChart({method: 'POST', endpoint: 'orders/chart', params }),
    ])
  }

  private selectColumnDefs(): ColDef[] {

    if(this.marketplace() === Marketplace.WB) {
      return ORDERS_TABLE_COLUMN_DEFS_WB
    }
    else if(this.marketplace() === Marketplace.OZON){
      return  ORDERS_TABLE_COLUMN_DEFS_OZON
    }
    else{
      return  ORDERS_TABLE_COLUMN_DEFS_YA
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
