import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, themeAlpine } from 'ag-grid-community';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { lastValueFrom } from 'rxjs';

import { FINANCES_SERVICE_TOKEN } from '../../tokens';
import { LoadOperations } from './operations.actions';
import { FIN_OPERATION_COLUMN_DEFS } from './operations.definition';
import { IFinOperationExportItem } from './operations.model';
import { FinancesOperationsState } from './operations.state';

type SaveAsFn = (data: Blob, filename?: string) => void;

interface IExcelWorksheet {
  columns: { header: string; key: string; width: number }[];
  addRow(data: Record<string, string | number>): void;
}

interface IExcelWorkbook {
  xlsx: {
    writeBuffer(): Promise<ArrayBuffer>;
  };
  addWorksheet(name: string): IExcelWorksheet;
}

type ExcelWorkbookConstructor = new () => IExcelWorkbook;

interface IExcelJsModule {
  Workbook?: ExcelWorkbookConstructor;
  default?: {
    Workbook?: ExcelWorkbookConstructor;
  };
}

interface IFileSaverModule {
  saveAs?: SaveAsFn;
  default?: SaveAsFn;
}

@Component({
  selector: 'app-operations',
  imports: [AsyncPipe, AgGridAngular, NzSkeletonModule, NzButtonModule, NzIconModule],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.scss'
}) 
export class OperationsComponent implements OnInit {

  filesaver: IFileSaverModule | null = null;
  exceljs: IExcelJsModule | null = null;

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _dateRangeService = inject(GlobalDateRangeService);
  private readonly _financesService = inject(FINANCES_SERVICE_TOKEN);

  readonly defaultColDef: ColDef = {
    headerClass: 'header-centered',
    sortable: true,
    resizable: true,
    filter: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellStyle: { textAlign: 'center' },
  };

  columnDefs = FIN_OPERATION_COLUMN_DEFS;

  skeletons = Array.from({length: 10});

  operations$ = this._store.select(FinancesOperationsState.operationsList).pipe(takeUntilDestroyed(this._destroyRef));
  isOperationsListLoading$ = this._store.select(FinancesOperationsState.isOperationsListLoading).pipe(takeUntilDestroyed(this._destroyRef));

  theme = themeAlpine
    .withParams(
        {
          backgroundColor: "#030617",
          foregroundColor: "#FFFFFFCC",
          browserColorScheme: "dark",
        },
        "dark",
    );

  ngOnInit(): void {

    this._dateRangeService.dateRange$.next([startOfMonth(new Date()), endOfMonth(new Date())]);
    
    this._dateRangeService.dateRange$.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(([date1, date2]) => {

        const [ startDate, endDate ] = [format(date1, 'yyyy-MM-dd'),  format(date2, 'yyyy-MM-dd')];

        if(!date1 || !date2) return;

        const params = {
          startDate,
          endDate,
        }
  
       
        this._store.dispatch(new LoadOperations({
          method: 'GET',
          endpoint: 'fin-operation',
          params
        }));
  
      })

  }

  async onExportToExcel() {

    if(!this.filesaver) {
      this.filesaver = await import('file-saver') as unknown as IFileSaverModule;
    }
    if(!this.exceljs){
      this.exceljs = await import('exceljs') as unknown as IExcelJsModule;
    }
    const fileSaver = this.filesaver;
    const excelJs = this.exceljs;
    const saveAs = fileSaver?.saveAs ?? fileSaver?.default;
    const Workbook = excelJs?.Workbook ?? excelJs?.default?.Workbook;

    if (!saveAs || !Workbook) return;

    const data: IFinOperationExportItem[] = (await lastValueFrom(this._financesService.loadOperationsExport({method: 'GET', endpoint: 'fin-operation/export'})));
    
    const workbook = new Workbook();
    const workSheet = workbook.addWorksheet(`ABC`);
    workSheet.columns = [
      { header: 'Дата оплаты / перемещения (для ДДС)', key: 'Дата оплаты / перемещения (для ДДС)', width: 15 },
      { header: 'Дата начисления (для ОПиУ)', key: 'Дата начисления (для ОПиУ)', width: 15 },
      { header: 'Счёт', key: 'Счёт', width: 25 },
      { header: 'Тип операции', key: 'Тип операции', width: 20 },
      { header: 'Артикул', key: 'Артикул', width: 20 },
      { header: 'Контрагент', key: 'Контрагент', width: 20 },
      { header: 'Статья', key: 'Статья', width: 15 },
      { header: 'Сумма', key: 'Сумма', width: 20 },
      { header: 'Кабинет', key: 'Кабинет', width: 20 },
      { header: 'Комментарий', key: 'Комментарий', width: 20 },
    ];

    data.forEach(dataItem => {
      workSheet.addRow({
        "Дата оплаты / перемещения (для ДДС)": dataItem['Дата оплаты / перемещения (для ДДС)'],
        "Дата начисления (для ОПиУ)": dataItem['Дата начисления (для ОПиУ)'],
        "Счёт": dataItem['Счёт'],
        "Тип операции": dataItem['Тип операции'],
        "Артикул": dataItem['Артикул'],
        "Контрагент": dataItem['Контрагент'],
        "Статья": dataItem['Статья'],
        "Сумма": parseFloat(dataItem['Сумма']),
        "Кабинет": dataItem['Кабинет'],
        "Комментарий": dataItem['Комментарий']
      })
    })

    const file = await workbook.xlsx.writeBuffer();
    const fileName = `Fin-operation_${new Date().getTime()}.xlsx`;

    const blob = new Blob([file], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(
      blob,
      fileName 
    );

  }

}
