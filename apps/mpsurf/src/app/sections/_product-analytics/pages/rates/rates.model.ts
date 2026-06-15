import { 
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTheme,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis} from "ng-apexcharts";

export interface IRatesCommonRowData {
  ordersCount: string,
  cancelsCount: string,
  ordersTotal: number,
  cancelsTotal: number,
  salesCount: string,
  returnsCount: string,
  salesTotal: number,
  returnsTotal: number,
  photo_new: null | string,
}

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis[];
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip?: ApexTooltip;
  stroke: ApexStroke;
  legend?: ApexLegend;
  theme?: ApexTheme
}

export enum TableGroupBy {
  BY_DATE,
  BY_PRODUCT,
}