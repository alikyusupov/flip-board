import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { TAXES_TYPES } from 'app/consts/taxes.consts';
import { FetchShopTaxList, SaveShopTaxList } from 'app/sections/_profile/pages/shops/shops.actions';
import { TAX_COL_DEF } from 'app/sections/_profile/pages/shops/shops.definition';
import { IShopWB, ITaxItem } from 'app/sections/_profile/pages/shops/shops.model';
import { ProfileShopsState } from 'app/sections/_profile/pages/shops/shops.state';
import { format } from 'date-fns';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';



@Component({
  selector: 'app-tax-dialog',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule, NzInputNumberModule, AgGridAngular, AsyncPipe, NzDatePickerModule],
  templateUrl: './tax-dialog.component.html',
  styleUrl: './tax-dialog.component.scss'
})
export class TaxDialogComponent implements OnInit {

  private readonly dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  private readonly data = inject<{shop: IShopWB}>(DIALOG_DATA);
  private readonly _fb = inject(FormBuilder);
  private readonly _store = inject(Store);

  protected taxes = TAXES_TYPES;
  protected taxList$ = this._store.select(ProfileShopsState.taxList);

  protected gridApi!: GridApi;
  protected gridOptions: GridOptions = {
    context: { componentParent: this },
  };

  readonly defaultColDef: ColDef = {
    headerClass: 'header-centered',
    sortable: true,
    resizable: true,
    filter: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellStyle: { textAlign: 'center' },
  };

  taxColDef: ColDef[] = TAX_COL_DEF;

  taxDialogForm = this._fb.group({
    taxPeriod: new FormControl(new Date(), Validators.required),
    taxType: new FormControl('', Validators.required),
    taxValue: new FormControl('', Validators.required),
    taxNds: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this._store.dispatch(new FetchShopTaxList({
      method: 'GET',
      endpoint: 'tax',
      params: {
        shop_id: this.data.shop.id
      }
    }));

  }

  onGridReady(params: GridReadyEvent<unknown>) {
    this.gridApi = params.api;
  }

  onDeleteClick(item?: ITaxItem): void {
    if (!item || !this.gridApi) {
      return;
    }

    this.gridApi.applyTransaction({ remove: [item] });

  }

  submit() {

    if(this.taxDialogForm.invalid) {
      return
    }

    const existingTaxlist = this.gridApi.getRenderedNodes().map(item => {
      const { id, ...rest} = item.data;

      console.log(id)

      return rest
    });

    const fomattedDate = format(this.taxDialogForm.controls['taxPeriod']['value'] as Date, 'yyyy-MM')

    const newTaxItem = {
      "date": fomattedDate + '-01',
      "tax_type": this.taxDialogForm.controls['taxType']['value'],
      "tax_percent": this.taxDialogForm.controls['taxValue']['value'],
      "nds_percent": this.taxDialogForm.controls['taxNds']['value'],
    };


    const tax_list = [...existingTaxlist, newTaxItem];

    this._store.dispatch(new SaveShopTaxList({
      method: 'POST',
      endpoint: 'tax',
      params: { tax_list }
    })).subscribe(() => this.dialogRef.close())

  }

}
