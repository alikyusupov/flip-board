// ChartOptions 1
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { HeatMapChartOptionsGeneral, HeatMapCharts, IHeatMapOrders, IHeatMapSales } from './heatmap.model';

export function OrdersAverageCheckByDayOfWeekPlotOptionsSerializer(data: IHeatMapOrders) {
  const averageOrders = [];
  const maxInOrders = [];
  for (const averageOrder in data.avg.check) {
    maxInOrders.push(Math.max(...data.avg.check[averageOrder]));
    averageOrders.push(data.avg.check[averageOrder].reduce((a, b) => a + b) / data.avg.check[averageOrder].length);
  }
  const average = Math.ceil(averageOrders.reduce((a, b) => a + b) / averageOrders.length);

  let rangeChar = [];
  if (average === 0) {
    rangeChar = [{ from: 0, to: 0, color: '#808080' }];
  } else {
    rangeChar = [
      { from: 0, to: 0, color: '#808080' },
      { from: 1, to: average, color: '#d1eb75' },
      {
        from: average + 1,
        to: Math.max(...maxInOrders),
        color: '#78be37',
      },
    ];
  }
  return {
    plotOptions: {
      heatmap: {
        radius: 0,
        enableShades: true,
        shadeIntensity: 0.5,
        colorScale: { ranges: rangeChar },
      },
    },
  };
}

export function GenerateSalesByDayOfWeek(data: IHeatMapSales): Partial<HeatMapCharts> {

  const fist_max = Math.ceil(data.sales['qty_total'] / 2);
  const ranges = [
    { from: 0, to: 0, color: '#808080' },
    { from: 1, to: fist_max, color: '#d1eb75' },
    { from: fist_max + 1, to: data.sales['qty_total'], color: '#78be37' },
  ];

  return {
    series: [
      { name: '23:00 - 00:00', data: data.sales['line23'] },
      { name: '22:00 - 23:00', data: data.sales['line22'] },
      { name: '21:00 - 22:00', data: data.sales['line21'] },
      { name: '20:00 - 21:00', data: data.sales['line20'] },
      { name: '19:00 - 20:00', data: data.sales['line19'] },
      { name: '18:00 - 19:00', data: data.sales['line18'] },
      { name: '17:00 - 18:00', data: data.sales['line17'] },
      { name: '16:00 - 17:00', data: data.sales['line16'] },
      { name: '15:00 - 16:00', data: data.sales['line15'] },
      { name: '14:00 - 15:00', data: data.sales['line14'] },
      { name: '13:00 - 14:00', data: data.sales['line13'] },
      { name: '12:00 - 13:00', data: data.sales['line12'] },
      { name: '11:00 - 12:00', data: data.sales['line11'] },
      { name: '10:00 - 11:00', data: data.sales['line10'] },
      { name: '9:00 - 10:00', data: data.sales['line9'] },
      { name: '8:00 - 9:00', data: data.sales['line8'] },
      { name: '7:00 - 8:00', data: data.sales['line7'] },
      { name: '6:00 - 7:00', data: data.sales['line6'] },
      { name: '5:00 - 6:00', data: data.sales['line5'] },
      { name: '4:00 - 5:00', data: data.sales['line4'] },
      { name: '3:00 - 4:00', data: data.sales['line3'] },
      { name: '2:00 - 3:00', data: data.sales['line2'] },
      { name: '1:00 - 2:00', data: data.sales['line1'] },
      { name: '0:00 - 1:00', data: data.sales['line0'] },
    ],
    chart: { height: 710, type: 'heatmap' },
    colors: ['#78be37'],
    plotOptions: {
      heatmap: {
        radius: 0,
        enableShades: true,
        shadeIntensity: 0.5,
        colorScale: { ranges: ranges },
      },
    },
    xaxis: HeatMapChartOptionsGeneral.xaxisWithDays,
    dataLabels: {
      style: {
        colors: ['#636363']
      },
    },
    grid: {
      padding: { right: 30 },
    },
  };
}

export function GenerateSalesByDayFromTo(data: IHeatMapSales): Partial<HeatMapCharts> {
  return {
    chart: { height: '710', type: 'bar' },
    dataLabels: { enabled: true, offsetY: -20, style: { colors: ['#304758'] } },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%',
        dataLabels: { position: 'top' },
      },
    },
    series: [
      { name: 'Количество продаж за выбранный период, в шт', data: data.sales['day_total'] },
      { name: 'Среднее в день в выбранном периоде, шт', data: data.sales['avg_total'] },
    ],
    stroke: HeatMapChartOptionsGeneral.stroke,
    xaxis: HeatMapChartOptionsGeneral.xaxisWithDays,
  };
}

