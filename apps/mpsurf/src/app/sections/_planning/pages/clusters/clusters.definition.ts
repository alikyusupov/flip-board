/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { DecimalPipe } from '@angular/common';
import { PhotoTooltipComponent } from '@ui-kit/photo-tooltip/photo-tooltip.component';
import { UnitPipe } from '@ui-kit/pipes/unit.pipe';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { differenceInDays, parse } from 'date-fns';

const decimalPipe = new DecimalPipe('ru-RU');
const unitPipe = new UnitPipe()
const today = new Date();
today.setHours(0, 0, 0, 0);


export const generate_clusters = (rowData): (ColDef | ColGroupDef)[] => {
  const defs: (ColDef | ColGroupDef)[] = [
    {
      children: [
        {
          headerName: '',
          headerClass: 'header-centered',
          field: 'photo_new',
          width: 30,
          cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
          pinned: 'left',
          cellRenderer: (params) => {
            const url = params.data.find(item => item.header === '').data.photo_new;
            if (url === 'Итого') {
              return 'Итого';
            }
            if (!url) {
              return `<img style="height: 30px; width: 30px" src="/assets/images/nophoto.jpg" />`
            }
            return `<img style="height: 30px; width: 30px" src=${url} />`;
          },
          tooltipField: 'photo_new',
          tooltipComponent: PhotoTooltipComponent,
          tooltipComponentParams: {
            photoField: 'photo_new',
          },
        },
        {
          headerName: 'Артикул МП',
          headerClass: 'header-centered',
          cellStyle: { textAlign: 'left' },
          width: 100,
          filter: 'agTextColumnFilter',
          pinned: 'left',
          valueGetter: params => {
            return params.data.find(item => item.header === '').data.nmID;
          },
        },
        {
          headerName: 'Артикул поставщика',
          headerClass: 'header-centered',
          width: 200,
          filter: 'agTextColumnFilter',
          pinned: 'left',
          valueGetter: params => {
            return params.data.find(item => item.header === '').data.sku;
          },
        },
        {
          headerName: 'Предмет',
          headerClass: 'header-centered',
          width: 120,
          filter: 'agTextColumnFilter',
          pinned: 'left',
          valueGetter: params => {
            return params.data.find(item => item.header === '').data.object;
          },
        },
      ],
    },
    ...rowData
      .filter(item => item.header !== '')
      .map((item, index) => {
        return {
          headerName: item.header,
          groupId: `group-${index}`,
          children: [
            {
              headerName: '% Локальных заказов',
              headerClass: 'header-centered',
              width: 120,
              sortable: true,
              filter: 'agNumberColumnFilter',
              headerTooltip: 'Tooltip for ...',
              cellStyle: params => {
                if (params.value) {
                  if (params.value < 75) {
                    return { backgroundColor: '#e6babe' };
                  }
                  if (params.value < 100) {
                    return { backgroundColor: '#fceed1' };
                  }
                  return { backgroundColor: '#bce9de' };
                }
                return null
              },
              comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
                const a = nodeA.data.find(elem => elem.header === item.header).data.from_local_orders
                const b = nodeB.data.find(elem => elem.header === item.header).data.from_local_orders
                return Number(a) - Number(b)
              },
              valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
              valueGetter: params => {
                if (params?.data === undefined) return null;
                const found = params.data.find(elem => elem.header === item.header)
                if (!found) return null;
                return found.data
                  .from_local_orders;
              },
            },
            {
              columnGroupShow: 'closed',
              headerName: 'Остаток на сегодня, шт. ',
              headerClass: 'header-centered',
              width: 120,
              sortable: true,
              filter: 'agNumberColumnFilter',
              comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
                const a = nodeA.data.find(elem => elem.header === item.header).data.remains_today
                const b = nodeB.data.find(elem => elem.header === item.header).data.remains_today
                return Number(a) - Number(b)
              },
              valueFormatter: v => decimalPipe.transform(v.value, '1.0-0'),
              valueGetter: params => {
                if (params?.data === undefined) return null;
                const found = params.data.find(elem => elem.header === item.header)
                if (!found) return null;
                return found.data
                  .remains_today;
              },
            },
            {
              columnGroupShow: 'closed',
              headerName: 'Заказы всего, шт.',
              headerClass: 'header-centered',
              width: 120,
              sortable: true,
              filter: 'agNumberColumnFilter',
              comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
                const a = nodeA.data.find(elem => elem.header === item.header).data.orders_total
                const b = nodeB.data.find(elem => elem.header === item.header).data.orders_total
                return Number(a) - Number(b)
              },
              valueFormatter: v => decimalPipe.transform(v.value, '1.0-0'),
              valueGetter: params => {
                if (params?.data === undefined) return null;
                const found = params.data.find(elem => elem.header === item.header)
                if (!found) return null;
                return found.data
                  .orders_total;
              },
            },
            {
              columnGroupShow: 'closed',
              headerName: 'Заказы локальные, шт.',
              headerClass: 'header-centered',
              width: 120,
              sortable: true,
              comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
                const a = nodeA.data.find(elem => elem.header === item.header).data.orders_local
                const b = nodeB.data.find(elem => elem.header === item.header).data.orders_local
                return Number(a) - Number(b)
              },
              filter: 'agNumberColumnFilter',
              valueFormatter: v => decimalPipe.transform(v.value, '1.0-0'),
              valueGetter: params => {
                if (params?.data === undefined) return null;
                const found = params.data.find(elem => elem.header === item.header)
                if (!found) return null;
                return found.data
                  .orders_local;
              },
            },
            {
              columnGroupShow: 'closed',
              headerName: 'Заказы не локальные, шт.',
              headerClass: 'header-centered',
              width: 120,
              sortable: true,
              filter: 'agNumberColumnFilter',
              comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
                const a = nodeA.data.find(elem => elem.header === item.header).data.orders_not_local
                const b = nodeB.data.find(elem => elem.header === item.header).data.orders_not_local
                return Number(a) - Number(b)
              },
              valueFormatter: v => decimalPipe.transform(v.value, '1.0-0'),
              valueGetter: params => {
                if (params?.data === undefined) return null;
                const found = params.data.find(elem => elem.header === item.header)
                if (!found) return null;
                return found.data
                  .orders_not_local;
              },
            },
            {
              columnGroupShow: 'closed',
              headerName: 'Товар уехал в другой кластер, шт.',
              headerClass: 'header-centered',
              width: 120,
              sortable: true,
              filter: 'agNumberColumnFilter',
              comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
                const a = nodeA.data.find(elem => elem.header === item.header).data.moved_to_other_cluster
                const b = nodeB.data.find(elem => elem.header === item.header).data.moved_to_other_cluster
                return Number(a) - Number(b)
              },
              valueFormatter: v => decimalPipe.transform(v.value, '1.0-0'),
              valueGetter: params => {
                if (params?.data === undefined) return null;
                const found = params.data.find(elem => elem.header === item.header)
                if (!found) return null;
                return found.data
                  .moved_to_other_cluster;
              },
            },
            {
              columnGroupShow: 'closed',
              headerName: 'Продаж из заказов, шт.',
              headerClass: 'header-centered',
              width: 120,
              sortable: true,
              filter: 'agNumberColumnFilter',
              valueFormatter: v => decimalPipe.transform(v.value, '1.0-0'),
              comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
                const a = nodeA.data.find(elem => elem.header === item.header).data.sales_from_orders
                const b = nodeB.data.find(elem => elem.header === item.header).data.sales_from_orders
                return Number(a) - Number(b)
              },
              valueGetter: params => {
                if (params?.data === undefined) return null;
                const found = params.data.find(elem => elem.header === item.header)
                if (!found) return null;
                return found.data
                  .sales_from_orders;
              },
            },
            {
              columnGroupShow: 'closed',
              headerName: 'Скор. заказа, шт./ день',
              headerClass: 'header-centered',
              width: 120,
              sortable: true,
              filter: 'agNumberColumnFilter',
              comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
                const a = nodeA.data.find(elem => elem.header === item.header).data.avg_speed
                const b = nodeB.data.find(elem => elem.header === item.header).data.avg_speed
                return Number(a) - Number(b)
              },
              valueFormatter: v => decimalPipe.transform(v.value, '1.0-0'),
              valueGetter: params => {
                if (params?.data === undefined) return null;
                const found = params.data.find(elem => elem.header === item.header)
                if (!found) return null;
                return found.data
                  .avg_speed;
              },
            },
            {
              columnGroupShow: 'closed',
              headerName: 'Товар закончится',
              headerClass: 'header-centered',
              width: 120,
              sortable: false,
              cellStyle: params => {
                if (params.value && params.value.match(/\d\d\d\d-\d\d-\d\d/)) {

                  const diffInDays = Math.abs(differenceInDays(today, parse(params.value, 'yyyy-MM-dd', new Date())))

                  if (diffInDays <= 6) {
                    return { backgroundColor: '#e6babe' };
                  }
                  if (diffInDays <= 13) {
                    return { backgroundColor: '#fceed1' };
                  }
                  return { backgroundColor: '#bce9de' };
                }
                return null
              },
              valueGetter: params => {
                if (params?.data === undefined) return null;
                const found = params.data.find(elem => elem.header === item.header)
                if (!found) return null;
                return found.data
                  .due_to;
              },
            },
          ],
        }
      }),
  ];
  return defs
};
