import { DecimalPipe } from '@angular/common';
import { PhotoTooltipComponent } from '@ui-kit/photo-tooltip/photo-tooltip.component';
import { ColDef } from 'ag-grid-community';

import { IDdrListItem } from './drr.model';

const decimalPipe = new DecimalPipe('ru-RU');

const percent = 10;

export const DRR_COLUMN_DEFS: ColDef[] = [
  {
    headerName: '',
    headerClass: 'header-centered',
    width: 30,
    cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
    field: 'photo',
    cellRenderer: (params: { data: IDdrListItem }) => {
      const url = params.data.photo
      return `<img style="height: 30px; width: 30px" src=${url} />`;
    },
    tooltipField: 'photo',
    tooltipComponent: PhotoTooltipComponent,
    tooltipComponentParams: {
      photoField: 'photo',
    },
  },
  {
    field: 'date',
    headerName: 'Дата рекламы',
    sort: 'desc',
    sortable: true,
    filter: 'agTextColumnFilter',
    width: 136
  },
  {
    field: 'nmId',
    headerName: 'Артикул МП',
    headerClass: 'header-centered',
    sortable: true,
    filter: 'agTextColumnFilter',
    width: 118,
    cellRenderer: (params: {value: string}) => {
      return `<strong><a href="https://www.wildberries.ru/catalog/${params.value}/detail.aspx?targetUrl=SP" target="blank">${params.value}</a></strong>`
    },
  },
  {
    field: 'sku',
    headerName: 'Артикул поставщика',
    headerClass: 'header-centered',
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    field: 'subject',
    headerName: 'Наименование',
    headerClass: 'header-centered',
    sortable: true,
    filter: 'agTextColumnFilter',
    width: 142
  },
  {
    field: 'orders_count',
    headerName: 'Заказы, шт.',
    headerClass: 'header-centered',
    width: 120,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    field: 'orders_sum',
    headerName: `Заказы, `,
    headerClass: 'header-centered',
    width: 120,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    field: 'updSum',
    headerName: `Реклама затраты, `,
    headerClass: 'header-centered',
    cellStyle: () => {
      return {
        fontWeight: 700
      }
    },
    width: 120,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    field: 'sales_from_orders_sum',
    headerName: `Продажи (из заказанных), `,
    headerClass: 'header-centered',
    width: 120,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    field: 'sales_from_orders_count',
    headerName: 'Продажи (из заказанных), шт',
    headerClass: 'header-centered',
    width: 120,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    field: 'order_price',
    headerName: 'Цена заказа (CPO)',
    headerClass: 'header-centered',
    width: 120,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    field: 'drr',
    headerName: 'ДРР (по заказам), %',
    headerClass: 'header-centered',
    width: 120,
    cellStyle: (params: { data: IDdrListItem, value: number }) => {
      if (!params.value && +params.data.orders_sum <= 0) {
        return { backgroundColor: '#e6babe' };//+
      }
      else if (params.value >= 0 && params.value <= percent) {
        return { backgroundColor: '#bce9de' };//+
      }
      else if (params.value > percent) {
        return { backgroundColor: '#fceed1' };//+
      }
      return null;
    },
    valueFormatter: v => decimalPipe.transform(v.value, '1.1-1') as string,
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'sales_sum_cps',
    headerName: 'Цена продажи (CPS)',
    headerClass: 'header-centered',
    width: 120,
    filter: 'agNumberColumnFilter',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    field: 'drr_sales',
    headerName: 'ДРР (по продажам), %',
    headerClass: 'header-centered',
    width: 120,
    cellStyle: params => {
      if (!params.value && +params.data.orders_sum <= 0) {
        return { backgroundColor: '#e6babe' };//+
      }
      else if (params.value >= 0 && params.value <= percent) {
        return { backgroundColor: '#bce9de' };//+
      }
      else if (params.value > percent) {
        return { backgroundColor: '#fceed1' };//+
      }
      return null;
    },
    valueFormatter: v => decimalPipe.transform(v.value, '1.1-1') as string,
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'advertId',
    headerName: 'Рекламные кампании',
    headerClass: 'header-centered',
    filter: 'agTextColumnFilter',
  },
];