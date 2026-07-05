import { DecimalPipe } from '@angular/common';
import { PhotoTooltipComponent } from '@ui-kit/photo-tooltip/photo-tooltip.component';
import { UnitPipe } from '@ui-kit/pipes/unit.pipe';
import { ColDef } from 'ag-grid-community';


const decimalPipe = new DecimalPipe('ru-RU')
const unitPipe = new UnitPipe()

export const SEBES_COL_DEF: ColDef[] = [
  {
    headerName: 'Баркод',
    field: 'Barcode',
    sortable: true,
    resizable: true,
    width: 40,
  },
  {
    headerName: 'Размер',
    field: 'techSize',
    sortable: true,
    resizable: true,
    width: 40,
  },
  {
    headerName: `Закупка / производство, руб`,
    field: 'cost_price',
    cellEditor: 'agTextCellEditor',
    editable: true,
    valueFormatter: params => '✎ ' + (params.value || ''),
    sortable: true,
    resizable: true,
    width: 40,
  },
  {
    headerName: `Доп. расходы, руб`,
    field: 'other_deductions',
    cellEditor: 'agTextCellEditor',
    editable: true,
    valueFormatter: params => '✎ ' + (params.value || ''),
    sortable: true,
    resizable: true,
    width: 40,
  },
];

export const SEBES_COL_DEF2: ColDef[] = [
  {
    headerName: 'Дата расчета себестоимости',
    field: 'date',
    sortable: true,
    resizable: true,
    flex: 1
  },
  {
    headerName: `Закупка / производство, руб`,
    field: 'cost_price',
    cellEditor: 'agTextCellEditor',
    editable: true,
    valueFormatter: params => '✎ ' + (params.value || ''),
    sortable: true,
    resizable: true,
    flex: 1
  },
  {
    headerName: `Доп. расходы, руб`,
    field: 'other_deductions',
    cellEditor: 'agTextCellEditor',
    editable: true,
    valueFormatter: params => '✎ ' + (params.value || ''),
    sortable: true,
    resizable: true,
    flex: 1
  },
  {
    sortable: false,
    filter: false,
    headerName: '',
    width: 40,
    cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
  },
]

