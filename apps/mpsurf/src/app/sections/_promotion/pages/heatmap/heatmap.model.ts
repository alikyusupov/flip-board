import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export interface HeatMapCharts  {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colors: any[];
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  grid: ApexGrid;
};

export const HeatMapChartOptionsGeneral: HeatMapChartOptionsGeneral = {
  stroke: { show: true, width: 2, colors: ['transparent'] },
  xaxisWithTime: {
    type: 'category',
    categories: [
      '0:00 - 1:00',
      '1:00 - 2:00',
      '2:00 - 3:00',
      '3:00 - 4:00',
      '4:00 - 5:00',
      '5:00 - 6:00',
      '6:00 - 7:00',
      '7:00 - 8:00',
      '8:00 - 9:00',
      '9:00 - 10:00',
      '10:00 - 11:00',
      '11:00 - 12:00',
      '12:00 - 13:00',
      '13:00 - 14:00',
      '14:00 - 15:00',
      '15:00 - 16:00',
      '16:00 - 17:00',
      '17:00 - 18:00',
      '18:00 - 19:00',
      '19:00 - 20:00',
      '20:00 - 21:00',
      '21:00 - 22:00',
      '22:00 - 23:00',
      '23:00 - 00:00',
    ],
  },
  xaxisWithDays: { type: 'category', categories: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'] },
};

export interface HeatMapChartOptionsGeneral {
  xaxisWithTime: { type: string, categories: string[] };
  xaxisWithDays: { type: string, categories: string[] };
  stroke: { show: boolean, width: number, colors: string[] };
};

export interface IHeatMapOrders {
  orders: Record<string, number | number[]>,
  avg: {
    avgcheck_day_avg: number[],
    avgcheck_day_total: number[],
    avgcheck_hours_avg: number[],
    avgcheck_hours_total: number[],
    check: Record<string, number[]>,
    sum_total: number
  },
}

export interface IHeatMapSales {
  sales: Record<string, number | number[]>
}

export interface IHeatMapFilterItem {
  name: string
}