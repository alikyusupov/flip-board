import { DecimalPipe } from "@angular/common";
import { ApexOptions } from "ng-apexcharts";

import { IStatsChartItem } from "./stats.model";

const decimalPipe = new DecimalPipe('ru-RU');

export function getChartOptions(data: IStatsChartItem[], currency: string): Partial<ApexOptions> {
  return {
    series: [
      {
        name: 'Заказы (шт)',
        type: 'column',
        data: data.map(elem => +elem.orders_count || 0),
        color: '#74db90',
      },
      {
        name: `Заказы (тыс.${currency})`,
        type: 'line',
        data: data.map(elem => +elem.orders_sum || 0),
        color: 'rgba(9, 60, 143, 1)',
      },
      {
        name: 'Реклама (шт)',
        type: 'column',
        data: data.map(elem => +elem.adv_count || 0),
        color: '#e8b0c6',
      },
      {
        name:`Реклама (${currency})`,
        type: 'line',
        data: data.map(elem => +elem.adv_sum || 0),
        color: 'rgba(186, 20, 20, 1)',
      },
    ],
    chart: {
      type: 'area',
      height: 360,
      stacked: false,
      animations: {
        enabled: true,
      },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: [2, 3, 2, 3] },
    legend: { horizontalAlign: 'center', position: 'bottom' },
    xaxis: {
      type: 'category',
      categories: data.map(elem => elem.date),
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
        seriesName: `Заказы (тыс.${currency})`,
        labels: {
          formatter: (v: number) => decimalPipe.transform(v/1000, '1.0-0') as string,
        },
        axisTicks: {
          show: true,
          color: 'rgba(9, 60, 143, 1)',
        },
        axisBorder: {
          show: true,
          color: 'rgba(9, 60, 143, 1)',
        },
        title: {
          text: `Заказы (тыс.${currency})`,
          style: {
            color: 'rgba(9, 60, 143, 1)',
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
        seriesName: `Реклама (${currency})`,
        labels: {
          formatter: (v: number) => decimalPipe.transform(v, '1.0-0') as string,
        },
        axisTicks: {
          show: true,
          color: 'rgba(186, 20, 20, 1)',
        },
        axisBorder: {
          show: true,
          color: 'rgba(186, 20, 20, 1)',
        },
        title: {
          text: `Реклама (${currency})`,
          style: {
            color: 'rgba(186, 20, 20, 1)',
          },
        },
        min: 0,
      },
    ],
  };
}