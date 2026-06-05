import { DecimalPipe } from "@angular/common";
import { PhotoTooltipComponent } from "@ui-kit/photo-tooltip/photo-tooltip.component";
import { UnitPipe } from "@ui-kit/pipes/unit.pipe";
import { ColDef, ColGroupDef } from "ag-grid-community";

import { ISalesTableItem } from "./sales.model";


const decimalPipe = new DecimalPipe('ru-RU');
const unitPipe = new UnitPipe();

export const SALES_TABLE_COLUMN_DEFS_WB: ColDef<ISalesTableItem>[] = [
  {
    field: 'photo',
    headerName: '',
    width: 36,
    cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
    pinned: 'left',
    cellRenderer: (params:{ data: ISalesTableItem }) => {
      if(params.data.photo === 'empty'){
        return ''
      }
      if(!params.data.photo){
        return `<img style="height: 36px; width: 36px" src="/assets/images/nophoto.jpg" />`
      }
      return `<img style="height: 36px; width: 36px" src=${params.data.photo} />`
    },
    tooltipField: 'photo',
    tooltipComponent: PhotoTooltipComponent,
    tooltipComponentParams: {
      photoField: 'photo',
    },
  },
  {
    field: 'nmID',
    headerName: 'Артикул МП',
    filter: 'agTextColumnFilter',
    width: 125,
    cellRenderer: (params:{ data: ISalesTableItem }) => {
      if(params.data.nmID === 'Итого') {
        return `<strong>Итого</strong>`
      }
      return `<strong><a href="https://www.wildberries.ru/catalog/${params.data.nmID}/detail.aspx?targetUrl=SP" target="blank">${params.data.nmID}</a></strong>`
    },
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'subject',
    headerName: 'Предмет',
    filter: 'agTextColumnFilter',
    width: 110,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'barcode',
    headerName: 'Баркод',
    filter: 'agTextColumnFilter',
    width: 135,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'supplierArticle',
    headerName: 'Артикул поставщика',
    filter: 'agTextColumnFilter',
    width: 160,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'size',
    headerName: 'Размер',
    filter: 'agNumberColumnFilter',
    width: 80,
  },
  {
    field: 'sale_date',
    headerName: 'Дата продажи',
    width: 120
  },
  {
    field: 'return_date',
    headerName: 'Дата возврата',
    width: 120
  },
  {
    field: 'seller_sum',
    headerName: 'Сумма в ценах поставщика',
    width: 120,
    sortable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'rubles'),
    // comparator: numberComparator
  },
  {
    field: 'mp_sum',
    headerName: 'Сумма в ценах МП',
    width: 120,
    sortable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'rubles'),
    // comparator: numberComparator
  },
  {
    field: 'spp',
    headerName: 'СПП',
    width: 120,
    sortable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
  },
  {
    field: 'forPay',
    headerName: 'К перечислению',
    width: 120,
    sortable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'rubles'),
    // comparator: numberComparator
  },
  {
    field: 'warehouseName',
    headerName: 'Склад',
    width: 120,
    sortable: true,
    filter: 'agTextColumnFilter',
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'regionName',
    headerName: 'Регион доставки',
    width: 120,
    sortable: true,
    filter: 'agTextColumnFilter',
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'delivery_type',
    headerName: 'Способ доставки',
    width: 120,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    field: 'orderType',
    headerName: 'Тип операции',
    width: 120,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    field: 'srid',
    headerName: '№ операции',
    width: 120,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    field: 'self_buyouts',
    headerName: 'СМВ',
    width: 120,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
];

