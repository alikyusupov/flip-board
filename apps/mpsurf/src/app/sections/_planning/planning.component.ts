import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DATE_PRESETS } from '@consts';
import { Store } from '@ngxs/store';
import { GetCategories, GetStatuses, GetTags } from 'app/actions/main.actions';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { endOfMonth, startOfMonth } from 'date-fns';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-planning',
  imports: [RouterOutlet, NzDatePickerModule, FormsModule],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent implements OnInit {

  private readonly _store = inject(Store);
  private readonly _dateRange = inject(GlobalDateRangeService)

  presets = DATE_PRESETS;

  date = [startOfMonth(new Date()), endOfMonth(new Date())];

  ngOnInit(): void {
    this._store.dispatch([
      new GetCategories({method: 'GET', endpoint: 'products/category-pnl-list'}),
      new GetStatuses({method: 'GET', endpoint: 'products-status'}),
      new GetTags({method: 'GET', endpoint: 'products/tags'}),
    ]);
  }

  onChange(result: Date[]): void {
    this._dateRange.dateRange$.next(result)
  }

}
