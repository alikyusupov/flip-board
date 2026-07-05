import { DecimalPipe } from "@angular/common";
import { ColDef, ColGroupDef } from "ag-grid-community";

import { ITableItemData, ITableItemGroup } from "./rnp.model";

const decimalPipe = new DecimalPipe('ru-RU');

export const generateColumnDefs = (data: ITableItemGroup[]): ColGroupDef[] => {
  return data.map(group => {
    const children: (ColDef<ITableItemData> | ColGroupDef<ITableItemData>)[] = [];
    if(group.type === 'general'){
      group.columns.forEach(col => {
        if(typeof col !== 'string') {
          const headerConfig: ColDef<ITableItemData> | ColGroupDef<ITableItemData> = {
            headerName: col.name,
            headerClass: col.headerCenter ? 'header-center' : '',
            field: col.name,
            width: col.width,
            pinned: 'left',
            cellStyle: {
              textAlign: col.align,
              fontWeight: '600'
            },
            // TODO DYNAMIC CURRENCY
            valueFormatter: (params) => col.name === 'Итого' ? decimalPipe.transform(params.value, '1.0-0') : params.value.replace('руб', '₽')
          }

          children.push(headerConfig)
        }
      })
      return {children: children}
    } else {
      group.columns.forEach((col, index) => {
        if(typeof col === 'string') {
          const headerConfig: ColDef<ITableItemData> | ColGroupDef<ITableItemData> = {
          headerName: col,
          field: col,
          width: 120,
          // @ts-expect-error ag-grid valueFormatter typing does not accept custom params shape
          valueFormatter: (v : {value: string | number}) => decimalPipe.transform(v.value, '1.0-0'),
          headerClass: 'header-center',
          // @ts-expect-error ag-grid cellStyle typing does not accept custom params shape
          cellStyle:( params: { data: ITableItemData, value: number }) => {
            if (
              params.data['Показатели'] === 'Заказы (по оперативному API), руб' 
              || params.data['Показатели'] === 'Продажи (по оперативному API), руб'
              || params.data['Показатели'] === 'Прибыль общая, руб'
              || params.data['Показатели'] === 'Заказы, руб'
              || params.data['Показатели'] === 'Продажи, руб'

            ) {
              const nums = Object.entries(params.data).filter(([key]) => key !== 'Итого' && key !== 'Показатели').map(([, v]) => +v) as number[];
              const [min, max] = [Math.min(...nums), Math.max(...nums)];
              const ranges = split(min, max, 14);

              if(params.value < ranges[0]) {
                return {
                  backgroundColor: 'rgb(233, 185, 188)',
                  textAlign: 'right',
                }
              }

              else if(params.value < ranges[1]) {
                return {
                  backgroundColor: 'rgb(235, 192, 191)',
                  textAlign: 'right',
                }
              }

              else if(params.value < ranges[2]) {
                return {
                  backgroundColor: 'rgb(238, 200, 194)',
                  textAlign: 'right',
                }
              }

              else if(params.value < ranges[3]) {
                return {
                  backgroundColor: 'rgb(241, 207, 197)',
                  textAlign: 'right',
                }
              }

              else if(params.value < ranges[4]) {
                return {
                  backgroundColor: 'rgb(243, 215, 200)',
                  textAlign: 'right',
                }
              }

              else if(params.value < ranges[5]) {
                return {
                  backgroundColor: 'rgb(246, 222, 203',
                  textAlign: 'right',
                }
              }

              else if(params.value < ranges[6]) {
                return {
                  backgroundColor: 'rgb(249, 230, 206)',
                  textAlign: 'right',
                }
              }

              else if(params.value < ranges[7]) {
                return {
                  backgroundColor: 'rgb(242, 237, 210',
                  textAlign: 'right',
                }
              }

              else if(params.value < ranges[8]) {
                return {
                  backgroundColor: 'rgb(233, 236, 212)',
                  textAlign: 'right',
                }
              }

              else if(params.value < ranges[9]) {
                return {
                  backgroundColor: 'rgb(224, 235, 214)',
                  textAlign: 'right',
                }
              }

              else if(params.value < ranges[10]) {
                return {
                  backgroundColor: 'rgb(215, 235, 216',
                  textAlign: 'right',
                }
              }

              else if(params.value < ranges[11]) {
                return {
                  backgroundColor: 'rgb(206, 234, 218)',
                  textAlign: 'right',
                }
              }

              else if(params.value < ranges[12]) {
                return {
                  backgroundColor: 'rgb(197, 233, 220)',
                  textAlign: 'right',
                }
              }

              else {
                return {
                  backgroundColor: 'rgb(188, 233, 222)',
                  textAlign: 'right',
                }
              }
            }

            if(params.data['Показатели'] === 'Прямые затраты' 
              || params.data['Показатели'] === 'Переменные затраты' 
              || params.data['Показатели'] === 'Маржинальная прибыль, руб') {
                return {
                  backgroundColor: '#c3e9ecab',
                  textAlign: 'right',
                }
              }
  
            return {
              textAlign: 'right',
            };
          },
        }

        if(index !== 0) {
          headerConfig['columnGroupShow'] = 'closed';
        }

        children.push(headerConfig)
        }
      })
      return {
        headerName: group.name,
        children: children
      }
    }
  })
}

function split(left: number, right: number, parts: number) {
  const result = [],
      delta = (right - left) / (parts - 1);
  while (left < right) {
      result.push(left);
      left += delta;
  }
  result.push(right);
  return result;
}

export function configureRows(config: { key: string }[], rows: ITableItemData[]){
  return config.map(cfg => {
    return rows.find(row => row['Показатели'] === cfg['key'])
  })
}

export function configureRowsToShow(config: { key: string, checked: boolean }[], rows: ITableItemData[]){
  return config.filter(cfg => !!cfg.checked).map(cfg => {
    return rows.find(row => row['Показатели'] === cfg['key'])
  })
}
