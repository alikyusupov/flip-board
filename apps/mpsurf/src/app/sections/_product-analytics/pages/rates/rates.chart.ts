import { DecimalPipe } from "@angular/common";

import { IRatesGridData } from "../../models";
import { ChartOptions } from "./rates.model";

const decimalPipe = new DecimalPipe('ru-RU')


export function getChartOptions(data: IRatesGridData): ChartOptions {

  return {
    series: [
      {
        name: "Заказы (шт)",
        data: data.days.map((elem) => +(elem?.ordersCount || 0)),
        type: "bar",
        color: '#1A74E8',
      },
      {
        name: "Заказы (руб)",
        data: data.days.map((elem) => +(elem?.ordersTotal || 0)),
        type: "line",
        color: 'rgba(9, 60, 143, 1)',
      },
      {
        name: 'Продажи (шт)',
        type: 'bar',
        data: data.days.map((elem) => +(elem?.salesCount || 0)),
        color: '#74db90',
      },
      {
        name: 'Продажи (руб)',
        type: 'line',
        data: data.days.map((elem) => +(elem?.salesTotal || 0)),
        color: 'rgba(10, 105, 26, 1)',
      },
      {
        name: 'Возвраты (шт)',
        type: 'bar',
        data: data.days.map((elem) => +(elem?.returnsCount || 0)),
        color: '#e8b0c6',
      },
      {
        name: 'Возвраты (руб)',
        type: 'line',
        data: data.days.map((elem) => +(elem?.returnsTotal || 0)),
        color: 'rgba(186, 20, 20, 1)',
      },
      {
        name: 'Отмены (шт)',
        type: 'bar',
        data: data.days.map((elem) => +(elem?.cancelsCount || 0)),
        color: '#feb019',
      },
      {
        name: 'Отмены (руб)',
        type: 'line',
        data: data.days.map((elem) => +(elem?.cancelsTotal || 0)),
        color: '#c99928',
      },
    ],
    chart: {
      height: 480,
      type: 'area',
      stacked: false,
      animations: {
        enabled: true,
      },
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
      categories: data.days.map((elem) => elem.date),
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
        seriesName: 'Заказы (руб)',
        labels: {
          formatter: (v: number) => `${decimalPipe.transform(v, '1.0-0')}`
        },
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        title: {
          text: 'Рубли',
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
          formatter: (v: number) => `${decimalPipe.transform(v, '1.0-0')}`
        },
      },
      {
        seriesName: 'Заказы (руб)',
        show: false,
        labels: {
          formatter: (v: number) => `${decimalPipe.transform(v, '1.0-0')}`
        },
      },
      {
        seriesName: 'Заказы (шт)',
        opposite: true,
        show: false,
        labels: {
          formatter: (v: number) => `${decimalPipe.transform(v, '1.0-0')}`
        },
      },
      {
        seriesName: 'Заказы (руб)',
        show: false,
        labels: {
          formatter: (v: number) => `${decimalPipe.transform(v, '1.0-0')}`
        },
      },
      {
        seriesName: 'Заказы (шт)',
        opposite: true,
        show: false,
        labels: {
          formatter: (v: number) => `${decimalPipe.transform(v, '1.0-0')}`
        },
      },
      {
        seriesName: 'Заказы (руб)',
        show: false,
        labels: {
          formatter: (v: number) => `${decimalPipe.transform(v, '1.0-0')}`
        },
      },
    ],
    fill: {
      type: 'solid',
    },
  }
}