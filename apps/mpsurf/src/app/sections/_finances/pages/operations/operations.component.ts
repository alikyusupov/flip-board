import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, themeAlpine } from 'ag-grid-community';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { LoadOperations } from './operations.actions';
import { FIN_OPERATION_COLUMN_DEFS } from './operations.definition';
import { FinancesOperationsState } from './operations.state';


@Component({
  selector: 'app-operations',
  imports: [AsyncPipe, AgGridAngular, NzSkeletonModule],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.scss'
}) 
export class OperationsComponent implements OnInit {

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _dateRangeService = inject(GlobalDateRangeService);

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

}
