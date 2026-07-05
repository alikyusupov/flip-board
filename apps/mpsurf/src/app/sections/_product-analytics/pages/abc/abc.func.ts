/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DecimalPipe } from '@angular/common';
import { ICardWidget } from '@models';
import { PhotoTooltipComponent } from '@ui-kit/photo-tooltip/photo-tooltip.component';
import { UnitPipe } from '@ui-kit/pipes/unit.pipe';
import { CellStyle, ColGroupDef } from 'ag-grid-community';
import { getCurrencyIcon } from 'app/utils';

import { IAbcGridDataItem } from './abc.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function abc_drawer(_v: number | string) {

  return {}

  // if(+v === 0){
  //   return {
  //     backgroundColor: 'rgb(235, 192, 191)'
  //   }
  // }
  // else if(+v < 10000){
  //   return {
  //     backgroundColor: 'rgb(235, 194, 175)'
  //   }
  // }
  // else if(+v < 20000){
  //   return {
  //     backgroundColor: 'rgb(255, 234, 170)'
  //   }
  // }
  // else if(+v < 25000){
  //   return {
  //     backgroundColor: 'rgb(242, 237, 210)'
  //   }
  // }
  // else if(+v < 50000){
  //   return {
  //     backgroundColor: 'rgb(215, 235, 216)'
  //   }
  // }
  // else if(+v < 75000){
  //   return {
  //     backgroundColor: 'rgb(206, 234, 218)'
  //   }
  // }
  // else {
  //   return {
  //     backgroundColor: 'rgb(188, 233, 222)'
  //   }
  // }
}

export function generateCardData(data: IAbcGridDataItem[]): ICardWidget[] {
  const TOTAL_SALES_AMOUNT = data
    .map(row => row.sales_count)
    .reduce((a, b) => {
      const safeA = !isNaN(+a) ? +a : 0;
      const safeB = !isNaN(+b) ? +b : 0;
      return safeA + safeB;
    }, 0);

  const TOTAL_SALES = data
    .map(row => row.sales)
    .reduce((a, b) => {
      const safeA = !isNaN(+a) ? +a : 0;
      const safeB = !isNaN(+b) ? +b : 0;
      return safeA + safeB;
    }, 0);

  const TOTAL_PROFIT = data
    .map(row => row.profit)
    .reduce((a, b) => {
      const safeA = !isNaN(+a) ? +a : 0;
      const safeB = !isNaN(+b) ? +b : 0;
      return safeA + safeB;
    }, 0);

  const AAA_ROWS = data.filter(row => row.abc === 'AAA');

  const CCC_ROWS = data.filter(row => row.abc === 'CCC');

  const ABC_ROWS = data.filter(row => row.abc !== 'CCC' && row.abc !== 'AAA');

  const REDUCED_AAA_ROWS = AAA_ROWS.reduce(
    (acc, curr) => {
      return {
        ...acc,
        itemsCount: (acc.itemsCount += 1),
        salesAmount: (acc.salesAmount += !isNaN(+curr.sales_count)
          ? +curr.sales_count
          : 0),
        sales: (acc.sales += !isNaN(+curr.sales) ? +curr.sales : 0),
        profit: (acc.profit += !isNaN(+curr.profit) ? +curr.profit : 0),
      };
    },
    {
      itemsCount: 0,
      salesAmount: 0,
      sales: 0,
      profit: 0,
    }
  );

  const REDUCED_ABC_ROWS = ABC_ROWS.reduce(
    (acc, curr) => {
      return {
        itemsCount: (acc.itemsCount += 1),
        salesAmount: (acc.salesAmount += !isNaN(+curr.sales_count)
          ? +curr.sales_count
          : 0),
        sales: (acc.sales += !isNaN(+curr.sales) ? +curr.sales : 0),
        profit: (acc.profit += !isNaN(+curr.profit) ? +curr.profit : 0),
      };
    },
    {
      itemsCount: 0,
      salesAmount: 0,
      sales: 0,
      profit: 0,
    }
  );

  const REDUCED_CCC_ROWS = CCC_ROWS.reduce(
    (acc, curr) => {
      return {
        itemsCount: (acc.itemsCount += 1),
        salesAmount: (acc.salesAmount += !isNaN(+curr.sales_count)
          ? +curr.sales_count
          : 0),
        sales: (acc.sales += !isNaN(+curr.sales) ? +curr.sales : 0),
        profit: (acc.profit += !isNaN(+curr.profit) ? +curr.profit : 0),
      };
    },
    {
      itemsCount: 0,
      salesAmount: 0,
      sales: 0,
      profit: 0,
    }
  );

  return [
    {
      title: 'Товарная группа AAA',
      subfields: [
        {
          name: 'Количество товаров',
          value: REDUCED_AAA_ROWS.itemsCount,
          unit: 'item',
          ratioInPercents: Math.floor(
            (REDUCED_AAA_ROWS.itemsCount / data.length) * 100
          ),
        },
        {
          name: 'Количество продаж',
          value: REDUCED_AAA_ROWS.salesAmount,
          unit: 'item',
          ratioInPercents: Math.floor(
            (REDUCED_AAA_ROWS.salesAmount / TOTAL_SALES_AMOUNT) * 100
          ),
        },
        {
          name: 'Выручка',
          value: REDUCED_AAA_ROWS.sales,
          unit: 'rubles',
          ratioInPercents: Math.floor(
            (REDUCED_AAA_ROWS.sales / TOTAL_SALES) * 100
          ),
        },
        {
          name: 'Валовая прибыль',
          value: REDUCED_AAA_ROWS.profit,
          unit: 'rubles',
          ratioInPercents: Math.floor(
            (REDUCED_AAA_ROWS.profit / TOTAL_PROFIT) * 100
          ),
          description:
            'Продажи минус удержания которые можно распределить на артикул (например, штрафы, подписки и др. по API не распределяются по артикулам)',
        },
      ],
      description:
        'Наиболее ценные позиции. Они хорошо оборачиваются, приносят наибольшую прибыль, но при этом на них тратится меньше ресурсов',
      totalCount: null,
      totalSum: null,
    },
    {
      title: 'Товарная группа ABA-CBC',
      subfields: [
        {
          name: 'Количество товаров',
          value: REDUCED_ABC_ROWS.itemsCount,
          unit: 'item',
          ratioInPercents: Math.floor(
            (REDUCED_ABC_ROWS.itemsCount / data.length) * 100
          ),
        },
        {
          name: 'Количество продаж',
          value: REDUCED_ABC_ROWS.salesAmount,
          unit: 'item',
          ratioInPercents: Math.floor(
            (REDUCED_ABC_ROWS.salesAmount / TOTAL_SALES_AMOUNT) * 100
          ),
        },
        {
          name: 'Выручка',
          value: REDUCED_ABC_ROWS.sales,
          unit: 'rubles',
          ratioInPercents: Math.floor(
            (REDUCED_ABC_ROWS.sales / TOTAL_SALES) * 100
          ),
        },
        {
          name: 'Валовая прибыль',
          value: REDUCED_ABC_ROWS.profit,
          unit: 'rubles',
          ratioInPercents: Math.floor(
            (REDUCED_ABC_ROWS.profit / TOTAL_PROFIT) * 100
          ),
          description:
            'Продажи минус удержания которые можно распределить на артикул (например, штрафы, подписки и др. по API не распределяются по артикулам)',
        },
      ],
      description:
        'Промежуточные позиции. Эти товары не приносят большую прибыль, но не слишком дорого обходятся бизнесу',
      totalCount: null,
      totalSum: null,
    },
    {
      title: 'Товарная группа CCC',
      subfields: [
        {
          name: 'Количество товаров',
          value: REDUCED_CCC_ROWS.itemsCount,
          unit: 'item',
          ratioInPercents: Math.floor(
            (REDUCED_CCC_ROWS.itemsCount / data.length) * 100
          ),
        },
        {
          name: 'Количество продаж',
          value: REDUCED_CCC_ROWS.salesAmount,
          unit: 'item',
          ratioInPercents: Math.floor(
            (REDUCED_CCC_ROWS.salesAmount / TOTAL_SALES_AMOUNT) * 100
          ),
        },
        {
          name: 'Выручка',
          value: REDUCED_CCC_ROWS.sales,
          unit: 'rubles',
          ratioInPercents: Math.floor(
            (REDUCED_CCC_ROWS.sales / TOTAL_SALES) * 100
          ),
        },
        {
          name: 'Валовая прибыль',
          value: REDUCED_CCC_ROWS.profit,
          unit: 'rubles',
          ratioInPercents: Math.floor(
            (REDUCED_CCC_ROWS.profit / TOTAL_PROFIT) * 100
          ),
          description:
            'Продажи минус удержания которые можно распределить на артикул (например, штрафы, подписки и др. по API не распределяются по артикулам)',
        },
      ],
      description:
        'Наименее ценные позиции. Товары, которые не приносят ощутимого дохода',
      totalCount: null,
      totalSum: null,
    },
  ] as ICardWidget[] 
}

