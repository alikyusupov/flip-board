import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DATE_PRESETS } from '@consts';
import { Store } from '@ngxs/store';
import { GetGoods, GetImtIds } from 'app/actions/main.actions';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { endOfMonth, startOfMonth } from 'date-fns';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


@Component({
  selector: 'app-promotion',
  imports: [RouterOutlet, NzDatePickerModule, FormsModule],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss'
})
export class PromotionComponent implements OnInit {

  private readonly _store = inject(Store);
  private readonly _dateRange = inject(GlobalDateRangeService)

  presets = DATE_PRESETS;

  date = [startOfMonth(new Date()), endOfMonth(new Date())];

  ngOnInit(): void {
    this._store.dispatch([
      new GetGoods({method: 'GET', endpoint: 'products/important'}),
      new GetImtIds({method: 'GET', endpoint: 'products/imt-ids'}),
    ]);
  }
  
  onChange(result: Date[]): void {
    this._dateRange.dateRange$.next(result)
  }

}
