import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, themeAlpine } from 'ag-grid-community';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { LoadPartners } from './partners.actions';
import { FINPARTNERS_COLUMN_DEFS } from './partners.definition';
import { IFinPartner } from './partners.model';
import { SettingsPartnersState } from './partners.state';

@Component({
  selector: 'app-partners',
  imports: [AsyncPipe, NzSkeletonModule, AgGridAngular],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class PartnersComponent implements OnInit{

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);

  grid$ = this._store.select(SettingsPartnersState.grid).pipe(takeUntilDestroyed(this._destroyRef));
  isGridLoading$ = this._store.select(SettingsPartnersState.isGridLoading).pipe(takeUntilDestroyed(this._destroyRef));

  skeletons = Array.from({length: 10});

  colDef: ColDef[] = FINPARTNERS_COLUMN_DEFS;

  rowData: IFinPartner[] = [];

  readonly defaultColDefs: ColDef = {
    headerClass: 'header-centered',
    sortable: true,
    resizable: true,
    filter: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellStyle: { textAlign: 'center' },
  };

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

    this._store.dispatch(new LoadPartners({
      method: 'GET',
      endpoint: 'fin-partners'
    }))

  }

}