export const ABC_COLOR_MAP: Map<string, CellStyle> = new Map()
  .set('AAA', {'background-color': 'rgb(188 233 222)'})
  .set('AAB', {'background-color': 'rgb(192 233 221)'})
  .set('AAC', {'background-color': 'rgb(197 233 220)'})
  .set('ABA', {'background-color': 'rgb(202 234 219)'})
  .set('ABB', {'background-color': 'rgb(207 234 218)'})
  .set('ABC', {'background-color': 'rgb(212 234 217)'})
  .set('ACA', {'background-color': 'rgb(217 235 216)'})
  .set('ACB', {'background-color': 'rgb(222 235 215)'})
  .set('ACC', {'background-color': 'rgb(227 235 214)'})
  .set('BAA', {'background-color': 'rgb(232 236 213)'})
  .set('BAB', {'background-color': 'rgb(237 236 212)'})
  .set('BAC', {'background-color': 'rgb(242 237 211)'})
  .set('BBA', {'background-color': 'rgb(247 237 210)'})
  .set('BBB', {'background-color': 'rgb(252 238 209)'})
  .set('BBC', {'background-color': 'rgb(250 233 207)'})
  .set('BCA', {'background-color': 'rgb(249 229 205)'})
  .set('BCB', {'background-color': 'rgb(247 225 204)'})
  .set('BCC', {'background-color': 'rgb(246 221 202)'})
  .set('CAA', {'background-color': 'rgb(244 217 200)'})
  .set('CAB', {'background-color': 'rgb(243 213 199)'})
  .set('CAC', {'background-color': 'rgb(241 209 197)'})
  .set('CBA', {'background-color': 'rgb(240 205 196)'})
  .set('CBB', {'background-color': 'rgb(238 201 194)'})
  .set('CBC', {'background-color': 'rgb(237 197 192)'})
  .set('CCA', {'background-color': 'rgb(235 193 191)'})
  .set('CCB', {'background-color': 'rgb(234 189 189)'})
  .set('CCC', {'background-color': 'rgb(233 185 188)'})

const decimalPipe = new DecimalPipe('ru-RU')
const unitPipe = new UnitPipe()

