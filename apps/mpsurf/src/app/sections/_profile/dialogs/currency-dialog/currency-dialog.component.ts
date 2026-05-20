import { DIALOG_DATA,DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { API_PROD, API_TEST, CURRENCY_LIST } from '@consts';
import { Store } from '@ngxs/store';
import { environment } from 'environments/environment';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { startWith } from 'rxjs';

import { UpdateCurrency } from '../../pages/shops/shops.actions';
import { IShopWB } from '../../pages/shops/shops.model';

@Component({
  selector: 'app-currency-dialog',
  imports: [ReactiveFormsModule, NzFormModule, NzSelectModule, NzButtonModule],
  templateUrl: './currency-dialog.component.html',
  styleUrl: './currency-dialog.component.scss'
})
export class CurrencyDialogComponent implements OnInit {

  private readonly HOST = environment.api === 'test' ? API_TEST : API_PROD;

  private readonly dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  private readonly data = inject<{shop: IShopWB}>(DIALOG_DATA);
  private readonly _store = inject(Store);

  protected currency_list = CURRENCY_LIST;

  currencyControl = new FormControl(this.data.shop.currency_name, {validators: [Validators.required]});

  valueHasChanged = signal(false);
  
  ngOnInit(): void {
    this.currencyControl.valueChanges.pipe(startWith(this.data.shop.currency_name))
      .subscribe(value => this.valueHasChanged.set(value !== this.data.shop.currency_name) )
  }

  submit(): void {
    if(this.currencyControl.valid) {

      const params = {
        "currency_name": this.currencyControl.value
      }

      this._store.dispatch(new UpdateCurrency( {
        host: this.HOST,
        method: 'GET',
        endpoint: 'currency/save',
        params
      }))
      .subscribe(() => this.dialogRef.close())
    }
  }

}
