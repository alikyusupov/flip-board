import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ICardWidget } from '@models';
import { CURRENCY } from 'app/tokens';
import { getCurrencyIcon } from 'app/utils';

import { UnitPipe } from '../pipes/unit.pipe';
@Component({
  selector: 'app-card',
  imports: [CommonModule, UnitPipe],

  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

   currency = inject(CURRENCY);

  selectedCurrency = ''

  @Input() card: ICardWidget | null = null
  @Input() bgColor: string | null = null

  ngOnInit(): void {
    this.selectedCurrency = getCurrencyIcon(this.currency())
  }

  getBgColor(card: ICardWidget | null): string {
    if(!this.card) return '';
    if(this.bgColor) return this.bgColor;
    switch (card?.title) {
      case 'Заказы':
        return '#CBD5FC';
      case 'Продажи без вычета возвратов':
      case 'Продажи':
      case 'Товарная группа AAA':
      case "Привлечено пользователей":
        return '#BCE9DE';
      case 'Возвраты':
        return '#F9C3D9';
      case 'Комиссия':
      case 'ДРР за выбранный период':
      case 'ДРР за предыдущий период':
      case 'ДРР сегодня':
      case 'ДРР вчера':
        return '#C3E9EC';
      case 'Логистика':
      case "Израсходовано бонусов":
        return '#F8D6CB';
      case 'Себестоимость':
      case 'Товарная группа ABA-CBC':
      case "Заработано всего":
        return '#FCEED1';
      case 'Валовая прибыль':
      case "Доступно к выводу":
      case "По спланированным артикулам":
      case "По всему кабинету":  
        return '#CCE7FC';
      case 'Самовыкупы':
      case 'Доп. удержания':
      case 'ДРР':
        return '#B8D4D7';
      case 'Остатки на складах':
      case 'Товарная группа CCC':
        return '#E6BABE';
      case 'Метрики':
        return '#EBC3FA';
      default:
        return '#BCE9DE';
    }
  }

  isNumber(value: number | null): boolean {
    return typeof value === 'number'
  }

}
