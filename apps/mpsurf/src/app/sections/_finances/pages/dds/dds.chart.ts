/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DecimalPipe } from "@angular/common";
import { ApexOptions } from "ng-apexcharts";

import { IDDSGridData, IRecursiveData } from "./dds.model";

const decimalPipe = new DecimalPipe('ru-RU')


export function generateChartOptions(data: IDDSGridData, currency: string): Partial<ApexOptions> | null{
    const financeActivityData = data.data.find(elem => elem.data['name'] === 'Финансовая деятельность') as IRecursiveData;
    const investActivityData = data.data.find(elem => elem.data['name'] === 'Инвестиционная деятельность') as IRecursiveData;
    const operationActivityData = data.data.find(elem => elem.data['name'] === 'Операционная деятельность') as IRecursiveData;

    const availableFacilitiesData = data.data.find(elem => elem.data['name'] === 'Доступные средства на конец периода');
    const turnoverData = data.data.find(elem => elem.data['name'] === 'Оборот денег за период');


    const labels = data.columns.map((column) => {
        return column.header
    })

    // @ts-ignore: Object is possibly 'null'.
    const fininceIncomeMarkers = Object.entries(financeActivityData.children.find(child => child.data['name'] === 'Поступления').data).filter(([key,]) => key !== 'name')
    // @ts-ignore: Object is possibly 'null'.
    const investIncomeMarkers = Object.entries(investActivityData.children.find(child => child.data.name === 'Поступления').data).filter(([key,]) => key !== 'name')
    // @ts-ignore: Object is possibly 'null'.
    const operationIncomeMarkers = Object.entries(operationActivityData.children.find(child => child.data.name === 'Поступления').data).filter(([key,]) => key !== 'name')
    // @ts-ignore: Object is possibly 'null'.
    const availableFacilitiesMarkers = Object.entries(availableFacilitiesData.data).filter(([key, ]) => key !== 'name').map(([, v]) => v ? +v : 0)
    const turnoverMarkers = data.columns.map(column => {
      // @ts-ignore: Object is possibly 'null'.
        if(turnoverData.data[column.field]){
          // @ts-ignore: Object is possibly 'null'.
            return +turnoverData.data[column.field]
        } else {
            return 0
        }
    })

    const totalIncomeMarkers = fininceIncomeMarkers.map(([, value], index) => {
        const normalizedValueOne = value ? +value : 0
        const normalizedValueTwo = investIncomeMarkers[index][1] ? + investIncomeMarkers[index][1] : 0
        const normalizedValueThree = operationIncomeMarkers[index][1] ? + operationIncomeMarkers[index][1] : 0
        return normalizedValueOne + normalizedValueTwo + normalizedValueThree
    })

    // @ts-ignore: Object is possibly 'null'.
    const fininceOutcomeMarkers = Object.entries(financeActivityData.children.find(child => child.data.name === 'Списания').data).filter(([key, ]) => key !== 'name')
    // @ts-ignore: Object is possibly 'null'.
    const investOutcomeMarkers = Object.entries(investActivityData.children.find(child => child.data.name === 'Списания').data).filter(([key, ]) => key !== 'name')
    // @ts-ignore: Object is possibly 'null'.
    const operationOutcomeMarkers = Object.entries(operationActivityData.children.find(child => child.data.name === 'Списания').data).filter(([key, ]) => key !== 'name')

    const totalOutcomeMarkers = fininceOutcomeMarkers.map(([, value], index) => {
        const normalizedValueOne = value ? +value : 0
        const normalizedValueTwo = investOutcomeMarkers[index][1] ? + investOutcomeMarkers[index][1] : 0
        const normalizedValueThree = operationOutcomeMarkers[index][1] ? + operationOutcomeMarkers[index][1] : 0
        return normalizedValueOne + normalizedValueTwo + normalizedValueThree
    })


    return {
        legend: {
            position: 'top'
        },
        series: [
            {
                name: `Поступления (${currency})`,
                type: 'column',
                color: '#0a691a',
                data: totalIncomeMarkers as number[]
            },
            {
                name: `Списания (${currency})`,
                type: 'column',
                color: '#df2e2e',
                data: totalOutcomeMarkers as number[]
            },
            {
                name: `Доступные средства на конец периода (${currency})`,
                type: 'line',
                color: '#4286f4',
                data: availableFacilitiesMarkers as number[]
            },
            {
                name: `Оборот денег за период (${currency})`,
                type: 'line',
                color: 'black',
                data: turnoverMarkers as number[]
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
        dataLabels: { enabled: true, formatter: val => decimalPipe.transform(val as number, '1.0-0') as string },
        xaxis: {
            type: 'category',
            categories: labels,
        },
        yaxis: [
            {
                seriesName: `Поступления (${currency})`,
                labels: {
                    formatter: (v: number) => decimalPipe.transform(v, '1.0-2') as string,
                },
                title: {
                    style: {
                        color: '#000000',
                    },
                },
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#000000'
                },
            },
            {
                seriesName: `Поступления (${currency})`,
                show: false,
                labels: {
                    formatter: (v: number) => decimalPipe.transform(v, '1.0-2') as string
                },
            },
            {
                seriesName: `Поступления (${currency})`,
                labels: {
                    formatter: (v: number) => decimalPipe.transform(v, '1.0-2') as string,
                    style: {
                        colors:"#0a691a"
                    }
                },
                title: {
                    text: `${currency}`,
                    style: {
                        color: '#0a691a',
                    },
                },
            },
            {
                seriesName: `Поступления (${currency})`,
                show: false,
                labels: {
                    formatter: (v: number) => decimalPipe.transform(v, '1.0-2') as string
                },
            },
        ],
        stroke: { curve: 'smooth', width: [2, 2, 3, 3], dashArray: [0, 0, 0, 2] },
    }
}