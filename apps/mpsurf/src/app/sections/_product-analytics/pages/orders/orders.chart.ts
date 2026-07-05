import { DecimalPipe } from "@angular/common";
import { ApexOptions } from "ng-apexcharts";

import { IOrdersChartItem } from "./orders.model";


const decimalPipe = new DecimalPipe('ru-RU');

export function getChartOptions(data: { chart: IOrdersChartItem[] }, currency: string): Partial<ApexOptions> {
  return {
    series: [
      {
        name: 'Заказы (шт)',
        type: 'column',
        data: data.chart.map(elem => +elem.orders_count || 0),
        color: '#74db90',
      },
      {
        name: `Заказы (${currency})`,
        type: 'line',
        data: data.chart.map(elem => +elem.orders_sum || 0),
        color: 'rgba(9, 60, 143, 1)',
      },
      {
        name: 'Отмены (шт)',
        type: 'column',
        data: data.chart.map(elem => +elem.cancel_count || 0),
        color: '#e8b0c6',
      },
      {
        name: `Отмены (${currency})`,
        type: 'line',
        data: data.chart.map(elem => +elem.cancel_sum || 0),
        color: 'rgba(186, 20, 20, 1)',
      },
    ],
    chart: {
      height: 480,
      type: 'area',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
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
      categories: data.chart.map(elem => elem.gr_date),
    },
    yaxis: [
      {
        seriesName: 'Заказы (шт)',
        opposite: true,
        labels: {
          formatter: (v: number) => decimalPipe.transform(v, '1.0-0') as string,
        },
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
          formatter: (v: number) => decimalPipe.transform(v, '1.0-0') as string,
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
        labels: {
          formatter: (v: number) => decimalPipe.transform(v, '1.0-0') as string
        },
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