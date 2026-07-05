import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DATE_PRESETS } from '@consts';
import { Marketplace } from '@models';
import { Store } from '@ngxs/store';
import { GetBrands, GetCategories, GetGoods, GetImtIds, GetStatuses, GetSubjects, GetTags } from 'app/actions/main.actions';
import { GlobalDateRangeService } from 'app/services/global-date-range.service';
import { MARKETPLACE } from 'app/tokens';
import { endOfMonth, startOfMonth } from 'date-fns';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-product-analytics',
  imports: [RouterOutlet, NzDatePickerModule, FormsModule],
  templateUrl: './product-analytics.component.html',
  styleUrl: './product-analytics.component.scss',
})
export class ProductAnalyticsComponent implements OnInit {

  private readonly _observer = inject(BreakpointObserver);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _store = inject(Store);

  private readonly _dateRange = inject(GlobalDateRangeService);

  protected marketplace = inject(MARKETPLACE);

  isTabsPanelShown = signal(true);

  presets = DATE_PRESETS

  urls = [
    { link: 'rates', title: 'Общие показатели' },
    { link: 'rnp', title: 'РНП (Воронка)' },
    { link: 'orders', title: 'Заказы' },
    { link: 'sales', title: 'Продажи' },
    { link: 'abc', title: 'ABC анализ' },
  ]

  date = [startOfMonth(new Date()), endOfMonth(new Date())];

  ngOnInit(): void {

    this._observer.observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small])
      .pipe(takeUntilDestroyed(this._destroyRef), distinctUntilChanged())
      .subscribe(
        () => this.breakpointChanged()
      )

    const FILTERS = this.marketplace() === Marketplace.OZON
      ? [
          new GetGoods({method: 'GET', endpoint: 'products/important'}),
          new GetCategories({method: 'GET', endpoint: 'products/category-pnl-list'}),
          new GetBrands({method: 'GET', endpoint: 'products/brands'}),
          new GetStatuses({method: 'GET', endpoint: 'products-status'}),
          new GetSubjects({method: 'GET', endpoint: 'products/subjects'}),
        ]
      :
        [
          new GetGoods({method: 'GET', endpoint: 'products/important'}),
          new GetCategories({method: 'GET', endpoint: 'products/category-pnl-list'}),
          new GetBrands({method: 'GET', endpoint: 'products/brands'}),
          new GetStatuses({method: 'GET', endpoint: 'products-status'}),
          new GetSubjects({method: 'GET', endpoint: 'products/subjects'}),
          new GetTags({method: 'GET', endpoint: 'products/tags'}),
          new GetImtIds({method: 'GET', endpoint: 'products/imt-ids'}),
        ]

    this._store.dispatch(FILTERS);
  }

  onChange(result: Date[]): void {

    this._dateRange.dateRange$.next(result)
  }

  private breakpointChanged() {
    this.isTabsPanelShown.set(!this._observer.isMatched(Breakpoints.Small))
  }
}
