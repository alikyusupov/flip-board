import { DecimalPipe } from "@angular/common";
import { ApexOptions } from "ng-apexcharts";

import { ISalesChartItem } from "./sales.model";


//@ts-nocheck
const decimalPipe = new DecimalPipe('ru-RU');

export function getChartOptions(data: { chart: ISalesChartItem[] }, currency: string): Partial<ApexOptions> {
  return {
    series: [
      {
        name: 'Продажи (шт)',
        type: 'column',
        data: data.chart.map(elem => +elem.sales_count || 0),
        color: '#74db90',
      },
      {
        name: `Продажи (${currency})`,
        type: 'line',
        data: data.chart.map(elem => +elem.sales_sum || 0),
        color: 'rgba(9, 60, 143, 1)',
      },
      {
        name: 'Возвраты (шт)',
        type: 'column',
        data: data.chart.map(elem => +elem.returns_count || 0),
        color: '#e8b0c6',
      },
      {
        name: `Возвраты (${currency})`,
        type: 'line',
        data: data.chart.map(elem => +elem.returns_sum || 0),
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
        seriesName: 'Продажи (шт)',
        opposite: true,
        labels: {
          // @ts-expect-error apexcharts formatter typing does not accept number return
          formatter: (v: number) => decimalPipe.transform(v, '1.0-0'),
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
        seriesName: `Продажи (${currency})`,
        labels: {
          // @ts-expect-error apexcharts formatter typing does not accept number return
          formatter: (v: number) => decimalPipe.transform(v, '1.0-0'),
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
        seriesName: 'Продажи (шт)',
        opposite: true,
        show: false,
        labels: {
          // @ts-expect-error apexcharts formatter typing does not accept number return
          formatter: (v: number) => decimalPipe.transform(v, '1.0-0')
        },
      },
      {
        seriesName: `Продажи (${currency})`,
        show: false,
        labels: {
          // @ts-expect-error apexcharts formatter typing does not accept number return
          formatter: (v: number) => decimalPipe.transform(v, '1.0-0')
        },
      },
    ],
    fill: {
      type: 'solid',
    },
  };
}