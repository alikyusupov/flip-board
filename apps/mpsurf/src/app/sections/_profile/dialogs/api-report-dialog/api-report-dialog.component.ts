import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

import { IApiReport, IShopWB } from '../../pages/shops/shops.model';


@Component({
  selector: 'app-api-report-dialog',
  imports: [NzTableModule],
  templateUrl: './api-report-dialog.component.html',
  styleUrl: './api-report-dialog.component.scss'
})
export class ApiReportDialogComponent {

  private readonly data = inject<{shop: IShopWB}>(DIALOG_DATA);

  listOfData: IApiReport[] = this.data.shop.api_reports

}
