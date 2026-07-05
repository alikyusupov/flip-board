import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { API_PROD_OLD, API_TEST_OLD } from '@consts';
import { Store } from '@ngxs/store';
import { MpCurrencyPipe } from '@ui-kit/pipes/currency.pipe';
import { TaxTypePipe } from '@ui-kit/pipes/tax-type.pipe';
import { environment } from 'environments/environment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { ApiReportDialogComponent } from '../../dialogs/api-report-dialog/api-report-dialog.component';
import { ConnectionNameDialogComponent } from '../../dialogs/connection-name-dialog/connection-name-dialog.component';
import { CurrencyDialogComponent } from '../../dialogs/currency-dialog/currency-dialog.component';
import { TaxDialogComponent } from '../../dialogs/tax-dialog/tax-dialog/tax-dialog.component';
import { LoadShops } from './shops.actions';
import { DialogType, IShopWB } from './shops.model';
import { ProfileShopsState } from './shops.state';

@Component({
  selector: 'app-shops',
  imports: [
    DialogModule,
    NzCardModule, 
    NzTabsModule, 
    NzAvatarModule, 
    TaxTypePipe, 
    MpCurrencyPipe, 
    AsyncPipe, 
    NzSkeletonModule, 
    NzIconModule,
    NzDropDownModule,
    NzButtonModule
  ],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.scss'
})
export class ShopsComponent implements OnInit {

  private readonly HOST = environment.api === 'test' ? API_TEST_OLD : API_PROD_OLD;

  private readonly _store = inject(Store);
  private readonly dialog = inject(Dialog);

  skeletons = Array.from({length: 10});

  shops$ = this._store.select(ProfileShopsState.shops);
  isloading$ = this._store.select(ProfileShopsState.isShoplistLoading);

  ngOnInit(): void {
    this._store.dispatch(new LoadShops({
      method: 'POST',
      endpoint: 'data',
      action: 'getDataShopWBList',
      host: this.HOST
    }))
  }

  openDialog(shop: IShopWB, type: DialogType): void {

    if(type === 'connection-name') {
      this.dialog.open(ConnectionNameDialogComponent, {
          minWidth: '300px',
          data: {
            shop: shop,
          },
        });
    }

    else if (type === 'tax') {
      this.dialog.open(TaxDialogComponent, {
          maxWidth: '800px',
          minWidth: '400px',
          data: {
            shop: shop,
          },
        });
    }

    else if (type === 'currency') {
      this.dialog.open(CurrencyDialogComponent, {
          maxWidth: '800px',
          minWidth: '400px',
          data: {
            shop: shop,
          },
        });
    }

    else if (type === 'api-report') {
      this.dialog.open(ApiReportDialogComponent, {
          maxWidth: '800px',
          minWidth: '400px',
          data: {
            shop: shop,
          },
        });
    }
  }

}
