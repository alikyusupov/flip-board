import { DecimalPipe } from "@angular/common";
import { ApexOptions } from "ng-apexcharts";

import { IPNLGridData } from "./pnl.model";

const decimalPipe = new DecimalPipe('ru-RU')

const DATA_KEYS_TO_SKIP = new Set(['item_id', 'name', 'total']);
const NET_INCOME_ITEM_ID = 55;
const GROSS_INCOME_ITEM_ID = 51;
const PROFITABILITY_ITEM_ID = 1055;

function extractNumberMarkers(row?: Record<string, string | number | null>): number[] {
  if (!row) return [];

  return Object.entries(row)
    .filter(([key]) => !DATA_KEYS_TO_SKIP.has(key))
    .map(([, value]) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        const parsedValue = parseFloat(value.replace(',', '.'));
        return Number.isFinite(parsedValue) ? parsedValue : 0;
      }

      return 0;
    });
}

export function generateChartOptions(data: IPNLGridData, currency: string): Partial<ApexOptions> {
    const netIncomeData = data.data.find((elem) => elem.data['item_id'] === NET_INCOME_ITEM_ID);
    const grossIncomeData = data.data.find((elem) => elem.data['item_id'] === GROSS_INCOME_ITEM_ID);
    const profitabilityData = netIncomeData?.children?.find(
      (child) => child.data['item_id'] === PROFITABILITY_ITEM_ID
    );

    const labels = data.columns
    .filter((column) => column.header !== 'Итого')
    .map((column) => column.header);

    const netIncomeDataMarkers = extractNumberMarkers(netIncomeData?.data);
    const grossIncomeDataMarkers = extractNumberMarkers(grossIncomeData?.data);
    const profitabilityDataMarkers = extractNumberMarkers(profitabilityData?.data);


    return {
        legend: {
            position: 'top'
        },
        series: [
            {
                name: `Чистая прибыль (${currency})`,
                type: 'column',
                color: '#4286f4',
                data: netIncomeDataMarkers
            },
            {
                name: `Валовый доход (${currency})`,
                type: 'line',
                color: 'gray',
                data: grossIncomeDataMarkers
            },
            {
                name: 'Рентабельность по чистой прибыли (%)',
                type: 'line',
                color: 'green',
                data: profitabilityDataMarkers
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
        dataLabels: { 
            enabled: true,
            formatter: (v: number) => {
                return decimalPipe.transform(v, '1.0-0') as string
            },
        },
        xaxis: {
            type: 'category',
            categories: labels,
        },
        yaxis: [
            {
                seriesName: `Чистая прибыль (${currency})`,
                labels: {
                    formatter: (v: number) => decimalPipe.transform(v, '1.0-2') as string
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
            },
            {
                seriesName: 'Чистая прибыль (руб)',
                show: false,
                labels: {
                    formatter: (v: number) => decimalPipe.transform(v, '1.0-2') as string
                },
            },
            {
                seriesName: 'Рентабельность по чистой прибыли (%)',
                opposite: true,
                labels: {},
                title: {
                    text: 'Проценты',
                    style: {
                        color: '#000000',
                    },
                },
            },
        ],
        stroke: { curve: 'smooth', width: [2, 3, 3],  dashArray: [0, 4, 0]},
    }
}