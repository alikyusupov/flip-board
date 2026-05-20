 
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { DecimalPipe } from '@angular/common';
import { Marketplace } from '@models';
import { UnitPipe } from '@ui-kit/pipes/unit.pipe';
import { ColDef } from 'ag-grid-community';

import { ISalesTableItem } from './sales.model';

const decimalPipe = new DecimalPipe('ru-RU');
const unitPipe = new UnitPipe();

interface SaleMetric  { sale_sum: string | number, sale_count: string | number };

function isSaleMetric(value: ISalesTableItem[string]): value is SaleMetric {
  return value !== null && typeof value === 'object' && 'sale_sum' in value && 'sale_count' in value;
};


function getDateMetric(row: ISalesTableItem, key: string): SaleMetric | undefined {
  const value = row[key];
  if (!isSaleMetric(value)) {
    return undefined;
  }

  return value;
};


export function generateColumnDefsByDate(rowData: ISalesTableItem | null, marketplace: Marketplace, showInRubles = false, grouping = 'size'): ColDef<ISalesTableItem>[] {
  
  if(marketplace !== Marketplace.YANDEX){
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
  
            if (params.data.photo === 'empty') {
              return {
                textAlign: 'right',
              }
            }
  
            if(!params.data[key]) {
              return {
                textAlign: 'right',
              }
            }
  
            if (showInRubles) {
              if (params.data[key].sale_sum === 0) {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(192, 192, 192)'
                }
              }
              else if (+params.data[key].sale_sum < 5000) {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(235, 246, 185)'
                }
              }
              else if (+params.data[key].sale_sum < 10000) {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(230, 244, 180)'
                }
              }
              else if (+params.data[key].sale_sum < 20000) {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(220, 237, 165)'
                }
              }
              else if (+params.data[key].sale_sum < 35000) {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(210, 230, 150)'
                }
              }
              else if (+params.data[key].sale_sum < 50000) {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(195, 222, 135)'
                }
              }
              else {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(163, 211, 119)'
                }
              }
            }
            else {
              if (params.data[key].sale_count === 0) {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(192, 192, 192)'
                }
              }
              else if (+params.data[key].sale_count < 10) {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(235, 246, 185)'
                }
              }
              else if (+params.data[key].sale_count < 20) {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(230, 244, 180)'
                }
              }
              else if (+params.data[key].sale_count < 30) {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(220, 237, 165)'
                }
              }
              else if (+params.data[key].sale_count < 50) {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(210, 230, 150)'
                }
              }
              else if (+params.data[key].sale_count < 90) {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(195, 222, 135)'
                }
              }
              else {
                return {
                  textAlign: 'right',
                  backgroundColor: 'rgb(163, 211, 119)'
                }
              }
            }
          },
          cellRenderer: (params: { data: ISalesTableItem }) => {
            if (params.data[key] && typeof params.data[key] !== 'string') {
              return showInRubles
                ? `${unitPipe.transform(decimalPipe.transform(params.data[key].sale_sum, '1.0-1'), 'rubles')}`
                : `${unitPipe.transform(params.data[key].sale_count, 'item')}`
            }
            return null
          },
          comparator: (valueA, valueB, nodeA, nodeB) => {
            const a = nodeA.data[key]
            const b = nodeB.data[key]
            if (showInRubles) {
              return Number(a.sale_sum) - Number(b.sale_sum)
            }
            return Number(a.sale_count) - Number(b.sale_count)
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
      cellRenderer: (params: { data: ISalesTableItem }) => {
        return showInRubles
          ? `${unitPipe.transform(decimalPipe.transform(getDataForTotal(params.data).sum, '1.0-1'), 'rubles')}`
          : `${unitPipe.transform(getDataForTotal(params.data).count, 'item')}`
      },
      comparator: (valueA, valueB, nodeA, nodeB) => {
        let a = 0;
        let b = 0;
        if (showInRubles) {
          a = Object.entries(nodeA.data).filter(([key,]) => key.match(/^\d{2}/))
            .map(([, value]: [string, { sale_sum: string }]) => +value.sale_sum).reduce((acc, curr) => acc + curr, 0)
          b = Object.entries(nodeB.data).filter(([key,]) => key.match(/^\d{2}/))
            .map(([, value]: [string, { sale_sum: string }]) => +value.sale_sum).reduce((acc, curr) => acc + curr, 0)
        } else {
          a = Object.entries(nodeA.data).filter(([key,]) => key.match(/^\d{2}/))
            .map(([, value]: [string, { sale_count: string }]) => +value.sale_count).reduce((acc, curr) => acc + curr, 0)
          b = Object.entries(nodeB.data).filter(([key,]) => key.match(/^\d{2}/))
            .map(([, value]: [string, { sale_count: string }]) => +value.sale_count).reduce((acc, curr) => acc + curr, 0)
        }
        return Number(a) - Number(b)
      },
    }
  
    let CONFIG: ColDef<ISalesTableItem>[] = [];
  
    switch (grouping) {
      case 'size':
        CONFIG = [
          ...SALES_TABLE_COLUMN_DEFS_WB_SIZE.slice(0, 5),
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
            cellRenderer: (params: { data: ISalesTableItem }) => {
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
            // tooltipComponent: CustomTooltipComponent,
          },
          {
            field: 'nmID',
            headerName: 'Артикул МП',
            filter: 'agTextColumnFilter',
            width: 125,
            cellRenderer: (params: { data: ISalesTableItem }) => {
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
            cellRenderer: (params: { data: ISalesTableItem }) => {
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
            // tooltipComponent: CustomTooltipComponent,
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
            cellRenderer: (params: { data: ISalesTableItem }) => {
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
            // tooltipComponent: CustomTooltipComponent,
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
            cellRenderer: (params: { data: ISalesTableItem }) => {
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
            // tooltipComponent: CustomTooltipComponent,
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
      CONFIG[1] = isOzon ? SALES_TABLE_COLUMN_DEFS_OZON[1] : SALES_TABLE_COLUMN_DEFS_WB_SIZE[1]
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
  
              if (params.data.photo === 'empty') {
                return {
                  textAlign: 'right',
                }
              }
  
              if (!params.data[key]) {
                return {
                  textAlign: 'right',
                }
              }
  
              if (showInRubles) {
                if (params.data[key].sale_sum === 0) {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(192, 192, 192)'
                  }
                }
                else if (+params.data[key].sale_sum < 5000) {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(235, 246, 185)'
                  }
                }
                else if (+params.data[key].sale_sum < 10000) {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(230, 244, 180)'
                  }
                }
                else if (+params.data[key].sale_sum < 20000) {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(220, 237, 165)'
                  }
                }
                else if (+params.data[key].sale_sum < 35000) {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(210, 230, 150)'
                  }
                }
                else if (+params.data[key].sale_sum < 50000) {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(195, 222, 135)'
                  }
                }
                else {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(163, 211, 119)'
                  }
                }
              }
              else {
                if (params.data[key].sale_count === 0) {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(192, 192, 192)'
                  }
                }
                else if (+params.data[key].sale_count < 10) {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(235, 246, 185)'
                  }
                }
                else if (+params.data[key].sale_count < 20) {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(230, 244, 180)'
                  }
                }
                else if (+params.data[key].sale_count < 30) {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(220, 237, 165)'
                  }
                }
                else if (+params.data[key].sale_count < 50) {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(210, 230, 150)'
                  }
                }
                else if (+params.data[key].sale_count < 90) {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(195, 222, 135)'
                  }
                }
                else {
                  return {
                    textAlign: 'right',
                    backgroundColor: 'rgb(163, 211, 119)'
                  }
                }
              }
            },
            cellRenderer: (params) => {
              if (params.data[key]) {
                return showInRubles
                  ? `${unitPipe.transform(decimalPipe.transform(params.data[key].sale_sum, '1.0-1'), 'rubles')}`
                  : `${unitPipe.transform(params.data[key].sale_count, 'item')}`
              }
            },
            comparator: (valueA, valueB, nodeA, nodeB) => {
              const a = nodeA.data[key]
              const b = nodeB.data[key]
              if (showInRubles) {
                return Number(a.sale_sum) - Number(b.sale_sum)
              }
              return Number(a.sale_count) - Number(b.sale_count)
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
        cellRenderer: (params) => {
          return showInRubles
            ? `${unitPipe.transform(decimalPipe.transform(getDataForTotal(params.data).sum, '1.0-1'), 'rubles')}`
            : `${unitPipe.transform(getDataForTotal(params.data).count, 'item')}`
        },
        comparator: (valueA, valueB, nodeA, nodeB) => {
          let a = 0;
          let b = 0;
          if (showInRubles) {
            a = Object.entries(nodeA.data).filter(([key, ]) => key.match(/^\d{2}/))
              .map(([, value]: [string, { sale_sum: string }]) => +value.sale_sum).reduce((acc, curr) => acc + curr, 0)
            b = Object.entries(nodeB.data).filter(([key, ]) => key.match(/^\d{2}/))
              .map(([, value]: [string, { sale_sum: string }]) => +value.sale_sum).reduce((acc, curr) => acc + curr, 0)
          } else {
            a = Object.entries(nodeA.data).filter(([key, ]) => key.match(/^\d{2}/))
              .map(([, value]: [string, { sale_count: string }]) => +value.sale_count).reduce((acc, curr) => acc + curr, 0)
            b = Object.entries(nodeB.data).filter(([key, ]) => key.match(/^\d{2}/))
              .map(([, value]: [string, { sale_count: string }]) => +value.sale_count).reduce((acc, curr) => acc + curr, 0)
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
          cellRenderer: (params) => {
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
          tooltipComponent: CustomTooltipComponent,
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

}

export function getDataForTotal(row: ISalesTableItem): { sum: number, count: number } {
  return Object.entries(row)
    .filter(([key,]) => key.match(/^\d{2}/))
    .reduce((acc, [, value]) => {
      return {
        count: Number(acc.count) + Number(value?.sale_count),
        sum: Number(acc.sum) + Number(value?.sale_sum),
      }
    }, { count: 0, sum: 0 })
}

export function generateSummary(inputRows: ISalesTableItem[] | null, type: string, columnDefs: (ColDef)[], marketplace: Marketplace): Partial<ISalesTableItem>[] {

  const toNumber = (value: ISalesTableItem[string] | undefined): number => {
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

  const agg: Record<string, SaleMetric> = {};

  if (rows?.length) {
    Object.keys(rows[0])
      .filter((key) => key.match(/^\d{2}/))
      .forEach((key) => {
        agg[key] = rows.map(row => getDateMetric(row, key)).reduce<SaleMetric>((acc, item) => {
          return {
            sale_count: Number(acc.sale_count) + Number(item?.sale_count ?? 0),
            sale_sum: Number(acc.sale_sum) + Number(item?.sale_sum ?? 0),
          }
        }, { sale_count: 0, sale_sum: 0 })
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
        agg[name] = { sale_count: 0, sale_sum: 0 };
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