import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, themeAlpine } from 'ag-grid-community';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { LoadCostPriceGrid } from './costprice.actions';
import { generateColumnDefs } from './costprice.definition';
import { ICostPriceListItem } from './costprice.model';
import { PlanningCostpriceState } from './costprice.state';


@Component({
  selector: 'app-costprice',
  imports: [ NzSkeletonModule, AgGridAngular, AsyncPipe],
  templateUrl: './costprice.component.html',
  styleUrl: './costprice.component.scss'
})
export class CostpriceComponent implements OnInit {

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);

  readonly defaultColDefs: ColDef = {
    headerClass: 'header-centered',
    sortable: true,
    resizable: true,
    filter: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellStyle: { textAlign: 'center' },
  };

  columnDefs: ColDef[] = [];
  rowData: ICostPriceListItem[] = [];

  skeletons = Array.from({length: 10});

  theme = themeAlpine
    .withParams(
        {
          backgroundColor: "#030617",
          foregroundColor: "#FFFFFFCC",
          browserColorScheme: "dark",
        },
        "dark",
    );

  table$ = this._store.select(PlanningCostpriceState.table).pipe(takeUntilDestroyed(this._destroyRef));
  isTableLoading$ = this._store.select(PlanningCostpriceState.isTableLoading).pipe(takeUntilDestroyed(this._destroyRef));

  ngOnInit(): void {

    this._store.dispatch(new LoadCostPriceGrid({
      method: 'POST',
      endpoint: 'products'
    }))

    this.table$
      .subscribe(grid => {
        if(grid){

          this.rowData = grid.data;

          this.columnDefs = generateColumnDefs(false)
        }
      })
    
  }

}
