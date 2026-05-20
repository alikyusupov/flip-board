import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { CardComponent } from '@ui-kit/card/card.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, themeAlpine } from 'ag-grid-community';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { LoadReconciliationCards, LoadReconciliationRows } from './reconciliation.actions';
import { RECONCILIATION_COLUMNS_DEFS } from './reconciliation.definition';
import { FinancesReconciliationState } from './reconciliation.state';

@Component({
  selector: 'app-reconciliation',
  imports: [AgGridAngular, NzSkeletonModule, CardComponent, AsyncPipe],
  templateUrl: './reconciliation.component.html',
  styleUrl: './reconciliation.component.scss'
})
export class ReconciliationComponent implements OnInit {

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

  columnDefs = RECONCILIATION_COLUMNS_DEFS;

  skeletons = Array.from({length: 10});

  cardSkeletons = Array.from({length: 2});

  reconciliations$ = this._store.select(FinancesReconciliationState.reconciliationList)
    .pipe(takeUntilDestroyed(this._destroyRef));

  isReconciliationListLoading$ = this._store.select(FinancesReconciliationState.isReconciliationListLoading)
    .pipe(takeUntilDestroyed(this._destroyRef));

  reconciliationCards$ = this._store.select(FinancesReconciliationState.reconciliationCards)
    .pipe(takeUntilDestroyed(this._destroyRef));

  isReconciliationCardsLoading$ = this._store.select(FinancesReconciliationState.isReconciliationCardsLoading)
    .pipe(takeUntilDestroyed(this._destroyRef));

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

        const [ beginDate, endDate ] = [format(date1, 'yyyy-MM-dd'),  format(date2, 'yyyy-MM-dd')];

        if(!date1 || !date2) return;

        const params = {
          beginDate,
          endDate,
        }
  
        this._store.dispatch([
          new LoadReconciliationCards({
            method: 'GET',
            endpoint: 'reconciliation/cards',
            params
          }),
          new LoadReconciliationRows({
            method: 'GET',
            endpoint: 'reconciliation',
            params
          })
        ])
      
      })

  }

}