export const PRODUCTS_COLUMN_DEFS_SALES_ONINIT: ColDef[] = [
  {
    headerName: '',
    field: 'photo_new',
    sortable: true,
    resizable: true,
    width: 40,
    filter: false,
    suppressSizeToFit: true,
    flex: 0,
    cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
    cellRenderer: (params:{ data: { photo_new: string } }) => {
      if(params.data.photo_new === 'empty'){
        return ''
      }
      if(!params.data.photo_new){
        return `<img style="height: 36px; width: 36px" src="/assets/images/nophoto.jpg" />`
      }
      return `<img style="height: 36px; width: 36px" src=${params.data.photo_new} />`
    },
    tooltipField: 'photo_new',
    tooltipComponent: PhotoTooltipComponent,
    tooltipComponentParams: {
      photoField: 'photo_new',
    },
  },
  {
    headerName: 'Артикул МП',
    field: 'nmid',
    // cellRenderer: WBProductsLinkEmitter,
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    filter: 'agTextColumnFilter',
    suppressSizeToFit: true,
    flex: 0,
  },
  {
    headerName: 'Баркод',
    field: 'Barcode',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    filter: 'agTextColumnFilter',
    suppressSizeToFit: true,
    flex: 0,
  },
  {
    headerName: 'Артикул поставщика',
    field: 'SKU',
    floatingFilter: true,
    valueGetter: (params) => {
      return params.data.SKU;
    },
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    width: 150,
    flex: 0
  },
  {
    headerName: 'Размер',
    field: 'techSize',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 100,
    filter: 'agTextColumnFilter',
    suppressSizeToFit: true,
    flex: 0,
    cellClass: ['d-flex', 'justify-content-center', 'align-items-center'],
  },
  {
    headerName: 'Цвета',
    field: 'colors',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    filter: true,
    suppressSizeToFit: true,
    flex: 0,
  },
  {
    headerName: 'Категория МП',
    field: 'category',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    filter: true,
    suppressSizeToFit: true,
    flex: 0,
  },
  {
    headerName: 'Предмет',
    field: 'subject',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    filter: true,
    suppressSizeToFit: true,
    flex: 0,
  },
  {
    headerName: 'Бренд',
    field: 'brand',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    wrapText: true,
    filter: 'agTextColumnFilter',
    flex: 0
  },
  {
    headerName: 'Себестоимость (общая)',
    field: 'sebes',
    floatingFilter: true,
    width: 180,
    sortable: true,
    filter: true,
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.2-2'), 'rubles'),
    wrapHeaderText: true,
    autoHeaderHeight: true,
    flex: 0,
    cellStyle: {
      fontWeight: '600'
    }
  },
  {
    headerName: 'Себестоимость закупки',
    field: 'cost_price',
    floatingFilter: true,
    width: 180,
    sortable: true,
    filter: true,
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.2-2'), 'rubles'),
    wrapHeaderText: true,
    autoHeaderHeight: true,
    flex: 0,
  },
  {
    headerName: 'Себестоимость доп. расходов',
    field: 'other_deductions',
    floatingFilter: true,
    width: 180,
    sortable: true,
    filter: true,
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.2-2'), 'rubles'),
    wrapHeaderText: true,
    autoHeaderHeight: true,
    flex: 0,
  },
  {
    headerName: '',
    flex: 0,
    cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
  },
  {
    headerName: 'Статус',
    field: 'status_name',
    floatingFilter: true,
    editable: true,
    sortable: true,
    resizable: true,
    cellStyle: { background: '#f0f3f5' },
    valueFormatter: params => '✎ ' + (params.value || ''),
    width: 150,
    flex: 0,
    filter: true,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: [],
    },
  },
  {
    headerName: 'Категория собственная',
    field: 'category_pnl',
    floatingFilter: true,
    sortable: false,
    resizable: true,
    width: 150,
    filter: true,
    suppressSizeToFit: true,
    editable: true,
    cellStyle: { background: '#f0f3f5' },
    valueFormatter: params => '✎ ' + (params.value || ''),
    flex: 0,
  },
  // {
  //   headerName: 'Дата последней продажи',
  //   field: 'last_sale',
  //   floatingFilter: true,
  //   sortable: true,
  //   resizable: true,
  //   width: 150,
  //   filter: true,
  //   filterParams: FILTER_PARAMS_TEXT,
  //   suppressSizeToFit: true,
  //   flex: 0,
  //   cellClass: CELL_CLASS_LEFT,
  // },
  // {
  //   headerName: 'Доступно на FBO',
  //   field: 'quantity',
  //   floatingFilter: true,
  //   sortable: true,
  //   resizable: true,
  //   width: 150,
  //   filter: true,
  //   filterParams: FILTER_PARAMS_TEXT,
  //   suppressSizeToFit: true,
  //   flex: 0,
  //   cellClass: CELL_CLASS,
  // },
  {
    headerName: 'Кабинет',
    field: 'shop_name',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    filter: true,
    suppressSizeToFit: true,
    flex: 0,
  },
];

