import { DecimalPipe } from '@angular/common';
import { PhotoTooltipComponent } from '@ui-kit/photo-tooltip/photo-tooltip.component';
import { UnitPipe } from '@ui-kit/pipes/unit.pipe';
import { ColDef, ColGroupDef } from 'ag-grid-community';

import { IOrdersTableItem } from './orders.model';

const decimalPipe = new DecimalPipe('ru-RU');
const unitPipe = new UnitPipe();

export const ORDERS_TABLE_COLUMN_DEFS_WB: ColDef<IOrdersTableItem>[] = [
  {
    field: 'photo',
    headerName: '',
    width: 36,
    cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
    pinned: 'left',
    cellRenderer: (params:{ data: IOrdersTableItem }) => {
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
    cellRenderer: (params:{ data: IOrdersTableItem }) => {
      if(params.data.nmID === 'Итого') {
        return `<strong>Итого</strong>`
      }
      return `<strong><a href="https://www.wildberries.ru/catalog/${params.data.nmID}/detail.aspx?targetUrl=SP" target="blank">${params.data.nmID}</a></strong>`
    },
    width: 125,
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
    field: 'order_date',
    headerName: 'Дата заказа',
    width: 120
  },
  {
    field: 'cancel_date',
    headerName: 'Дата отмены',
    width: 120
  },
  {
    field: 'seller_sum',
    headerName: 'Сумма в ценах поставщика',
    width: 120,
    sortable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'rubles'),
    // comparator: NumberSortFunc
  },
  {
    field: 'mp_sum',
    headerName: 'Сумма в ценах МП',
    width: 120,
    sortable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'rubles'),
    // comparator: NumberSortFunc
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
    filter: false,
    width: 120,
    // cellRenderer: BuyoutCheckboxComponent
  },
];

export const ORDERS_TABLE_COLUMN_DEFS_OZON: (ColDef | ColGroupDef)[] = [
  {
    field: 'photo',
    headerName: '',
    width: 36,
    cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
    pinned: 'left',
    cellRenderer: (params:{ data: IOrdersTableItem }) => {
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
    cellRenderer: (params:{ data: IOrdersTableItem }) => {
      if(params.data.nmID === 'Итого') {
        return `<strong>Итого</strong>`
      }
      return `<strong><a href="https://www.ozon.ru/product/${params.data.nmID}" target="blank">${params.data.nmID}</a></strong>`
    },
    width: 125,
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
    field: 'order_date',
    headerName: 'Дата заказа',
    width: 120
  },
  {
    field: 'cancel_date',
    headerName: 'Дата отмены',
    width: 120
  },
  {
    field: 'seller_sum',
    headerName: 'Сумма в ценах поставщика',
    width: 120,
    sortable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'rubles'),
    // comparator: NumberSortFunc
  },
  {
    field: 'mp_sum',
    headerName: 'Сумма в ценах МП',
    width: 120,
    sortable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'rubles'),
    // comparator: NumberSortFunc
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
    filter: false,
    width: 120,
    // cellRenderer: BuyoutCheckboxComponent
  },
];

export const ORDERS_TABLE_COLUMN_DEFS_YA: (ColDef | ColGroupDef)[] = [
  {
    field: 'photo',
    headerName: '',
    width: 36,
    cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
    pinned: 'left',
    cellRenderer: (params:{ data: IOrdersTableItem }) => {
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
    cellRenderer: (params:{ data: IOrdersTableItem }) => {
      if(params.data.nmID === 'Итого') {
        return `<strong>Итого</strong>`
      }
      return `<strong><a href="https://www.ozon.ru/product/${params.data.nmID}" target="blank">${params.data.nmID}</a></strong>`
    },
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
    field: 'productName',
    headerName: 'Наименование товара',
    filter: 'agTextColumnFilter',
    width: 110,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'order_date',
    headerName: 'Дата заказа',
    filter: 'agTextColumnFilter',
    width: 135,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'productCost',
    headerName: 'Стоимость товара',
    filter: 'agTextColumnFilter',
    width: 160,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'subsidy',
    headerName: 'Вознаграждение продавцу',
    filter: 'agTextColumnFilter',
    width: 160,
    cellStyle: { textAlign: 'left' },
  },

  {
    field: 'cashback',
    headerName: 'Кешбэк',
    filter: 'agTextColumnFilter',
    width: 160,
    cellStyle: { textAlign: 'left' },
  },
  {
    field: 'vat',
    headerName: 'НДС',
    filter: 'agTextColumnFilter',
    width: 160,
    cellStyle: { textAlign: 'left' },
  },

  {
    field: 'campaignId',
    headerName: 'Идентификатор магазина',
    filter: 'agTextColumnFilter',
    width: 160,
    cellStyle: { textAlign: 'left' },
  },

  {
    field: 'programType',
    headerName: 'Способ доставки',
    filter: 'agTextColumnFilter',
    width: 160,
    cellStyle: { textAlign: 'left' },
  },

  {
    field: 'orderId',
    headerName: '№ заказа',
    filter: 'agTextColumnFilter',
    width: 160,
    cellStyle: { textAlign: 'left' },
  },

  {
    field: 'cancelled',
    headerName: 'Отмена',
    filter: 'agTextColumnFilter',
    width: 160,
    cellStyle: { textAlign: 'left' },
    valueFormatter: (params) => params.value == 1 ? "Да" : "Нет"
  },

];