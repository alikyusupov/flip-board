/* eslint-disable @typescript-eslint/array-type */
import { DecimalPipe } from '@angular/common';
import { Marketplace } from '@models';
import { PhotoTooltipComponent } from '@ui-kit/photo-tooltip/photo-tooltip.component';
import { UnitPipe } from '@ui-kit/pipes/unit.pipe';
import { ColDef, ColGroupDef } from 'ag-grid-community';

import { ORDERS_TABLE_COLUMN_DEFS_OZON, ORDERS_TABLE_COLUMN_DEFS_WB } from './orders.definition';
import { IOrdersTableItem } from './orders.model';

const decimalPipe = new DecimalPipe('ru-RU');
const unitPipe = new UnitPipe();
interface OrderMetric  { order_sum: string | number, order_count: string | number };
const DEFAULT_RIGHT_STYLE = { textAlign: 'right', backgroundColor: 'transparent' };

function isOrderMetric(value: IOrdersTableItem[string]): value is OrderMetric {
  return value !== null && typeof value === 'object' && 'order_sum' in value && 'order_count' in value;
};

function getDateMetricEntries(row: IOrdersTableItem): Array<[string, OrderMetric]> {
  return Object.entries(row).reduce<Array<[string, OrderMetric]>>((acc, [key, value]) => {
    if (key.match(/^\d{2}/) && isOrderMetric(value)) {
      acc.push([key, value]);
    }

    return acc;
  }, []);
};

function getDateMetric(row: IOrdersTableItem, key: string): OrderMetric | undefined {
  const value = row[key];
  if (!isOrderMetric(value)) {
    return undefined;
  }

  return value;
};

