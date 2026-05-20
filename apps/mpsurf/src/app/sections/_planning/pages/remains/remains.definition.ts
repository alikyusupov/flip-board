import { DecimalPipe } from '@angular/common';
import { PhotoTooltipComponent } from '@ui-kit/photo-tooltip/photo-tooltip.component';
import { ColDef } from 'ag-grid-community';

const decimalPipe = new DecimalPipe('ru-RU')

export const REMAINS_COLUMN_DEFS: ColDef[]= [
  {
    headerName: '',
    pinned: 'left',
    field: 'photo',
    cellRenderer: (params: { data: { photo: string } }) => {
      if(params.data.photo === 'Итого'){
        return 'Итого'
      }
      if(!params.data.photo){
        return `<img style="height: 30px; width: 30px" src="/assets/images/nophoto.jpg" />`
      }
      return `<img style="height: 30px; width: 30px" src=${params.data.photo} />`
    },
    tooltipField: 'photo',
    tooltipComponent: PhotoTooltipComponent,
    tooltipComponentParams: {
      photoField: 'photo',
    },
    cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
    width: 30,
  },
  {
    headerName: 'Артикул  МП',
    field: 'nmID',
    width: 100,
  },
  {
    headerName: 'Предмет',
    field: 'name',
    width: 140,
  },
  {
    headerName: 'Артикул поставщика',
    field: 'sku',
    width: 140,
    cellStyle: { textAlign: 'left' },
  },
  {
    headerName: 'Баркод',
    field: 'barcode',
    width: 140,
  },
  {
    headerName: 'Размер',
    field: 'size',
    width: 80,
  },
  {
    headerName: 'Склад',
    field: 'warehouse_name',
    width: 120,
  },
  {
    headerName: 'Всего на складе МП (FBO)',
    field: 'fbo',
    width: 80,
  },
  {
    headerName: 'FBS остатки',
    field: 'fbs',
    width: 80,
  },
  {
    headerName: 'От клиента',
    field: 'from_client',
    width: 80,
  },
  {
    headerName: 'К клиенту',
    field: 'to_client',
    width: 80,
  },
  {
    headerName: 'Тотал остатков',
    field: 'total_stock',
    width: 100,
  },
  {
    headerName: 'Сток в с/с',
    field: 'total_sebes',
    width: 100,
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    headerName: 'Сток в ценах продажи',
    field: 'stock_price',
    width: 140,
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
];

export function generateColumnDefs(isOzon: boolean): ColDef[] {
  // const storedDefs = localStorage.getItem('remains-column-defs');

    // if(!storedDefs) {
        return isOzon ? REMAINS_COLUMN_DEFS.map(def => { 
          return def.field === 'to_client' ? {...def, headerName: 'Зарезервировано'} : def 
        }) 
        .filter(def => def.field !== 'from_client')
        : REMAINS_COLUMN_DEFS
    // }
    // const newDefs: ColDef[] = []
    // const parsedDefs = JSON.parse(storedDefs) as ColDef[]
    // const normalizedParsedDefs = isOzon 
    //   ? parsedDefs
    //   .map(def => { 
    //     return def.field === 'to_client' ? {...def, headerName: 'Зарезервировано'} : def 
    //   }) 
    //   .filter(def => def.field !== 'from_client')
    //   : parsedDefs

    // parsedDefs.forEach(def => {
    //   const foundDef: ColDef | undefined = normalizedParsedDefs.find(d => d.field === def.field);
    //   if(foundDef) {
    //     newDefs.push(foundDef)
    //   }
    // });
    // return newDefs;
}
