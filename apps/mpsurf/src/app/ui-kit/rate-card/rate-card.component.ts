import { DecimalPipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { ICardWidget } from '@models';
import { UnitPipe } from '@ui-kit/pipes/unit.pipe';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-rate-card',
  imports: [NzIconModule, NzTooltipModule, DecimalPipe, NgClass, UnitPipe],
  templateUrl: './rate-card.component.html',
  styleUrl: './rate-card.component.scss'
})
export class RateCardComponent {

  readonly titlesWithReversedLogic = [
    'Комиссия',
    'Логистика',
    'Себестоимость',
    'Затраты на рекламу и ДРР %',
    'ДРР',
    'Расходы МП'
  ]

  readonly fieldsWithReversedLogic = [
    '% отмены',
    'Продаж',
    'Возвратов',
    'К клиенту',
    'От клиента',
    'Корректировка логистики',
    'Расход на рекламу',
    'СПП',
    '% от продаж',
    'Реклама по фин.отчету',
    'Реклама по API РК Финансы',
    'Расходы МП (без рекламы)',
    'Расходы МП (с рекламой)',
    'Эквайринг',
    '% СПП (от продаж)',
    '% Себестоимости (от продаж)',
    'Реклама (по фин.отчету)',
    'Реклама (по РК финансы)',
    'ДРР от продаж (по фин. отчету), %',
    'ДРР от продаж (по РК финансы), %',
    'Расходы на МП (включая рекламу)',
    'Расходы на МП (без рекламы)',
    'Комиссия (с вычетом СПП)',
    '% расходов на МП',
    '% расходов на МП (без рекламы)',
    '% себестоимости (от продаж)',
    '% логистики (от продаж)',
    '% комиссии (от продаж)',
    '% эквайринга (от продаж)',
    '% комиссии с вычетом СПП (от продаж)'
  ]

  card = input.required<ICardWidget>();
  bgColor = input<string | null>(null);
  unit = input<"percent" | "rubles" | "item" | "day" | "count">('rubles');

  isNumber(value: number | null): boolean {
    return typeof value === 'number'
  }

}