export function generateColumnDefsByDate(rowData: IOrdersTableItem | null, marketplace: Marketplace, showInRubles = false, grouping = 'size'): ColDef<IOrdersTableItem>[] {
  if (marketplace !== Marketplace.YANDEX) {
    if (!rowData) return []
    const dates: ColDef[] = Object.entries(rowData)
      .filter(([key,]) => key.match(/^\d{2}/))
      .map(([key,]) => {
        return {
          field: key,
          headerName: key,
          width: 150,
          type: 'rightAligned',
          cellStyle: params => {
            const metric = getDateMetric(params.data, key);

            if (params.data.photo === 'empty') {
              return DEFAULT_RIGHT_STYLE
            }

            if (!metric) {
              return DEFAULT_RIGHT_STYLE
            }

            if (showInRubles) {
              if (metric.order_sum === 0) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(192, 192, 192)'
                }
              }
              else if (+metric.order_sum < 5000) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(235, 246, 185)'
                }
              }
              else if (+metric.order_sum < 10000) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(230, 244, 180)'
                }
              }
              else if (+metric.order_sum < 20000) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(220, 237, 165)'
                }
              }
              else if (+metric.order_sum < 35000) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(210, 230, 150)'
                }
              }
              else if (+metric.order_sum < 50000) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(195, 222, 135)'
                }
              }
              else {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(163, 211, 119)'
                }
              }
            }
            else {
              if (metric.order_count === 0) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(192, 192, 192)'
                }
              }
              else if (+metric.order_count < 10) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(235, 246, 185)'
                }
              }
              else if (+metric.order_count < 20) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(230, 244, 180)'
                }
              }
              else if (+metric.order_count < 30) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(220, 237, 165)'
                }
              }
              else if (+metric.order_count < 50) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(210, 230, 150)'
                }
              }
              else if (+metric.order_count < 90) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(195, 222, 135)'
                }
              }
              else {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(163, 211, 119)'
                }
              }
            }
          },
          cellRenderer: (params: { data: IOrdersTableItem }) => {
            if (params.data[key] && typeof params.data[key] !== 'string') {
              return showInRubles
                ? `${unitPipe.transform(decimalPipe.transform(params.data[key].order_sum, '1.0-1'), 'rubles')}`
                : `${unitPipe.transform(params.data[key].order_count, 'item')}`
            }
            return null;
          },
          comparator: (valueA, valueB, nodeA, nodeB) => {
            const a = nodeA.data[key]
            const b = nodeB.data[key]
            if (showInRubles) {
              return Number(a.order_sum) - Number(b.order_sum)
            }
            return Number(a.order_count) - Number(b.order_count)
          },
        }
      })

    const totalColumn: ColDef = {
      field: 'total',
      headerName: 'Итого',
      width: 150,
      type: 'rightAligned',
      cellStyle: {
        textAlign: 'right',
        fontWeight: '700'
      },
      sortable: true,
      cellRenderer: (params: { data: IOrdersTableItem }) => {
        return showInRubles
          ? `${unitPipe.transform(decimalPipe.transform(getDataForTotal(params.data).sum, '1.0-1'), 'rubles')}`
          : `${unitPipe.transform(getDataForTotal(params.data).count, 'item')}`
      },
      comparator: (valueA, valueB, nodeA, nodeB) => {
        let a = 0;
        let b = 0;
        if (showInRubles) {
          a = getDateMetricEntries(nodeA.data).map(([, value]) => +value.order_sum).reduce((acc, curr) => acc + curr, 0)
          b = getDateMetricEntries(nodeB.data).map(([, value]) => +value.order_sum).reduce((acc, curr) => acc + curr, 0)
        } else {
          a = getDateMetricEntries(nodeA.data).map(([, value]) => +value.order_count).reduce((acc, curr) => acc + curr, 0)
          b = getDateMetricEntries(nodeB.data).map(([, value]) => +value.order_count).reduce((acc, curr) => acc + curr, 0)
        }
        return Number(a) - Number(b)
      },
    }

    let CONFIG: ColDef<IOrdersTableItem>[] = [];

    switch (grouping) {
      case 'size':
        CONFIG = [
          ...ORDERS_TABLE_COLUMN_DEFS_WB.slice(0, 5),
          {
            field: 'techSize',
            headerName: 'Размер',
            filter: 'agNumberColumnFilter',
            width: 80,
          },
          totalColumn,
          ...dates
        ]
        break;

      case 'article':
        CONFIG = [
          {
            field: 'photo',
            headerName: '',
            width: 36,
            cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
            pinned: 'left',
            cellRenderer: (params: { data: IOrdersTableItem }) => {
              if (params.data.photo === 'empty') {
                return ''
              }
              if (!params.data.photo) {
                return `<img style="height: 36px; width: 36px" src="/assets/images/nophoto.jpg" />`
              }
              return `<img style="height: 36px; width: 36px" src=${params.data.photo} />`
            },
            tooltipField: 'photo',
            tooltipComponentParams: {
              type: 'success',
              photoField: 'photo', // Field containing the photo information
            },
            tooltipComponent: PhotoTooltipComponent,
          },
          {
            field: 'nmID',
            headerName: 'Артикул МП',
            filter: 'agTextColumnFilter',
            width: 125,
            cellRenderer: (params: { data: IOrdersTableItem }) => {
              if (params.data.nmID === 'Итого') {
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
            field: 'supplierArticle',
            headerName: 'Артикул поставщика',
            filter: 'agTextColumnFilter',
            width: 160,
            cellStyle: { textAlign: 'left' },
          },
          totalColumn,
          ...dates
        ]
        break;

      case 'brand':
        CONFIG = [
          {
            field: 'photo',
            headerName: '',
            width: 36,
            cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
            pinned: 'left',
            cellRenderer: (params: { data: IOrdersTableItem }) => {
              if (params.data.photo === 'empty') {
                return ''
              }
              if (!params.data.photo) {
                return `<img style="height: 36px; width: 36px" src="/assets/images/nophoto.jpg" />`
              }
              return `<img style="height: 36px; width: 36px" src=${params.data.photo} />`
            },
            tooltipField: 'photo',
            tooltipComponentParams: {
              type: 'success',
              photoField: 'photo', // Field containing the photo information
            },
            tooltipComponent: PhotoTooltipComponent,
          },
          {
            field: 'brand',
            headerName: 'Бренд',
            filter: 'agNumberColumnFilter',
            width: 120,
          },
          totalColumn,
          ...dates
        ]
        break;

      case 'subject':
        CONFIG = [
          {
            field: 'photo',
            headerName: '',
            width: 36,
            cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
            pinned: 'left',
            cellRenderer: (params: { data: IOrdersTableItem }) => {
              if (params.data.photo === 'empty') {
                return ''
              }
              if (!params.data.photo) {
                return `<img style="height: 36px; width: 36px" src="/assets/images/nophoto.jpg" />`
              }
              return `<img style="height: 36px; width: 36px" src=${params.data.photo} />`
            },
            tooltipField: 'photo',
            tooltipComponentParams: {
              type: 'success',
              photoField: 'photo', // Field containing the photo information
            },
            tooltipComponent: PhotoTooltipComponent,
          },
          {
            field: 'subject',
            headerName: 'Предмет',
            filter: 'agTextColumnFilter',
            width: 110,
            cellStyle: { textAlign: 'left' },
          },
          totalColumn,
          ...dates
        ]
        break;
      case 'category_pnl':
        CONFIG = [
          {
            field: 'photo',
            headerName: '',
            width: 36,
            cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
            pinned: 'left',
            cellRenderer: (params: { data: IOrdersTableItem }) => {
              if (params.data.photo === 'empty') {
                return ''
              }
              if (!params.data.photo) {
                return `<img style="height: 36px; width: 36px" src="/assets/images/nophoto.jpg" />`
              }
              return `<img style="height: 36px; width: 36px" src=${params.data.photo} />`
            },
            tooltipField: 'photo',
            tooltipComponentParams: {
              type: 'success',
              photoField: 'photo', // Field containing the photo information
            },
            tooltipComponent: PhotoTooltipComponent,
          },
          {
            field: 'category_pnl',
            headerName: 'Категория собственная',
            filter: 'agTextColumnFilter',
            width: 110,
            cellStyle: { textAlign: 'left' },
          },
          totalColumn,
          ...dates
        ]
        break;

      default:
        CONFIG = []
        break;
    }

    if (grouping === 'size') {
      CONFIG[1] = marketplace === Marketplace.OZON ? ORDERS_TABLE_COLUMN_DEFS_OZON[1] : ORDERS_TABLE_COLUMN_DEFS_WB[1]

    }

    return CONFIG
  }
  else {
    if (!rowData) return []
    const dates: (ColDef | ColGroupDef)[] = Object.entries(rowData)
      .filter(([key, ]) => key.match(/^\d{2}/))
      .map(([key, ]) => {
        return {
          field: key,
          headerName: key,
          width: 150,
          type: 'rightAligned',
          cellStyle: params => {
            const metric = getDateMetric(params.data, key);

            if (params.data.photo === 'empty') {
              return DEFAULT_RIGHT_STYLE
            }

            if (!metric) {
              return DEFAULT_RIGHT_STYLE
            }

            if (showInRubles) {
              if (metric.order_sum === 0) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(192, 192, 192)'
                }
              }
              else if (+metric.order_sum < 5000) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(235, 246, 185)'
                }
              }
              else if (+metric.order_sum < 10000) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(230, 244, 180)'
                }
              }
              else if (+metric.order_sum < 20000) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(220, 237, 165)'
                }
              }
              else if (+metric.order_sum < 35000) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(210, 230, 150)'
                }
              }
              else if (+metric.order_sum < 50000) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(195, 222, 135)'
                }
              }
              else {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(163, 211, 119)'
                }
              }
            }
            else {
              if (metric.order_count === 0) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(192, 192, 192)'
                }
              }
              else if (+metric.order_count < 10) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(235, 246, 185)'
                }
              }
              else if (+metric.order_count < 20) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(230, 244, 180)'
                }
              }
              else if (+metric.order_count < 30) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(220, 237, 165)'
                }
              }
              else if (+metric.order_count < 50) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(210, 230, 150)'
                }
              }
              else if (+metric.order_count < 90) {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(195, 222, 135)'
                }
              }
              else {
                return {
                  ...DEFAULT_RIGHT_STYLE,
                  backgroundColor: 'rgb(163, 211, 119)'
                }
              }
            }
          },
          cellRenderer: (params: { data: IOrdersTableItem }) => {
            const metric = getDateMetric(params.data, key);
            if (metric) {
              return showInRubles
                ? `${unitPipe.transform(decimalPipe.transform(metric.order_sum, '1.0-1'), 'rubles')}`
                : `${unitPipe.transform(metric.order_count, 'item')}`
            }
            return null;
          },
          comparator: (valueA, valueB, nodeA, nodeB) => {
            const a = nodeA.data[key]
            const b = nodeB.data[key]
            if (showInRubles) {
              return Number(a.order_sum) - Number(b.order_sum)
            }
            return Number(a.order_count) - Number(b.order_count)
          },
        }
      })
    
    const totalColumn: ColDef = {
      field: 'total',
      headerName: 'Итого',
      width: 150,
      type: 'rightAligned',
      cellStyle: {
        textAlign: 'right',
        fontWeight: '700'
      },
      sortable: true,
      cellRenderer: (params: { data: IOrdersTableItem }) => {
        return showInRubles
          ? `${unitPipe.transform(decimalPipe.transform(getDataForTotal(params.data).sum, '1.0-1'), 'rubles')}`
          : `${unitPipe.transform(getDataForTotal(params.data).count, 'item')}`
      },
      comparator: (valueA, valueB, nodeA, nodeB) => {
        let a = 0;
        let b = 0;
        if (showInRubles) {
          a = getDateMetricEntries(nodeA.data).map(([, value]) => +value.order_sum).reduce((acc, curr) => acc + curr, 0)
          b = getDateMetricEntries(nodeB.data).map(([, value]) => +value.order_sum).reduce((acc, curr) => acc + curr, 0)
        } else {
          a = getDateMetricEntries(nodeA.data).map(([, value]) => +value.order_count).reduce((acc, curr) => acc + curr, 0)
          b = getDateMetricEntries(nodeB.data).map(([, value]) => +value.order_count).reduce((acc, curr) => acc + curr, 0)
        }
        return Number(a) - Number(b)
      },
    }

    return [
      {
        field: 'photo',
        headerName: '',
        width: 36,
        cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
        pinned: 'left',
        cellRenderer: (params: { data: IOrdersTableItem }) => {
          if (params.data.photo === 'empty') {
            return ''
          }
          if (!params.data.photo) {
            return `<img style="height: 36px; width: 36px" src="/assets/images/nophoto.jpg" />`
          }
          return `<img style="height: 36px; width: 36px" src=${params.data.photo} />`
        },
        tooltipField: 'photo',
        tooltipComponentParams: {
          type: 'success',
          photoField: 'photo', // Field containing the photo information
        },
        tooltipComponent: PhotoTooltipComponent,
      },
      {
        field: 'nmID',
        headerName: 'Артикул МП',
        filter: 'agTextColumnFilter',
        width: 125,
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
        field: 'productName',
        headerName: 'Наименование товара',
        filter: 'agTextColumnFilter',
        width: 160,
        cellStyle: { textAlign: 'left' },
      },
      totalColumn,
      ...dates
    ]
  }
};

