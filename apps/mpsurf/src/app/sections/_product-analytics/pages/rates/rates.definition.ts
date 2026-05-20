import { DecimalPipe } from '@angular/common';
import { PhotoTooltipComponent } from '@ui-kit/photo-tooltip/photo-tooltip.component';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { getCurrencyIcon, NumberSortFunc } from 'app/utils';

const decimalPipe = new DecimalPipe('ru-RU');

export const MAIN_TAB_COLUMN_DEFAULT_DEF = {
  flex: 1,
  minWidth: 20,
  maxWidth: 400,
  resizable: true,
  suppressSizeToFit: true,
  suppressResize: true,
  sortable: true
};

export const MAIN_TAB_COLUMN_DEFS_COMMON: (ColDef | ColGroupDef)[] = [
  {
    field: 'returnsCount',
    headerName: 'Возвраты (шт)',
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    // comparator: NumberSortFunc
  },
  {
    field: 'returnsTotal',
    headerName:`Возвраты (${getCurrencyIcon()})`,
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    //comparator: NumberSortFunc
  },
];

/*
  ************* WB CONFIG ***************
*/
export const WB_MAIN_TAB_COLUMN_DEFS_BY_DATE: (ColDef | ColGroupDef)[] = [
  {
    field: 'date',
    headerName: 'Дата',
    filter: false,
  },
  {
    field: 'ordersCount',
    headerName: 'Заказы (шт)',
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    field: 'ordersTotal',
    headerName: `Заказы (${getCurrencyIcon()})`,
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.ordersTotal), Number(nodeB.data.ordersTotal))

  },
  {
    field: 'cancelsCount',
    headerName: 'Отмены (шт)',
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.cancelsCount), Number(nodeB.data.cancelsCount))
  },
  {
    field: 'cancelsTotal',
    headerName: `Отмены (${getCurrencyIcon()})`,
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.cancelsTotal), Number(nodeB.data.cancelsTotal))
  },
  {
    field: 'salesCount',
    headerName: 'Продажи (шт)',
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.salesCount), Number(nodeB.data.salesCount))

  },
  {
    field: 'salesTotal',
    headerName: `Продажи (${getCurrencyIcon()})`,
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.salesTotal), Number(nodeB.data.salesTotal))
  },
  ...MAIN_TAB_COLUMN_DEFS_COMMON,
];
export const WB_MAIN_TAB_COLUMN_DEFS_BY_PRODUCT: (ColDef | ColGroupDef)[] = [
  {
    headerName: '',
    field: 'photo_new',
    width: 40,
    pinned: 'left',
    cellStyle: {
      paddingLeft: '0px',
      paddingRight: '0px'
    },
    cellRenderer: (params: { data: { photo_new: string | null } }) => {
      if (params.data.photo_new === 'Итого') {
        return 'Итого'
      }
      if (!params.data.photo_new) {
        return `<img style="height: 40px; width: 40px" src="/assets/images/nophoto.jpg" />`
      }
      return `<img style="height: 40px; width: 40px" src=${params.data.photo_new} />`
    },
    tooltipField: 'photo_new',
    tooltipComponent: PhotoTooltipComponent,
    tooltipComponentParams: {
      photoField: 'photo_new',
    },
  },
  {
    field: 'sku',
    headerName: 'Артикул',
    filter: false,
  },
  {
    field: 'ordersCount',
    headerName: 'Заказы (шт)',
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.ordersCount), Number(nodeB.data.ordersCount))
  },
  {
    field: 'ordersTotal',
    headerName: `Заказы (${getCurrencyIcon()})`,
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.ordersTotal), Number(nodeB.data.ordersTotal))
  },
  {
    field: 'cancelsCount',
    headerName: 'Отмены (шт)',
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.cancelsCount), Number(nodeB.data.cancelsCount))
  },
  {
    field: 'cancelsTotal',
    headerName: `Отмены (${getCurrencyIcon()})`,
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.cancelsTotal), Number(nodeB.data.cancelsTotal))
  },
  {
    field: 'salesCount',
    headerName: 'Продажи (шт)',
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.salesCount), Number(nodeB.data.salesCount))
  },
  {
    field: 'salesTotal',
    headerName: `Продажи (${getCurrencyIcon()})`,
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.salesTotal), Number(nodeB.data.salesTotal))
  },
  ...MAIN_TAB_COLUMN_DEFS_COMMON,
];
/*
  ************** OZON CONFIG *************
*/
export const OZON_MAIN_TAB_COLUMN_DEFS_BY_DATE: (ColDef | ColGroupDef)[] = [
  {
    field: 'date',
    headerName: 'Дата',
    filter: false,
    // comparator: DateSortFunc,
    sortable: true
  },
  {
    field: 'salesCount',
    headerName: 'Продажи (шт)',
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.salesCount), Number(nodeB.data.salesCount))
  },
  {
    field: 'salesTotal',
    headerName: `Продажи (${getCurrencyIcon()})`,
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.salesTotal), Number(nodeB.data.salesTotal))
  },
  ...MAIN_TAB_COLUMN_DEFS_COMMON,
];

export const OZON_MAIN_TAB_COLUMN_DEFS_BY_PRODUCT: (ColDef | ColGroupDef)[] = [
  {
    field: 'stockNumber',
    headerName: 'Артикул',
    filter: false,
  },
  {
    field: 'salesCount',
    headerName: 'Продажи (шт)',
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string      ,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.salesCount), Number(nodeB.data.salesCount))
  },
  {
    field: 'salesTotal',
    headerName: `Продажи (${getCurrencyIcon()})`,
    filter: false,
    type: 'rightAligned',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
    comparator: (valueA, valueB, nodeA, nodeB) => NumberSortFunc(Number(nodeA.data.salesTotal), Number(nodeB.data.salesTotal))
  },
  ...MAIN_TAB_COLUMN_DEFS_COMMON,
];