export const ABS_ANALYST_COLUMN_DEFS: ColGroupDef[] = [
  {
    children: [
      {
        headerName: '',
        field: 'photo_new',
        width: 30,
        cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
        pinned: 'left',
        cellRenderer: (params: { data: IAbcGridDataItem }) => {
          if(params.data.photo_new === 'empty'){
            return ''
          }
          else if(!params.data.photo_new){
            return `<img style="height: 30px; width: 30px" src="/assets/images/nophoto.jpg" />`
          }
          return `<img style="height: 30px; width: 30px" src=${params.data.photo_new} />`
        },
        tooltipField: 'photo_new',
        tooltipComponent: PhotoTooltipComponent,
        tooltipComponentParams: {
          photoField: 'photo_new',
        },
      },
      {
        headerName: 'Артикул МП',
        cellStyle: { textAlign: 'left' },
        cellRenderer: (params: { data: IAbcGridDataItem }) => {
          if(params.data.nmID === 'Итого') {
            return `<strong>Итого</strong>`
          }

          return params.data.nmID
  
        },
        field: 'nmID',
        width: 100,
        filter: 'agTextColumnFilter',
        pinned: 'left',
      },
      {
        headerName: 'Предмет',
        cellStyle: { textAlign: 'left' },
        field: 'object',
        width: 120,
        filter: 'agTextColumnFilter',
        pinned: 'left',
      },
      {
        headerName: 'Артикул поставщика',
        cellStyle: { textAlign: 'left' },
        field: 'sku',
        width: 200,
        filter: 'agTextColumnFilter',
        pinned: 'left',
      },
      {
        headerName: 'ABC',
        field: 'abc',
        width: 70,
        filter: 'agTextColumnFilter',
        pinned: 'left',
        cellStyle: params => {
          return ABC_COLOR_MAP.get(params.value) || {'background-color': 'null'}
        }
      },
    ]
  },
  {
    headerName: 'ABC Выручка',
    children: [
      {
        headerName: `Выручка, ${getCurrencyIcon()}`,
        field: 'sales',
        width: 137,
        sortable: true,
        filter: 'agNumberColumnFilter',
        cellStyle: params =>  ({...abc_drawer(params.value), fontWeight: '600'}),
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'В выручке учтены продажи (без вычета СПП/ баллов), возвраты, сторно'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Продажи, шт',
        field: 'sales_count',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Кол-во продаж за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: '% от выручки',
        field: 'percent_sales',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Процент продажи от общей суммы продаж всех артикулов за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Заказы,  ${getCurrencyIcon()}`,
        field: 'orders_sum',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Процент продажи от общей суммы продаж всех артикулов за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Заказы, шт.',
        field: 'orders',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Кол-во заказов сделанное за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Продано из заказанных, шт',
        field: 'sales_from_orders',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Кол-во продаж из заказов сделанных за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Продано из заказанных, ${getCurrencyIcon()}`,
        field: 'sales_from_orders_sum',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Сумма продаж из заказов сделанных за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: '% выкупа (по доехавшим)',
        field: 'percent_sales_delivered',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: '% выкупа по заказам по которым уже есть решение'
      },
      {
        columnGroupShow: 'closed',
        headerName: '% выкупа (по заказанным)',
        field: 'percent_sales_redeemed',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: '% выкупа по всем заказам, показатель может меняться из-за товаров "В пути"'
      },
    ]
  },
  {
    headerName: 'ABC Валовая прибыль',
    children: [
      {
        headerName: `Прибыль поартикульно,  ${getCurrencyIcon()}`,
        field: 'profit',
        width: 190,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value), fontWeight: '600'}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Продажи минус удержания которые можно распределить на артикул (например, штрафы, подписки и др. по API не распределяются по артикулам)'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Прибыль поартикульно, %',
        headerClass: 'header-centered',
        field: 'unit_percent_profit',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Процент прибыли от выручки за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Рентабельность товара по с/с, %',
        field: 'profitability',
        width: 180,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Процентное соотношение прибыли к себестоимости'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Себес-ть (общая), ${getCurrencyIcon()}`,
        field: 'sebes',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Вносится на листе Мои товары'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Себес-ть (общая), %.',
        field: 'sebes_percent',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Вносится на листе Мои товары'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Логистика,  ${getCurrencyIcon()}`,
        field: 'logistic',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: `Комиссия,  ${getCurrencyIcon()}`,
        field: 'commission',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Эквайринг',
        field: 'acquiring',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: 'ДРР по заказам, %',
        field: 'drr',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Доля рекламных расходам по заказам'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'ДРР по продажам, %',
        field: 'drr_sales',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Доля рекламных расходам по продажам'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Реклама внутренняя',
        field: 'adv',
        width: 130,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Если данные в столбец не передаются, то они в составе прочих удержаний'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Реклама внешняя',
        field: 'adv_external',
        width: 130,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Вносится на листе операции статья "Реклама таргет / блогеры"'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Маркетинг',
        field: 'marketing',
        width: 130,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Вносится на листе операции статья "Дизайнеры / Фотографы"'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Хранение',
        field: 'hranenie',
        width: 130,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value), fontWeight: '600'}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Платная приемка',
        field: 'platnaya_priyomka',
        width: 130,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Прочие удержания',
        field: 'other_deductions',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Прочие прямые затраты которые можно распределить по артикулам'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Налог (с НДС), ${getCurrencyIcon()}`,
        field: 'nalog_nds',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value), fontWeight: '600'}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
    ]
  },
  {
    headerName: 'АВС Оборачиваемость',
    children: [
      {
        headerName: 'Оборачиваемость по заказам, дней',
        cellStyle: { fontWeight: '600' },
        field: 'turnover',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'За сколько дней продастся весь товар, считается по заказам в день. Считается на сегодня'
      },
      {
        headerName: 'Оборачиваемость по продажам, дней',
        cellStyle: { fontWeight: '600' },
        field: 'turnover_sales',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'За сколько дней продастся весь товар с учетом % выкупа. Считается на сегодня'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Среднее кол-во заказов в день на сегодня',
        field: 'avg_orders_day',
        width: 180,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Остатки FBO',
        field: 'total_stocks',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Остаток на всех складах + товар, что занесен на лист Мои товары'
      },
    ]
  },
  {
    headerName: 'Юнит-экономика (Затраты на ед.)',
    children: [
      {
        headerName: `Ср. цена продажи, ${getCurrencyIcon()}`,//?
        field: 'unit_avg_sale_sum',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        cellStyle: { fontWeight: '600' },
      },
      {
        headerName: `Прибыль на ед., ${getCurrencyIcon()}`,
        field: 'unit_profit_per',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: '% рентабельности от прибыли',
        field: 'unit_percent_profit',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Отношение прибыли к выручке',
      },
      {
        columnGroupShow: 'closed',
        headerName: `Итого затрат на ед., ${getCurrencyIcon()}`,
        field: 'total_costs_unit_rub',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        cellStyle: params =>  ({...abc_drawer(params.value), fontWeight: '600'}),
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Итого затрат на ед., %',
        field: 'total_costs_unit_per',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      },
      {
        columnGroupShow: 'closed',
        headerName: `Себестоимость на ед., ${getCurrencyIcon()}`,//?
        field: 'unit_cost_price_per',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Себестоимость на ед., %',
        field: 'unit_percent_cost_price_per',//?
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      },
      {
        columnGroupShow: 'closed',
        headerName: `Закупка, ${getCurrencyIcon()}`,
        field: 'cost_price',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Закупка, %',
        field: 'cost_price_percent',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      },
      {
        columnGroupShow: 'closed',
        headerName: `Доп. расходы, ${getCurrencyIcon()}`,
        field: 'sebes_other_deductions',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Доп. расходы, %',
        field: 'sebes_other_deductions_percent',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      },
      {
        columnGroupShow: 'closed',
        headerName: `Комиссия на ед., ${getCurrencyIcon()}`,
        field: 'commission_unit_rub',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Комиссия на ед., %',
        field: 'commission_unit_per',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Отношение комиссии к стоимости в ценах поставщика'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Логистика на ед., ${getCurrencyIcon()}`,
        field: 'logistic_unit_rub',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Логистика на ед., %',
        field: 'logistic_unit_per',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Отношение логистики к стоимости в ценах поставщика'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Эквайринг на ед., ${getCurrencyIcon()}`,
        field: 'acquiring_unit_rub',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: `Реклама внеш. на ед., ${getCurrencyIcon()}`,
        field: 'adv_external_unit_rub',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: `Реклама внутр. на ед., ${getCurrencyIcon()}`,
        field: 'adv_unit_rub',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: `Маркетинг на ед., ${getCurrencyIcon()}`,
        field: 'marketing_unit_rub',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: `Хранение на ед, ${getCurrencyIcon()}`,
        field: 'hranenie_unit_rub',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Хранение на ед, %',
        field: 'hranenie_unit_percent',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      },
      {
        columnGroupShow: 'closed',
        headerName: `Платная приемка на ед, ${getCurrencyIcon()}`,
        field: 'platnaya_priyomka_unit_rub',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Платная приемка на ед, %',
        field: 'platnaya_priyomka_unit_percent',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      },
      {
        columnGroupShow: 'closed',
        headerName: `Прочие удержания на ед., ${getCurrencyIcon()}`,
        field: 'other_deductions_unit_rub',
        width: 120,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
    ]
  },
];