export function getDataForTotal(row: IOrdersTableItem): { sum: number, count: number } {
  return getDateMetricEntries(row)
    .reduce((acc, [, value]) => {
      return {
        count: Number(acc.count) + Number(value.order_count),
        sum: Number(acc.sum) + Number(value.order_sum),
      }
    }, { count: 0, sum: 0 })
};

export function generateSummary(inputRows: IOrdersTableItem[] | null, type: string, columnDefs: (ColDef)[], marketplace: Marketplace): Partial<IOrdersTableItem>[] {

  const toNumber = (value: IOrdersTableItem[string] | undefined): number => {
    if (value === null || value === undefined || typeof value === 'object') {
      return 0;
    }

    return Number(value);
  };

  if (type == "1") {
    if(marketplace === Marketplace.YANDEX){
      return []
    }
    else {
      const rows = Array.isArray(inputRows) ? inputRows : []
      return [
        {
          photo: 'empty',
          nmID: 'Итого',
          subject: '',
          barcode: '',
          supplierArticle: '',
          order_date: '',
          cancel_date: '',
          seller_sum: String(rows.map(row => toNumber(row['seller_sum'])).reduce((prev, curr) => prev + curr, 0)),
          mp_sum: String(rows.map(row => toNumber(row['mp_sum'])).reduce((prev, curr) => prev + curr, 0)),
          spp: '',
          forPay: String(rows.map(row => toNumber(row['forPay'])).reduce((prev, curr) => prev + curr, 0)),
          warehouseName: '',
          regionName: '',
          delivery_type: '',
          orderType: '',
          srid: '',
          self_buyouts: ''
        },
      ]
    }
  }

  const rows = Array.isArray(inputRows) && !!inputRows.length ? inputRows : []

  const agg: Record<string, OrderMetric> = {};

  if (rows?.length) {
    Object.keys(rows[0])
      .filter((key) => key.match(/^\d{2}/))
      .forEach((key) => {
        agg[key] = rows.map(row => getDateMetric(row, key)).reduce<OrderMetric>((acc, item) => {
          return {
            order_count: Number(acc.order_count) + Number(item?.order_count ?? 0),
            order_sum: Number(acc.order_sum) + Number(item?.order_sum ?? 0),
          }
        }, { order_count: 0, order_sum: 0 })
      })
    return [
      {
        photo: 'empty',
        nmID: 'Итого',
        subject: '',
        barcode: '',
        supplierArticle: '',
        total: '',
        ...agg
      },
    ]
  } else {
    columnDefs
      .map(def => def.field)
      .filter((fieldName): fieldName is string => !!fieldName && fieldName.match(/^\d{2}/) !== null)
      .forEach(name => {
        agg[name] = { order_count: 0, order_sum: 0 };
      })
    return [
      {
        photo: 'empty',
        nmID: 'Итого',
        subject: '',
        barcode: '',
        supplierArticle: '',
        total: '',
        ...agg
      },
    ]
  }
}