export const SALES_TABLE_COLUMN_DEFS_OZON: (ColDef | ColGroupDef)[] = [
  {
    field: 'photo',
    headerName: '',
    width: 36,
    cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
    pinned: 'left',
    cellRenderer: (params:{ data: ISalesTableItem }) => {
      if(params.data.photo === 'empty'){
        return ''
      }
      if(!params.data.photo){
        return `<img style="height: 36px; width: 36px" src="/assets/images/nophoto.jpg" />`
      }
      return `<img style="height: 36px; width: 36px" src=${params.data.photo} />`
    },
    tooltipField: 'photo',
    tooltipComponent: PhotoTooltipComponent,
    tooltipComponentParams: {
      photoField: 'photo',
    },
  },
  {
    field: 'nmID',
    headerName: 'Артикул МП',
    filter: 'agTextColumnFilter',
    width: 125,
    cellRenderer: (params:{ data: ISalesTableItem }) => {
      if(params.data.nmID === 'Итого') {
        return `<strong>Итого</strong>`
      }
      return `<strong><a href="https://www.ozon.ru/product/${params.data.nmID}" target="blank">${params.data.nmID}</a></strong>`
    },
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'subject',
    headerName: 'Предмет',
    filter: 'agTextColumnFilter',
    width: 110,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'barcode',
    headerName: 'Баркод',
    filter: 'agTextColumnFilter',
    width: 135,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'supplierArticle',
    headerName: 'Артикул поставщика',
    filter: 'agTextColumnFilter',
    width: 160,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'sale_date',
    headerName: 'Дата продажи',
    width: 120
  },
  {
    field: 'return_date',
    headerName: 'Дата возврата',
    width: 120
  },
  {
    field: 'seller_sum',
    headerName: 'Сумма в ценах поставщика',
    width: 120,
    sortable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'rubles'),
    // comparator: numberComparator
  },
  {
    field: 'mp_sum',
    headerName: 'Сумма в ценах МП',
    width: 120,
    sortable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'rubles'),
    // comparator: numberComparator
  },
  {
    field: 'warehouseName',
    headerName: 'Склад',
    width: 120,
    sortable: true,
    filter: 'agTextColumnFilter',
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'regionName',
    headerName: 'Регион доставки',
    width: 120,
    sortable: true,
    filter: 'agTextColumnFilter',
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'delivery_type',
    headerName: 'Способ доставки',
    width: 120,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    field: 'srid',
    headerName: '№ операции',
    width: 120,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    field: 'self_buyouts',
    headerName: 'СМВ',
    width: 120,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
];

export const SALES_TABLE_COLUMN_DEFS_YA: (ColDef | ColGroupDef)[] = [
  {
    field: 'photo',
    headerName: '',
    width: 36,
    cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
    pinned: 'left',
    cellRenderer: (params:{ data: ISalesTableItem }) => {
      if(params.data.photo === 'empty'){
        return ''
      }
      if(!params.data.photo){
        return `<img style="height: 36px; width: 36px" src="/assets/images/nophoto.jpg" />`
      }
      return `<img style="height: 36px; width: 36px" src=${params.data.photo} />`
    },
    tooltipField: 'photo',
    tooltipComponent: PhotoTooltipComponent,
    tooltipComponentParams: {
      photoField: 'photo',
    },
  },
  {
    field: 'nmId',
    headerName: 'Артикул МП',
    filter: 'agTextColumnFilter',
    width: 125,
    cellStyle: { textAlign: 'left' },
  },

  {
    field: 'subject',
    headerName: 'Предмет',
    filter: 'agTextColumnFilter',
    width: 125,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'supplierArticle',
    headerName: 'Артикул поставщика',
    filter: 'agTextColumnFilter',
    width: 110,
    cellStyle: { textAlign: 'left' },
  },

  {
    field: 'barcode',
    headerName: 'Баркод',
    filter: 'agTextColumnFilter',
    width: 110,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'productName',
    headerName: 'Наименование предмета',
    filter: 'agTextColumnFilter',
    width: 180,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'size',
    headerName: 'Размер',
    filter: 'agTextColumnFilter',
    width: 110,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'sale_date',
    headerName: 'Дата продажи',
    filter: 'agTextColumnFilter',
    width: 140,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'return_date',
    headerName: 'Дата возврата',
    filter: 'agTextColumnFilter',
    width: 140,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'mp_sum',
    headerName: 'Сумма в ценах МП',
    filter: 'agTextColumnFilter',
    width: 110,
    cellStyle: { textAlign: 'left' },
  },

  {
    field: 'regionName',
    headerName: 'Регион доставки',
    filter: 'agTextColumnFilter',
    width: 180,
    cellStyle: { textAlign: 'left' },
  },
];