export function GenerateSalesByHoursFromTo(data: IHeatMapSales): Partial<HeatMapCharts> {
  return {
    chart: { height: '710', type: 'area' },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '50%',
      },
    },
    series: [
      { name: 'Количество продаж за выбранный период, в шт', data: data.sales['hours_total'] },
      { name: 'Среднее в день в выбранном периоде, шт', data: data.sales['avg_hours_total'] },
    ],
    stroke: HeatMapChartOptionsGeneral.stroke,
    xaxis: {
      labels: {
        style: {
          fontSize: '11px',
        },
      },
      categories: HeatMapChartOptionsGeneral.xaxisWithTime.categories,
    },
  };
}

export function GenerateOrdersByDayOfWeek(data: IHeatMapOrders): Partial<HeatMapCharts> {
  const fistMax = Math.ceil(data.orders['qty_total'] / 2);
  let rangeChar;
  if (fistMax === 0) {
    rangeChar = [{ from: 0, to: 0, color: '#808080' }];
  } else {
    rangeChar = [
      { from: 0, to: 0, color: '#808080' },
      { from: 1, to: fistMax, color: '#d1eb75' },
      {
        from: fistMax + 1,
        to: data.orders['qty_total'],
        color: '#78be37',
      },
    ];
  }
  return {
    series: [
      //  { name: "Средний по дням", data: data.orders.avg_total },
      { name: '23:00 - 00:00', data: data.orders['line23'] },
      { name: '22:00 - 23:00', data: data.orders['line22'] },
      { name: '21:00 - 22:00', data: data.orders['line21'] },
      { name: '20:00 - 21:00', data: data.orders['line20'] },
      { name: '19:00 - 20:00', data: data.orders['line19'] },
      { name: '18:00 - 19:00', data: data.orders['line18'] },
      { name: '17:00 - 18:00', data: data.orders['line17'] },
      { name: '16:00 - 17:00', data: data.orders['line16'] },
      { name: '15:00 - 16:00', data: data.orders['line15'] },
      { name: '14:00 - 15:00', data: data.orders['line14'] },
      { name: '13:00 - 14:00', data: data.orders['line13'] },
      { name: '12:00 - 13:00', data: data.orders['line12'] },
      { name: '11:00 - 12:00', data: data.orders['line11'] },
      { name: '10:00 - 11:00', data: data.orders['line10'] },
      { name: '9:00 - 10:00', data: data.orders['line9'] },
      { name: '8:00 - 9:00', data: data.orders['line8'] },
      { name: '7:00 - 8:00', data: data.orders['line7'] },
      { name: '6:00 - 7:00', data: data.orders['line6'] },
      { name: '5:00 - 6:00', data: data.orders['line5'] },
      { name: '4:00 - 5:00', data: data.orders['line4'] },
      { name: '3:00 - 4:00', data: data.orders['line3'] },
      { name: '2:00 - 3:00', data: data.orders['line2'] },
      { name: '1:00 - 2:00', data: data.orders['line1'] },
      { name: '0:00 - 1:00', data: data.orders['line0'] },
    ],
    chart: { height: 710, type: 'heatmap' },
    colors: ['#78be37'],
    plotOptions: {
      heatmap: {
        radius: 0,
        enableShades: true,
        shadeIntensity: 0.5,
        colorScale: { ranges: rangeChar },
      },
    },
    dataLabels: {
      style: {
        colors: ['#636363']
      },
    },
    xaxis: HeatMapChartOptionsGeneral.xaxisWithDays,
    grid: {
      padding: { right: 30 },
    },
  };
}

export function GenerateOrdersByDayOfWeekFromTo(data: IHeatMapOrders): Partial<HeatMapCharts> {
  return {
    chart: {
      height: '710',
      type: 'bar',
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        colors: ['#304758'],
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '65%',
        dataLabels: {
          position: 'top',
        },
      },
    },
    series: [
      { name: 'Кол-во заказов за период, шт', data: data.orders['order_day_qty_total'] },
      { name: 'Среднее кол-во заказов за период, шт', data: data.orders['order_day_qty_avg'] },
    ],
    stroke: HeatMapChartOptionsGeneral.stroke,
    xaxis: HeatMapChartOptionsGeneral.xaxisWithDays,
  };
}

export function GenerateOrdersByHoursFromTo(data: IHeatMapOrders): Partial<HeatMapCharts> {
  return {
    chart: {
      height: '710',
      type: 'area',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '50%',
      },
    },
    series: [
      { name: 'Кол-во заказов за период, шт', data: data.orders['order_day_hours_total'] },
      { name: 'Среднее кол-во заказов за период, шт', data: data.orders['order_day_hours_avg'] },
    ],
    stroke: HeatMapChartOptionsGeneral.stroke,
    xaxis: {
      labels: {
        style: {
          fontSize: '11px',
        },
      },
      categories: HeatMapChartOptionsGeneral.xaxisWithTime.categories,
    },
  };
}