export const ABS_ANALYST_COLUMN_DEFS_OZON: ColGroupDef[] = [
  {
    children: [
      {
        headerName: '',
        field: 'photo_new',
        width: 30,
        cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
        pinned: 'left',
        cellRenderer: (params: { data: IAbcGridDataItem }) => {
          if(params.data.photo_new === 'empty'){
            return ''
          }
          else if(!params.data.photo_new){
            return `<img style="height: 30px; width: 30px" src="/assets/images/nophoto.jpg" />`
          }
          return `<img style="height: 30px; width: 30px" src=${params.data.photo_new} />`
        },
        tooltipField: 'photo_new',
        tooltipComponent: PhotoTooltipComponent,
        tooltipComponentParams: {
          photoField: 'photo_new',
        },
      },
      {
        headerName: 'Артикул МП',
        cellStyle: { textAlign: 'left' },
        cellRenderer: (params: { data: IAbcGridDataItem }) => {
          if(params.data.nmID === 'Итого') {
            return `<strong>Итого</strong>`
          }

          return `<strong><a href="https://www.ozon.ru/product/${params.data.nmID}" target="blank">${params.data.nmID}</a></strong>`
  
        },
        field: 'nmID',
        width: 100,
        filter: 'agTextColumnFilter',
        pinned: 'left',
      },
      {
        headerName: 'Предмет',
        cellStyle: { textAlign: 'left' },
        field: 'object',
        width: 120,
        filter: 'agTextColumnFilter',
        pinned: 'left',
      },
      {
        headerName: 'Артикул поставщика',
        cellStyle: { textAlign: 'left' },
        field: 'sku',
        width: 200,
        filter: 'agTextColumnFilter',
        pinned: 'left',
      },
      {
        headerName: 'ABC',
        field: 'abc',
        width: 70,
        filter: 'agTextColumnFilter',
        pinned: 'left',
        cellStyle: params => {
          return ABC_COLOR_MAP.get(params.value) || {'background-color': 'null'}
        }
      },
    ]
  },
  {
    headerName: 'ABC Выручка',
    children: [
      {
        headerName: `Выручка, ${getCurrencyIcon()}`,
        field: 'sales',
        width: 137,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value), fontWeight: '600'}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'В выручке учтены продажи (без вычета СПП/ баллов), возвраты, сторно'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Продажи, шт',
        field: 'sales_count',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Кол-во продаж за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: '% от выручки',
        field: 'percent_sales',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Процент продажи от общей суммы продаж всех артикулов за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Заказы, ${getCurrencyIcon()}`,
        field: 'orders_sum',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Процент продажи от общей суммы продаж всех артикулов за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Заказы, шт.',
        field: 'orders',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Кол-во заказов сделанное за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Продано из заказанных, шт',
        field: 'sales_from_orders',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Кол-во продаж из заказов сделанных за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Продано из заказанных, ${getCurrencyIcon()}`,
        field: 'sales_from_orders_sum',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Сумма продаж из заказов сделанных за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: '% выкупа (по доехавшим)',
        field: 'percent_sales_delivered',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: '% выкупа по заказам по которым уже есть решение'
      },
      {
        columnGroupShow: 'closed',
        headerName: '% выкупа (по заказанным)',
        field: 'percent_sales_redeemed',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: '% выкупа по всем заказам, показатель может меняться из-за товаров "В пути"'
      },
    ]
  },
  {
    headerName: 'ABC Валовая прибыль',
    children: [
      {
        headerName: `Прибыль поартикульно, ${getCurrencyIcon()}`,
        field: 'profit',
        width: 190,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value), fontWeight: '600'}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Продажи минус удержания которые можно распределить на артикул (например, штрафы, подписки и др. по API не распределяются по артикулам)'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Прибыль поартикульно, %',
        headerClass: 'header-centered',
        field: 'unit_percent_profit',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Процент прибыли от выручки за выбранный период'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Рентабельность товара по с/с, %',
        field: 'profitability',
        width: 180,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Процентное соотношение прибыли к себестоимости'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Себес-ть (общая), ${getCurrencyIcon()}`,
        field: 'sebes',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Вносится на листе Мои товары'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Себес-ть (общая), %.',
        field: 'sebes_percent',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Вносится на листе Мои товары'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Логистика, ${getCurrencyIcon()}`,
        field: 'logistic',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: `Комиссия, ${getCurrencyIcon()}`,
        field: 'commission',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Эквайринг',
        field: 'acquiring',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: 'ДРР по заказам, %',
        field: 'drr',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Доля рекламных расходам по заказам'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'ДРР по продажам, %',
        field: 'drr_sales',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Доля рекламных расходам по продажам'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Реклама внутренняя',
        field: 'adv',
        width: 130,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Если данные в столбец не передаются, то они в составе прочих удержаний'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Реклама внешняя',
        field: 'adv_external',
        width: 130,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Вносится на листе операции статья "Реклама таргет / блогеры"'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Маркетинг',
        field: 'marketing',
        width: 130,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Вносится на листе операции статья "Дизайнеры / Фотографы"'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Хранение',
        field: 'hranenie',
        width: 130,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Платная приемка',
        field: 'platnaya_priyomka',
        width: 130,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Прочие удержания',
        field: 'other_deductions',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Прочие прямые затраты которые можно распределить по артикулам'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Налог (с НДС), ${getCurrencyIcon()}`,
        field: 'nalog_nds',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        cellStyle: params =>  ({...abc_drawer(params.value), color: '#737373', textAlign: "center"}),
        headerTooltip: 'Предварительный расчет налог без вычета баллов'
      },
    ]
  },
  {
    headerName: 'АВС Оборачиваемость',
    children: [
      {
        headerName: 'Оборачиваемость по заказам, дней',
        cellStyle: { fontWeight: '600' },
        field: 'turnover',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'За сколько дней продастся весь товар, считается по заказам в день. Считается на сегодня'
      },
      {
        headerName: 'Оборачиваемость по продажам, дней',
        cellStyle: { fontWeight: '600' },
        field: 'turnover_sales',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'За сколько дней продастся весь товар с учетом % выкупа. Считается на сегодня'
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Среднее кол-во заказов в день на сегодня',
        field: 'avg_orders_day',
        width: 180,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Остатки FBO',
        field: 'total_stocks',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
        headerTooltip: 'Остаток на всех складах + товар, что занесен на лист Мои товары'
      },
    ]
  },
  {
    headerName: 'Юнит-экономика (Затраты на ед.)',
    children: [
      {
        headerName: `Ср. цена продажи, ${getCurrencyIcon()}`,//?
        field: 'unit_avg_sale_sum',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value), fontWeight: '600'}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        headerName: `Прибыль на ед., ${getCurrencyIcon()}`,
        field: 'unit_profit_per',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: '% рентабельности от прибыли',
        field: 'unit_percent_profit',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Отношение прибыли к выручке',
      },
      {
        columnGroupShow: 'closed',
        headerName: `Итого затрат на ед., ${getCurrencyIcon()}`,
        field: 'total_costs_unit_rub',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value), fontWeight: '600'}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Итого затрат на ед., %',
        field: 'total_costs_unit_per',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      },
      {
        columnGroupShow: 'closed',
        headerName: `Себестоимость на ед., ${getCurrencyIcon()}`,//?
        field: 'unit_cost_price_per',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Себестоимость на ед., %',
        field: 'unit_percent_cost_price_per',//?
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      },
      {
        columnGroupShow: 'closed',
        headerName: `Закупка, ${getCurrencyIcon()}`,
        field: 'cost_price',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Закупка, %',
        field: 'cost_price_percent',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      },
      {
        columnGroupShow: 'closed',
        headerName: `Доп. расходы, ${getCurrencyIcon()}`,
        field: 'sebes_other_deductions',
        width: 120,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Доп. расходы, %',
        field: 'sebes_other_deductions_percent',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      },
      {
        columnGroupShow: 'closed',
        headerName: `Комиссия на ед., ${getCurrencyIcon()}`,
        field: 'commission_unit_rub',
        width: 120,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Комиссия на ед., %',
        field: 'commission_unit_per',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Отношение комиссии к стоимости в ценах поставщика'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Логистика на ед., ${getCurrencyIcon()}`,
        field: 'logistic_unit_rub',
        width: 120,
        sortable: true,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Логистика на ед., %',
        field: 'logistic_unit_per',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
        headerTooltip: 'Отношение логистики к стоимости в ценах поставщика'
      },
      {
        columnGroupShow: 'closed',
        headerName: `Эквайринг на ед., ${getCurrencyIcon()}`,
        field: 'acquiring_unit_rub',
        width: 120,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: `Реклама внеш. на ед., ${getCurrencyIcon()}`,
        field: 'adv_external_unit_rub',
        width: 120,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: `Реклама внутр. на ед., ${getCurrencyIcon()}`,
        field: 'adv_unit_rub',
        width: 120,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: `Маркетинг на ед., ${getCurrencyIcon()}`,
        field: 'marketing_unit_rub',
        width: 120,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: `Хранение на ед, ${getCurrencyIcon()}`,
        field: 'hranenie_unit_rub',
        width: 120,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Хранение на ед, %',
        field: 'hranenie_unit_percent',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      },
      {
        columnGroupShow: 'closed',
        headerName: `Платная приемка на ед, ${getCurrencyIcon()}`,
        field: 'platnaya_priyomka_unit_rub',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
      {
        columnGroupShow: 'closed',
        headerName: 'Платная приемка на ед, %',
        field: 'platnaya_priyomka_unit_percent',
        width: 120,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      },
      {
        columnGroupShow: 'closed',
        headerName: `Прочие удержания на ед., ${getCurrencyIcon()}`,
        field: 'other_deductions_unit_rub',
        width: 120,
        cellStyle: params =>  ({...abc_drawer(params.value)}),
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      },
    ]
  },
];


