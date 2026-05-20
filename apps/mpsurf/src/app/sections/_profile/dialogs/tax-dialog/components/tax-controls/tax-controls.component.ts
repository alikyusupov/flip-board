import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community'
import { ITaxItem } from 'app/sections/_profile/pages/shops/shops.model';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { TaxDialogComponent } from '../../tax-dialog/tax-dialog.component';

@Component({
  selector: 'app-tax-controls',
  imports: [NzIconModule],
  template: `

    <div style="display: flex; align-items: center">
      <button
        (click)="onDeleteClick()"
        class="icon-button"
        style="border: none; background: transparent;"
      >
        <nz-icon nzType="delete" nzTheme="outline" />
      </button>
    </div>

  `,
})
export class TaxControlsComponent implements ICellRendererAngularComp {

  taxItem?: ITaxItem;

  start = ''

  componentParent!: TaxDialogComponent;

  agInit(params: ICellRendererParams<ITaxItem>): void {
    this.componentParent = params.context.componentParent;
    this.taxItem = params.data;
  }

  refresh(): boolean {
    return true;
  }

  onDeleteClick(): void {
    this.componentParent.onDeleteClick(this.taxItem);
  }

}
