import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { PlanFactComponent } from '../plan-fact.component';
import { IPlanFactItem } from '../plan-fact.model';

@Component({
  selector: 'app-plan-fact-controls-renderer',
  imports: [NzIconModule],
  styles: [`
    button {
      cursor: pointer
    }
  `],
  template: `
    <div style="display: flex; align-items: center">
      <button
        (click)="onEditClick()"
        class="icon-button"
        style="border: none; background: transparent; margin-right: 15px;">
        <nz-icon nzType="edit" nzTheme="outline" />
      </button>
      <button
        (click)="onCloneClick()"
        class="icon-button"
        style="border: none; background: transparent; margin-right: 15px;">
        <nz-icon nzType="copy" nzTheme="outline" />
      </button>
      <button
        (click)="onDeleteClick()"
        class="icon-button"
        style="border: none; background: transparent;">
       <nz-icon nzType="delete" nzTheme="outline" />
      </button>
    </div>
  `,
})
export class PlanFactControlsRendererComponent
  implements ICellRendererAngularComp
{
  id: number | null = null;

  start = '';

  plan_name = '';

  componentParent!: PlanFactComponent;

  agInit(params: ICellRendererParams<IPlanFactItem>): void {
    this.componentParent = params.context.componentParent;
    this.start = params.data?.start_date as string;
    this.id = params.data?.id as number;
    this.plan_name = params.data?.plan_name as string;
  }

  refresh(): boolean {
    return true;
  }

  onRowClick(): void {
    this.componentParent.onRowClick(this.id!, this.start);
  }

  onEditClick(): void {
    this.componentParent.onEditClick(this.id!);
  }

  onCloneClick(): void {
    this.componentParent.onCloneClick(this.id!);
  }

  onDeleteClick(): void {
    this.componentParent.onDeleteClick(this.id!, this.plan_name);
  }
}
