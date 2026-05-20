import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { NzButtonModule } from "ng-zorro-antd/button";

import { PlanFactComponent } from "../plan-fact.component";
import { IPlanFactItem } from "../plan-fact.model";

@Component({
  selector: "app-button-renderer",
  imports: [NzButtonModule],
  template: `
    <button (click)="onRowClick(this.id)" nz-button nzType="primary" [nzSize]="'small'">
      Показать
    </button>
  `,
})
export class ButtonRendererComponent implements ICellRendererAngularComp {

  id!: number;

  componentParent!: PlanFactComponent

  start = ''

  agInit(params: ICellRendererParams<IPlanFactItem>): void {
    this.id = params.data?.id as number;
    this.componentParent = params.context.componentParent;
    this.start = params.data?.start_date.split('.')[1] as string;
  }

  refresh(): boolean {
    return true
  }

  onRowClick(id: number): void {
    this.componentParent.onRowClick(id, this.start)
  }
}
