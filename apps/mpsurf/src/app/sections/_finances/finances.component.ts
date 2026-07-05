import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DATE_PRESETS } from '@consts';
import { Store } from '@ngxs/store';
import { GetCategories, GetGoods, GetStatuses, GetSubjects, GetTags } from 'app/actions/main.actions';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { endOfMonth, startOfMonth } from 'date-fns';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-finances',
  imports: [RouterOutlet, NzDatePickerModule, FormsModule],
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.scss'
})
export class FinancesComponent implements OnInit {

  private readonly _store = inject(Store);

  private readonly _dateRange = inject(GlobalDateRangeService);

  presets = DATE_PRESETS;

  date = [startOfMonth(new Date()), endOfMonth(new Date())];

  ngOnInit(): void {
    this._store.dispatch([
      new GetGoods({method: 'GET', endpoint: 'products/important'}),
      new GetCategories({method: 'GET', endpoint: 'products/category-pnl-list'}),
      new GetStatuses({method: 'GET', endpoint: 'products-status'}),
      new GetSubjects({method: 'GET', endpoint: 'products/subjects'}),
      new GetTags({method: 'GET', endpoint: 'products/tags'}),
    ]);
  }
  
  onChange(result: Date[]): void {
    this._dateRange.dateRange$.next(result)
  }

}