const FBO_FBS_COL_DEF: ColGroupDef = {
  headerName: 'АВС Оборачиваемость',
  children: [
    {
      headerName: 'Оборачиваемость по заказам, дней',
      cellStyle: { fontWeight: '600' },
      field: 'turnover',
      width: 120,
      sortable: true,
      filter: 'agNumberColumnFilter',
      valueFormatter: (v: { value: string | number }) => decimalPipe.transform(v.value, '1.0-0') as string,
      headerTooltip: 'За сколько дней продастся весь товар, считается по заказам в день. Считается на сегодня'
    },
    {
      headerName: 'Оборачиваемость по продажам, дней',
      cellStyle: { fontWeight: '600' },
      field: 'turnover_sales',
      width: 120,
      sortable: true,
      filter: 'agNumberColumnFilter',
      valueFormatter: (v: { value: string | number }) => decimalPipe.transform(v.value, '1.0-0') as string,
      headerTooltip: 'За сколько дней продастся весь товар с учетом % выкупа. Считается на сегодня'
    },
    {
      columnGroupShow: 'closed',
      headerName: 'Среднее кол-во заказов в день на сегодня',
      field: 'avg_orders_day',
      width: 180,
      sortable: true,
      filter: 'agNumberColumnFilter',
      valueFormatter: (v: { value: string | number }) => decimalPipe.transform(v.value, '1.0-0') as string
    },
    {
      columnGroupShow: 'closed',
      headerName: 'Остатки FBO+FBS',
      field: 'total_stocks',
      width: 120,
      sortable: true,
      filter: 'agNumberColumnFilter',
      valueFormatter: (v: { value: string | number }) => decimalPipe.transform(v.value, '1.0-0') as string,
      headerTooltip: 'Остаток на всех складах + товар, что занесен на лист Мои товары'
    },
  ]
}


