import { DecimalPipe } from "@angular/common";
import { ApexOptions } from "ng-apexcharts";

import { IFullTableItem, IGeneralInfoTable, IPlanFactChartItem } from "./plan-fact.model";

const decimalPipe = new DecimalPipe('ru-RU')

export function mapToRows(data: IGeneralInfoTable, currency: string){

    const firstRow = {
      name: `Сумма в ${currency} в день`,
      plan: Object.entries(data).filter(([key, ]) => key === 'plan').map(([, value]) => value.sum_day)[0], 
      fact: Object.entries(data).filter(([key, ]) => key === 'fact').map(([, value]) => value.sum_day)[0], 
      delta1: Object.entries(data).filter(([key, ]) => key === 'delta_rub').map(([, value]) => value.sum_day)[0], 
      delta2: Object.entries(data).filter(([key, ]) => key === 'delta_percent').map(([, value]) => value.sum_day)[0], 
    }
    const secondRow = {
      name: `Сумма в ${currency} на сегодня`,
      plan: Object.entries(data).filter(([key, ]) => key === 'plan').map(([, value]) => value.sum_today)[0], 
      fact: Object.entries(data).filter(([key, ]) => key === 'fact').map(([, value]) => value.sum_today)[0], 
      delta1: Object.entries(data).filter(([key, ]) => key === 'delta_rub').map(([, value]) => value.sum_today)[0], 
      delta2: Object.entries(data).filter(([key, ]) => key === 'delta_percent').map(([, value]) => value.sum_today)[0], 
    }
    const thirdRow = {
      name: `Сумма в ${currency}`,
      plan: Object.entries(data).filter(([key, ]) => key === 'plan').map(([, value]) => value.sum_rub)[0], 
      fact: Object.entries(data).filter(([key, ]) => key === 'fact').map(([, value]) => value.sum_rub)[0], 
      delta1: Object.entries(data).filter(([key, ]) => key === 'delta_rub').map(([, value]) => value.sum_rub)[0], 
      delta2: Object.entries(data).filter(([key, ]) => key === 'delta_percent').map(([, value]) => value.sum_rub)[0], 
    }

    return [
      firstRow,
      secondRow,
      thirdRow
    ]
}

export function getChartOptions(data: IPlanFactChartItem[], currency: string): Partial<ApexOptions>{
    return {
        series: [
          {
            name: 'Заказы (шт)',
            type: 'column',
            data: data.map((elem) => Number(elem.ordersCount) || 0),
            color: '#1A74E8',
          },
          {
            name: `Заказы (${currency})`,
            type: 'line',
            data: data.map((elem) => elem.ordersTotal || 0),
            color: 'rgba(9, 60, 143, 1)',
          },
          {
            name: 'Продажи (шт)',
            type: 'column',
            data: data.map((elem) => Number(elem.salesCount) || 0),
            color: '#74db90',
          },
          {
            name: `Продажи (${currency})`,
            type: 'line',
            data: data.map((elem) => Number(elem.salesTotal) || 0),
            color: 'rgba(10, 105, 26, 1)',
          },
          {
            name: 'Возвраты (шт)',
            type: 'column',
            data: data.map((elem) => Number(elem.returnsCount) || 0),
            color: '#e8b0c6',
          },
          {
            name: `Возвраты (${currency})`,
            type: 'line',
            data: data.map((elem) => Number(elem.returnsTotal) || 0),
            color: 'rgba(186, 20, 20, 1)',
          },
          {
            name: 'Отмены (шт)',
            type: 'column',
            data: data.map((elem) => Number(elem.cancelsCount) || 0),
            color: '#feb019',
          },
          {
            name: `Отмены (${currency})`,
            type: 'line',
            data: data.map((elem) => elem.cancelsTotal || 0),
            color: '#c99928',
          },
        ],
        chart: {
          height: 360,
          type: 'area',
          stacked: false,
          animations: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 3,
            borderRadiusApplication: 'end',
          }
        },
        dataLabels: { 
          enabled: false 
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          type: 'category',
          categories: data.map((elem) => elem.date),
        },
        yaxis: [
          {
            seriesName: 'Заказы (шт)',
            opposite: true,
            labels: {},
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
            },
            title: {
              text: 'Штуки',
              style: {
                color: '#000000',
              },
            },
            min: 0,
          },
          {
            seriesName: `Заказы (${currency})`,
            labels: {
              formatter: (v: number) => decimalPipe.transform(v, '1.0-0') as string
            },
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
            },
            title: {
              text: `${currency}`,
              style: {
                color: '#000000',
              },
            },
            min: 0,
          },
          {
            seriesName: 'Заказы (шт)',
            opposite: true,
            show: false,
          },
          {
            seriesName: `Заказы (${currency})`,
            show: false,
            labels: {
              formatter: (v: number) => decimalPipe.transform(v, '1.0-0') as string
            },
          },
          {
            seriesName: 'Заказы (шт)',
            opposite: true,
            show: false,
          },
          {
            seriesName: `Заказы (${currency})`,
            show: false,
            labels: {
              formatter: (v: number) => decimalPipe.transform(v, '1.0-0') as string
            },
          },
          {
            seriesName: 'Заказы (шт)',
            opposite: true,
            show: false,
          },
          {
            seriesName: `Заказы (${currency})`,
            show: false,
            labels: {
              formatter: (v: number) => decimalPipe.transform(v, '1.0-0') as string
            },
          },
        ],
        fill: {
          type: 'solid',
        },
    };
}

export function getDateKeys(data: IFullTableItem[]): string[] {
  
  const rowData = data[0];

  const keys = Object.entries(rowData).filter(([key,]) => key.match(/^\d/)).map(([key,]) => key)

  return keys
}