export function GenerateOrdersAverageCheckByDayOfWeek(data: IHeatMapOrders): Partial<HeatMapCharts> {
  return {
    series: [
      //  { name: "Средний по дням", data: data.orders.avg_total },
      { name: '23:00 - 00:00', data: data.avg.check['line23'] },
      { name: '22:00 - 23:00', data: data.avg.check['line22'] },
      { name: '21:00 - 22:00', data: data.avg.check['line21'] },
      { name: '20:00 - 21:00', data: data.avg.check['line20'] },
      { name: '19:00 - 20:00', data: data.avg.check['line19'] },
      { name: '18:00 - 19:00', data: data.avg.check['line18'] },
      { name: '17:00 - 18:00', data: data.avg.check['line17'] },
      { name: '16:00 - 17:00', data: data.avg.check['line16'] },
      { name: '15:00 - 16:00', data: data.avg.check['line15'] },
      { name: '14:00 - 15:00', data: data.avg.check['line14'] },
      { name: '13:00 - 14:00', data: data.avg.check['line13'] },
      { name: '12:00 - 13:00', data: data.avg.check['line12'] },
      { name: '11:00 - 12:00', data: data.avg.check['line11'] },
      { name: '10:00 - 11:00', data: data.avg.check['line10'] },
      { name: '9:00 - 10:00', data: data.avg.check['line9'] },
      { name: '8:00 - 9:00', data: data.avg.check['line8'] },
      { name: '7:00 - 8:00', data: data.avg.check['line7'] },
      { name: '6:00 - 7:00', data: data.avg.check['line6'] },
      { name: '5:00 - 6:00', data: data.avg.check['line5'] },
      { name: '4:00 - 5:00', data: data.avg.check['line4'] },
      { name: '3:00 - 4:00', data: data.avg.check['line3'] },
      { name: '2:00 - 3:00', data: data.avg.check['line2'] },
      { name: '1:00 - 2:00', data: data.avg.check['line1'] },
      { name: '0:00 - 1:00', data: data.avg.check['line0'] },
    ],
    chart: {
      height: 710,
      type: 'heatmap',
    },
    colors: ['#78be37'],
    plotOptions: OrdersAverageCheckByDayOfWeekPlotOptionsSerializer(data)?.plotOptions, // TODO - speccially for OrdersAverageCheckByDayOfWeek
    xaxis: HeatMapChartOptionsGeneral?.xaxisWithDays,
    yaxis: {
      labels: {
        formatter: (val,) => {
          return val?.toLocaleString('ru-RU');
        },
      },
    },
    grid: {
      padding: { right: 30 },
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      offsetX: -10,
      formatter: (val) => {
        return val?.toLocaleString('ru-RU');
      },
      style: {
        colors: ['#636363']
      },
    },
  };
}

export function GenerateOrdersInRubblesByDay(data: IHeatMapOrders, currency: string): Partial<HeatMapCharts> {
  return {
    series: [
      { name: `Сумма заказов за период, ${currency}`, data: data.avg.avgcheck_day_total },
      { name: `Средняя сумма заказов за период, ${currency}`, data: data.avg.avgcheck_day_avg },
    ],
    stroke: { show: true, width: 1, colors: ['transparent'] },
    chart: { height: 710, type: 'bar' },
    colors: ['#78be37'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '95%',
        dataLabels: {
          position: 'top',
        },
      },
    },
    xaxis: HeatMapChartOptionsGeneral.xaxisWithDays,
    yaxis: {
      labels: {
        formatter: (val,) => {
          return val?.toLocaleString('ru-RU');
        },
      },
    },
    title: { text: 'Средний чек по заказам по дням недели' },
    grid: {
      padding: { right: 30 },
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      offsetX: -22,
      offsetY: -20,
      formatter: (val,) => {
        return val?.toLocaleString('ru-RU');
      },
      style: {
        colors: ['#304758'],
      },
    },
  };
}

export function GenerateOrdersAverageReceiptByHours(data: IHeatMapOrders): Partial<HeatMapCharts> {
  return {
    series: [
      { name: 'Всего', data: data.avg.avgcheck_hours_total },
      { name: 'Среднее', data: data.avg.avgcheck_hours_avg },
    ],
    stroke: { show: true, width: 1, colors: ['transparent'] },
    chart: { height: '710', type: 'area' },
    colors: ['#78be37'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '95%',
        dataLabels: {
          position: 'top',
        },
      },
    },
    xaxis: HeatMapChartOptionsGeneral.xaxisWithTime,
    yaxis: {
      labels: {
        formatter: (val,) => {
          return val?.toLocaleString('ru-RU');
        },
      },
    },
    title: { text: 'Средний чек по заказам' },
    grid: {
      padding: { right: 30 },
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      offsetX: -12,
      formatter: (val,) => {
        return val?.toLocaleString('ru-RU');
      },
    },
  };
}