export function generateColumnDefs(isWbChecked: boolean, isFboChecked: boolean, isOzon: boolean, grouping = 'size'): ColGroupDef[] {

  const DEFS = generate_columns_defs(isOzon, grouping);

  if(!isWbChecked) {
    if(isFboChecked) {
      return [
        DEFS[0],
        DEFS[1],
        DEFS[2],
        FBO_FBS_COL_DEF,
        DEFS[4],
      ]
    }
    return DEFS
  }

  const output : ColGroupDef[]=  [
    {
      children: [
        {
          headerName: '',
          field: 'photo_new',
          width: 40,
          cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
          pinned: 'left',
          cellRenderer: (params: { data: IAbcGridDataItem }) => {
            if(params.data.photo_new === 'empty'){
              return ''
            }
            if(!params.data.photo_new){
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
          headerName: 'Артикул МП',
          cellStyle: { textAlign: 'left' },
          field: 'nmID',
          width: 100,
          filter: 'agTextColumnFilter',
          pinned: 'left',
          cellRenderer: (params: { data: IAbcGridDataItem }) => {
            if(params.data.nmID === 'Итого') {
              return `<strong>Итого</strong>`
            }
            return !isOzon 
            ? `<strong><a href="https://www.wildberries.ru/catalog/${params.data.nmID}/detail.aspx?targetUrl=SP" target="blank">${params.data.nmID}</a></strong>`
            : `<strong><a href="https://www.ozon.ru/product/${params.data.nmID}" target="blank">${params.data.nmID}</a></strong>`
    
          },
        },
        {
          headerName: 'Предмет',
          cellStyle: { textAlign: 'left' },
          field: 'object',
          width: 120,
          filter: 'agTextColumnFilter',
          pinned: 'left',
        },
        {
          headerName: 'Размер',
          cellStyle: { textAlign: 'left' },
          field: 'size',
          width: 80,
          filter: 'agTextColumnFilter',
          pinned: 'left',
        },
        {
          headerName: 'Артикул поставщика',
          cellStyle: { textAlign: 'left' },
          field: 'sku',
          width: 200,
          filter: 'agTextColumnFilter',
          pinned: 'left',
        },
        {
          headerName: 'ABC',
          field: 'abc',
          width: 70,
          filter: 'agTextColumnFilter',
          pinned: 'left',
          cellStyle: params => {
            return ABC_COLOR_MAP.get(params.value) || {'background-color': 'null'}
          }
        },
      ]
    },
    DEFS[1],
    DEFS[2],
    isFboChecked ? FBO_FBS_COL_DEF : DEFS[3],
    DEFS[4],
  ];
  return output;

}

export function generate_columns_defs(isOzon: boolean, grouping = 'size'): ColGroupDef[] {
  const settings = localStorage.getItem('abc_settings_6');

  let WBOZONDEF: ColGroupDef | null = null; 

  switch (grouping) {
    case 'size':
      WBOZONDEF = {
        children: [
          {
            headerName: '',
            field: 'photo_new',
            width: 30,
            cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
            pinned: 'left',
            cellRenderer: (params: { data: IAbcGridDataItem }) => {
              if(params.data.photo_new === 'empty'){
                return ''
              }
              else if(!params.data.photo_new){
                return `<img style="height: 30px; width: 30px" src="/assets/images/nophoto.jpg" />`
              }
              return `<img style="height: 30px; width: 30px" src=${params.data.photo_new} />`
            },
            tooltipField: 'photo_new',
            tooltipComponent: PhotoTooltipComponent,
            tooltipComponentParams: {
              photoField: 'photo_new',
            },
          },
          {
            headerName: 'Артикул МП',
            cellStyle: { textAlign: 'left' },
            cellRenderer: (params: { data: IAbcGridDataItem }) => {
              if(params.data.nmID === 'Итого') {
                return `<strong>Итого</strong>`
              }
              return !isOzon 
              ? `<strong><a href="https://www.wildberries.ru/catalog/${params.data.nmID}/detail.aspx?targetUrl=SP" target="blank">${params.data.nmID}</a></strong>`
              : params.data.nmID
      
            },
            field: 'nmID',
            width: 100,
            filter: 'agTextColumnFilter',
            pinned: 'left',
          },

          {
            headerName: 'Предмет',
            cellStyle: { textAlign: 'left' },
            field: 'object',
            width: 120,
            filter: 'agTextColumnFilter',
            pinned: 'left',
          },
          
          {
            headerName: 'Размер',
            cellStyle: { textAlign: 'left' },
            field: 'size',
            width: 120,
            filter: 'agTextColumnFilter',
            pinned: 'left',
          },
          {
            headerName: 'Артикул поставщика',
            cellStyle: { textAlign: 'left' },
            field: 'sku',
            width: 200,
            filter: 'agTextColumnFilter',
            pinned: 'left',
          },
          {
            headerName: 'ABC',
            field: 'abc',
            width: 70,
            filter: 'agTextColumnFilter',
            pinned: 'left',
            cellStyle: params => {
              return ABC_COLOR_MAP.get(params.value) || {'background-color': 'null'}
            }
          },
        ]
      }
    break;

    case 'article':
      WBOZONDEF = {
        children: [
          {
            headerName: '',
            field: 'photo_new',
            width: 30,
            cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
            pinned: 'left',
            cellRenderer: (params: { data: IAbcGridDataItem }) => {
              if(params.data.photo_new === 'empty'){
                return ''
              }
              else if(!params.data.photo_new){
                return `<img style="height: 30px; width: 30px" src="/assets/images/nophoto.jpg" />`
              }
              return `<img style="height: 30px; width: 30px" src=${params.data.photo_new} />`
            },
            tooltipField: 'photo_new',
            tooltipComponent: PhotoTooltipComponent,
            tooltipComponentParams: {
              photoField: 'photo_new',
            },
          },
          {
            headerName: 'Артикул МП',
            cellStyle: { textAlign: 'left' },
            cellRenderer: (params: { data: IAbcGridDataItem }) => {
              if(params.data.nmID === 'Итого') {
                return `<strong>Итого</strong>`
              }
              return !isOzon 
              ? `<strong><a href="https://www.wildberries.ru/catalog/${params.data.nmID}/detail.aspx?targetUrl=SP" target="blank">${params.data.nmID}</a></strong>`
              : params.data.nmID
      
            },
            field: 'nmID',
            width: 100,
            filter: 'agTextColumnFilter',
            pinned: 'left',
          },
          {
            headerName: 'Предмет',
            cellStyle: { textAlign: 'left' },
            field: 'object',
            width: 120,
            filter: 'agTextColumnFilter',
            pinned: 'left',
          },
          {
            headerName: 'Артикул поставщика',
            cellStyle: { textAlign: 'left' },
            field: 'sku',
            width: 200,
            filter: 'agTextColumnFilter',
            pinned: 'left',
          },
          {
            headerName: 'ABC',
            field: 'abc',
            width: 70,
            filter: 'agTextColumnFilter',
            pinned: 'left',
            cellStyle: params => {
              return ABC_COLOR_MAP.get(params.value) || {'background-color': 'null'}
            }
          },
        ]
      }
    break;

    case 'brand':
      WBOZONDEF = {
        children: [
          {
            headerName: '',
            field: 'photo_new',
            width: 30,
            cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
            pinned: 'left',
            cellRenderer: (params: { data: IAbcGridDataItem }) => {
              if(params.data.photo_new === 'empty'){
                return ''
              }
              else if(!params.data.photo_new){
                return `<img style="height: 30px; width: 30px" src="/assets/images/nophoto.jpg" />`
              }
              return `<img style="height: 30px; width: 30px" src=${params.data.photo_new} />`
            },
            tooltipField: 'photo_new',
            tooltipComponent: PhotoTooltipComponent,
            tooltipComponentParams: {
              photoField: 'photo_new',
            },
          },

          {
            headerName: 'Бренд',
            cellStyle: { textAlign: 'left' },
            field: 'brand',
            width: 120,
            filter: 'agTextColumnFilter',
            pinned: 'left',
          },
          
          {
            headerName: 'ABC',
            field: 'abc',
            width: 70,
            filter: 'agTextColumnFilter',
            pinned: 'left',
            cellStyle: params => {
              return ABC_COLOR_MAP.get(params.value) || {'background-color': 'null'}
            }
          },
        ]
      }
    break;

    case 'subject':
      WBOZONDEF = {
        children: [
          {
            headerName: '',
            field: 'photo_new',
            width: 30,
            cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
            pinned: 'left',
            cellRenderer: (params: { data: IAbcGridDataItem }) => {
              if(params.data.photo_new === 'empty'){
                return ''
              }
              else if(!params.data.photo_new){
                return `<img style="height: 30px; width: 30px" src="/assets/images/nophoto.jpg" />`
              }
              return `<img style="height: 30px; width: 30px" src=${params.data.photo_new} />`
            },
            tooltipField: 'photo_new',
            tooltipComponent: PhotoTooltipComponent,
            tooltipComponentParams: {
              photoField: 'photo_new',
            },
          },

          {
            headerName: 'Предмет',
            cellStyle: { textAlign: 'left' },
            field: 'subject',
            width: 120,
            filter: 'agTextColumnFilter',
            pinned: 'left',
          },
          
          {
            headerName: 'ABC',
            field: 'abc',
            width: 70,
            filter: 'agTextColumnFilter',
            pinned: 'left',
            cellStyle: params => {
              return ABC_COLOR_MAP.get(params.value) || {'background-color': 'null'}
            }
          },
        ]
      };
    break;

    case 'category_pnl':
      WBOZONDEF = {
        children: [
          {
            headerName: '',
            field: 'photo_new',
            width: 30,
            cellStyle: {paddingLeft: '0px', paddingRight: '0px'},
            pinned: 'left',
            cellRenderer: (params: { data: IAbcGridDataItem }) => {
              if(params.data.photo_new === 'empty'){
                return ''
              }
              else if(!params.data.photo_new){
                return `<img style="height: 30px; width: 30px" src="/assets/images/nophoto.jpg" />`
              }
              return `<img style="height: 30px; width: 30px" src=${params.data.photo_new} />`
            },
            tooltipField: 'photo_new',
            tooltipComponent: PhotoTooltipComponent,
            tooltipComponentParams: {
              photoField: 'photo_new',
            },
          },

          {
            headerName: 'Собственная категория',
            cellStyle: { textAlign: 'left' },
            field: 'category_pnl',
            width: 120,
            filter: 'agTextColumnFilter',
            pinned: 'left',
          },
          
          {
            headerName: 'ABC',
            field: 'abc',
            width: 70,
            filter: 'agTextColumnFilter',
            pinned: 'left',
            cellStyle: params => {
              return ABC_COLOR_MAP.get(params.value) || {'background-color': 'null'}
            }
          },
        ]
      }
    break;
  
    default:
      break;
  }

  if (!settings) {
    return [
      WBOZONDEF as ColGroupDef,
      ABS_ANALYST_COLUMN_DEFS[1],
      isOzon ? ABS_ANALYST_COLUMN_DEFS_OZON[2] : ABS_ANALYST_COLUMN_DEFS[2],
      ABS_ANALYST_COLUMN_DEFS[3],
      ABS_ANALYST_COLUMN_DEFS[4],
    ] 
  }

  const parsed = JSON.parse(settings)

  const result =  [
    {
      //@ts-ignore
      children: parsed.filter(p => p.checked && ABS_ANALYST_COLUMN_DEFS[0].children.map(child => child.field).includes(p.key)).map(r => ABS_ANALYST_COLUMN_DEFS[0].children.find(ch => ch.field === r.key))
    },
    {
      headerName: 'ABC Выручка',
      //@ts-ignore
      children: parsed.filter(p => p.checked && ABS_ANALYST_COLUMN_DEFS[1].children.map(child => child.field).includes(p.key)).map(r => ABS_ANALYST_COLUMN_DEFS[1].children.find(ch => ch.field === r.key))
    },
    {
      headerName: 'ABC Валовая прибыль',
      //@ts-ignore
      children: parsed.filter(p => p.checked && ABS_ANALYST_COLUMN_DEFS[2].children.map(child => child.field).includes(p.key)).map(r => ABS_ANALYST_COLUMN_DEFS[2].children.find(ch => ch.field === r.key))
    },
    {
      headerName: 'АВС Оборачиваемость',
      //@ts-ignore
      children: parsed.filter(p => p.checked && ABS_ANALYST_COLUMN_DEFS[3].children.map(child => child.field).includes(p.key)).map(r => ABS_ANALYST_COLUMN_DEFS[3].children.find(ch => ch.field === r.key))
    },
    {
      headerName: 'Юнит-экономика (Затраты на ед.)',
      //@ts-ignore
      children: parsed.filter(p => p.checked && ABS_ANALYST_COLUMN_DEFS[4].children.map(child => child.field).includes(p.key)).map(r => ABS_ANALYST_COLUMN_DEFS[4].children.find(ch => ch.field === r.key))
    },
  ];
  return result;
}