export const PRODUCTS_COLUMN_DEFS_SALES_ONINIT_WB: ColDef[] = [
  {
    headerName: '',
    field: 'photo_new',
    sortable: true,
    resizable: true,
    width: 40,
    filter: false,
    suppressSizeToFit: true,
    flex: 0,
    cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
    cellRenderer: (params:{ data: { photo_new: string } }) => {
      if(params.data.photo_new === 'empty'){
        return ''
      }
      if(!params.data.photo_new){
        return `<img style="height: 36px; width: 36px" src="/assets/images/nophoto.jpg" />`
      }
      return `<img style="height: 36px; width: 36px" src=${params.data.photo_new} />`
    },
    tooltipField: 'photo_new',
    tooltipComponent: PhotoTooltipComponent,
    tooltipComponentParams: {
      photoField: 'photo_new',
    },
  },
  {
    headerName: 'Артикул МП',
    field: 'nmid',
    // cellRenderer: WBProductsLinkEmitter,
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    filter: 'agTextColumnFilter',
    suppressSizeToFit: true,
    flex: 0,
  },
  {
    headerName: 'Баркод',
    field: 'Barcode',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    filter: 'agTextColumnFilter',
    suppressSizeToFit: true,
    flex: 0,
  },
  {
    headerName: 'Артикул поставщика',
    field: 'SKU',
    floatingFilter: true,
    valueGetter: (params) => {
      return params.data.SKU;
    },
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    width: 150,
    flex: 0
  },
  {
    headerName: 'Размер',
    field: 'techSize',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 100,
    filter: 'agTextColumnFilter',
    suppressSizeToFit: true,
    flex: 0,
    cellClass: ['d-flex', 'justify-content-center', 'align-items-center'],
  },
  {
    headerName: 'Цвета',
    field: 'colors',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    filter: true,
    suppressSizeToFit: true,
    flex: 0,
  },
  {
    headerName: 'Категория МП',
    field: 'category',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    filter: true,
    suppressSizeToFit: true,
    flex: 0,
  },
  {
    headerName: 'Предмет',
    field: 'subject',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    filter: true,
    suppressSizeToFit: true,
    flex: 0,
  },
  {
    headerName: 'Бренд',
    field: 'brand',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    wrapText: true,
    filter: 'agTextColumnFilter',
    flex: 0
  },
  {
    headerName: 'Ярлык',
    field: 'tags',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    wrapText: true,
    filter: 'agTextColumnFilter',
    flex: 0
  },
  {
    headerName: 'Себестоимость (общая)',
    field: 'sebes',
    floatingFilter: true,
    width: 180,
    sortable: true,
    filter: true,
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.2-2'), 'rubles'),
    wrapHeaderText: true,
    autoHeaderHeight: true,
    flex: 0,
    cellStyle: {
      fontWeight: '600'
    }
  },
  {
    headerName: 'Себестоимость закупки',
    field: 'cost_price',
    floatingFilter: true,
    width: 180,
    sortable: true,
    filter: true,
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.2-2'), 'rubles'),
    wrapHeaderText: true,
    autoHeaderHeight: true,
    flex: 0,
  },
  {
    headerName: 'Себестоимость доп. расходов',
    field: 'other_deductions',
    floatingFilter: true,
    width: 180,
    sortable: true,
    filter: true,
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.2-2'), 'rubles'),
    wrapHeaderText: true,
    autoHeaderHeight: true,
    flex: 0,
  },
  {
    headerName: '',
    flex: 0,
    cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
  },
  {
    headerName: 'Статус',
    field: 'status_name',
    floatingFilter: true,
    editable: true,
    sortable: true,
    resizable: true,
    cellStyle: { background: '#f0f3f5' },
    valueFormatter: params => '✎ ' + (params.value || ''),
    width: 150,
    flex: 0,
    filter: true,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: [],
    },
  },
  {
    headerName: 'Категория собственная',
    field: 'category_pnl',
    floatingFilter: true,
    sortable: false,
    resizable: true,
    width: 150,
    filter: true,
    suppressSizeToFit: true,
    editable: true,
    cellStyle: { background: '#f0f3f5' },
    valueFormatter: params => '✎ ' + (params.value || ''),
    flex: 0,
  },
  // {
  //   headerName: 'Дата последней продажи',
  //   field: 'last_sale',
  //   floatingFilter: true,
  //   sortable: true,
  //   resizable: true,
  //   width: 150,
  //   filter: true,
  //   filterParams: FILTER_PARAMS_TEXT,
  //   suppressSizeToFit: true,
  //   flex: 0,
  //   cellClass: CELL_CLASS_LEFT,
  // },
  // {
  //   headerName: 'Доступно на FBO',
  //   field: 'quantity',
  //   floatingFilter: true,
  //   sortable: true,
  //   resizable: true,
  //   width: 150,
  //   filter: true,
  //   filterParams: FILTER_PARAMS_TEXT,
  //   suppressSizeToFit: true,
  //   flex: 0,
  //   cellClass: CELL_CLASS,
  // },
  {
    headerName: 'Кабинет',
    field: 'shop_name',
    floatingFilter: true,
    sortable: true,
    resizable: true,
    width: 150,
    filter: true,
    suppressSizeToFit: true,
    flex: 0,
  },
];


export function generateColumnDefs(isOzon: boolean): ColDef[] {

  if (isOzon) {
    return PRODUCTS_COLUMN_DEFS_SALES_ONINIT
  }
  return PRODUCTS_COLUMN_DEFS_SALES_ONINIT_WB

}
