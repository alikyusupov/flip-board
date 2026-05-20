import { Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams } from 'ag-grid-community';

@Component({
  selector: 'app-photo-tooltip',
  standalone: true,
  template: `
    @if (photoUrl && photoUrl !== 'empty') {
      <div class="photo-tooltip">
        <img [src]="photoUrl" alt="Product photo" />
      </div>
    }
  `,
  styles: [`
    .photo-tooltip {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 8px;
    }

    .photo-tooltip img {
      display: block;
      width: 200px;
      height: 200px;
      object-fit: contain;
      border-radius: 4px;
      background: #fff;
    }
  `]
})
export class PhotoTooltipComponent implements ITooltipAngularComp {
  photoUrl: string | null = null;

  agInit(params: ITooltipParams): void {
    const photoField = params.colDef?.tooltipComponentParams?.['photoField'] || 'photo';
    this.photoUrl = params.data?.[photoField] || params.value;
  }
}
