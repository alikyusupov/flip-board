import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { API_PROD, API_TEST_OLD } from '@consts';
import { Store } from '@ngxs/store';
import { MainState } from 'app/states/main.state';
import { environment } from 'environments/environment';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { startWith } from 'rxjs';

import { UpdateConnectionName } from '../../pages/shops/shops.actions';
import { IShopWB } from '../../pages/shops/shops.model';


@Component({
  selector: 'app-connection-name-dialog',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './connection-name-dialog.component.html',
  styleUrl: './connection-name-dialog.component.scss'
})
export class ConnectionNameDialogComponent implements OnInit {

  private readonly HOST = environment.api === 'test' ? API_TEST_OLD : API_PROD;

  private readonly dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  private readonly data = inject<{shop: IShopWB}>(DIALOG_DATA);
  private readonly _store = inject(Store);

  connectionNameControl = new FormControl(this.data.shop.name, {validators: [Validators.required]});

  valueHasChanged = signal(false);

  ngOnInit(): void {
    this.connectionNameControl.valueChanges.pipe(startWith(this.data.shop.name))
      .subscribe(value => this.valueHasChanged.set(value !== this.data.shop.name) )
  }

  submit(): void {
    if(this.connectionNameControl.valid) {

      const params = {
        "id": this._store.selectSnapshot(MainState.selectedShop)?.id,
        "type_edit": "Название подключения",
        "value": this.connectionNameControl.value
      }

      this._store.dispatch(new UpdateConnectionName( {
        host: this.HOST,
        method: 'POST',
        action: 'updateDataShop',
        endpoint: 'data',
        params
      }))
      .subscribe(() => this.dialogRef.close())
    }
  }

}
