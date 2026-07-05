import { ISettingsItemsGrid } from "./items.model";

export const SETTINGS_ITEMS_GRID: ISettingsItemsGrid[] =
  [
    {
      "key": "1",
      "label": "Операционная деятельность",
      "data": "Operation",
      "expanded": true,
      "icon": "pi pi-fw pi-briefcase",
      "children": [
        {
          "key": "2",
          "label": "Поступления",
          "data": "Work Folder",
          "icon": "pi pi-fw pi-sort-amount-up-alt",
          "expanded": true,
          "children": [
            {
              "key": 101,
              "label": "Выручка от Wildberries",
              "data": "Выручка от Wildberries",
              "p_l": 0,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 102,
              "label": "Возврат д/с от поставщика",
              "data": "Возврат д/с от поставщика",
              "p_l": 0,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 103,
              "label": "Кэшбэк от банка",
              "data": "Кэшбэк от банка",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Доходы внереализационные",
              "is_visible": 0
            },
            {
              "key": 175,
              "label": "Выручка от Ozon",
              "data": "Выручка от Ozon",
              "p_l": 0,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            }
          ]
        },
        {
          "key": "2",
          "label": "Списания",
          "data": "Work Folder",
          "icon": "pi pi-fw pi-sort-amount-down-alt",
          "expanded": true,
          "children": [
            {
              "key": 104,
              "label": "Закупка товара у поставщиков",
              "data": "Закупка товара у поставщиков",
              "p_l": 0,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 105,
              "label": "Доставка до ФФ",
              "data": "Доставка до ФФ",
              "p_l": 0,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 106,
              "label": "Упаковка и расходные материалы",
              "data": "Упаковка и расходные материалы",
              "p_l": 0,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 107,
              "label": "Фулфилмент вне с/с",
              "data": "Фулфилмент вне с/с",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Постоянные затраты (прямые)",
              "is_visible": 0
            },
            {
              "key": 108,
              "label": "Фулфилмент",
              "data": "Фулфилмент",
              "p_l": 0,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 109,
              "label": "Возврат клиенту по браку",
              "data": "Возврат клиенту по браку",
              "p_l": 0,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 110,
              "label": "Дизайнеры / Фотографы",
              "data": "Дизайнеры / Фотографы",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Постоянные затраты (косвенные)",
              "is_visible": 0
            },
            {
              "key": 111,
              "label": "Реклама таргет / блогеры",
              "data": "Реклама таргет / блогеры",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Постоянные затраты (прямые)",
              "is_visible": 0
            },
            {
              "key": 112,
              "label": "Пополнение рекламы ВБ",
              "data": "Пополнение рекламы ВБ",
              "p_l": 0,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 113,
              "label": "Кэшбек за отзывы",
              "data": "Кэшбек за отзывы",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Постоянные затраты (прямые)",
              "is_visible": 0
            },
            {
              "key": 114,
              "label": "СМВ/ раздача товара",
              "data": "СМВ/ раздача товара",
              "p_l": 0,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 115,
              "label": "Расчетно-кассовое обслуживание (РКО)",
              "data": "Расчетно-кассовое обслуживание (РКО)",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Постоянные затраты (косвенные)",
              "is_visible": 0
            },
            {
              "key": 116,
              "label": "Софт, сервисы",
              "data": "Софт, сервисы",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Постоянные затраты (косвенные)",
              "is_visible": 0
            },
            {
              "key": 117,
              "label": "Сертификация и регистрация торговых марок",
              "data": "Сертификация и регистрация торговых марок",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Постоянные затраты (косвенные)",
              "is_visible": 0
            },
            {
              "key": 118,
              "label": "Аренда и коммунальные платежи",
              "data": "Аренда и коммунальные платежи",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Постоянные затраты (косвенные)",
              "is_visible": 0
            },
            {
              "key": 120,
              "label": "ЗП (зарплата)",
              "data": "ЗП (зарплата)",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Постоянные затраты (косвенные)",
              "is_visible": 0
            },
            {
              "key": 121,
              "label": "Обучение",
              "data": "Обучение",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Постоянные затраты (косвенные)",
              "is_visible": 0
            },
            {
              "key": 123,
              "label": "Оборудование менее 40т.руб.",
              "data": "Оборудование менее 40т.руб.",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Постоянные затраты (косвенные)",
              "is_visible": 0
            },
            {
              "key": 124,
              "label": "Налоги",
              "data": "Налоги",
              "p_l": 0,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 136,
              "label": "Займ / кредит (Выплата процентов)",
              "data": "Займ / кредит (Выплата процентов)",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Расходы ниже EBITDA",
              "is_visible": 0
            },
            {
              "key": 138,
              "label": "Инвесторы (Выплата процентов)",
              "data": "Инвесторы (Выплата процентов)",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 1,
              "pnl_name": "Расходы ниже EBITDA",
              "is_visible": 0
            },
            {
              "key": 509,
              "label": "Test Eyyup 12:04",
              "data": "Test Eyyup 12:04",
              "p_l": 1,
              "d_l": 1,
              "activity": 1,
              "is_block": 0,
              "pnl_name": "Переменные затраты (прямые)",
              "is_visible": 0
            }
          ]
        }
      ]
    },
    {
      "key": "1",
      "label": "Финансовая деятельность",
      "data": "Finance",
      "expanded": true,
      "icon": "pi pi-fw pi-chart-bar",
      "children": [
        {
          "key": "2",
          "label": "Поступления",
          "data": "Work Folder",
          "icon": "pi pi-fw pi-sort-amount-up-alt",
          "children": [
            {
              "key": 131,
              "label": "Поступление собственных средств",
              "data": "Поступление собственных средств",
              "p_l": 0,
              "d_l": 1,
              "activity": 2,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 132,
              "label": "Поступление займа / кредита",
              "data": "Поступление займа / кредита",
              "p_l": 0,
              "d_l": 1,
              "activity": 2,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 133,
              "label": "Поступления от инвесторов",
              "data": "Поступления от инвесторов",
              "p_l": 0,
              "d_l": 1,
              "activity": 2,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            }
          ]
        },
        {
          "key": "2",
          "label": "Списания",
          "data": "Work Folder",
          "icon": "pi pi-fw pi-sort-amount-down-alt",
          "children": [
            {
              "key": 119,
              "label": "Дивиденды собственнику",
              "data": "Дивиденды собственнику",
              "p_l": 1,
              "d_l": 1,
              "activity": 2,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 135,
              "label": "Вложенные средства собственника (Погашение тела долга)\r\n",
              "data": "Вложенные средства собственника (Погашение тела долга)\r\n",
              "p_l": 0,
              "d_l": 1,
              "activity": 2,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 137,
              "label": "Займ / кредит (Погашение тела долга)",
              "data": "Займ / кредит (Погашение тела долга)",
              "p_l": 0,
              "d_l": 1,
              "activity": 2,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 139,
              "label": "Инвесторы (Погашение тела долга)",
              "data": "Инвесторы (Погашение тела долга)",
              "p_l": 0,
              "d_l": 1,
              "activity": 2,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 193,
              "label": "Упаковка и расходные материалы вне с/с",
              "data": "Упаковка и расходные материалы вне с/с",
              "p_l": 1,
              "d_l": 1,
              "activity": 2,
              "is_block": 0,
              "pnl_name": "Постоянные затраты (прямые)",
              "is_visible": 0
            },
            {
              "key": 905,
              "label": "НДС для ОПиУ",
              "data": "НДС для ОПиУ",
              "p_l": 1,
              "d_l": 1,
              "activity": 2,
              "is_block": 0,
              "pnl_name": "Расходы ниже EBITDA",
              "is_visible": 0
            }
          ]
        }
      ]
    },
    {
      "key": "1",
      "label": "Инвестиционная деятельность",
      "data": "Investment",
      "expanded": true,
      "icon": "pi pi-fw pi-chart-line",
      "children": [
        {
          "key": "2",
          "label": "Поступления",
          "data": "Work Folder",
          "icon": "pi pi-fw pi-sort-amount-up-alt",
          "children": [
            {
              "key": 140,
              "label": "Продажа ОС",
              "data": "Продажа ОС",
              "p_l": 0,
              "d_l": 1,
              "activity": 3,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            }
          ]
        },
        {
          "key": "2",
          "label": "Списания",
          "data": "Work Folder",
          "icon": "pi pi-fw pi-sort-amount-down-alt",
          "children": [
            {
              "key": 141,
              "label": "Покупка ОС",
              "data": "Покупка ОС",
              "p_l": 0,
              "d_l": 1,
              "activity": 3,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            },
            {
              "key": 142,
              "label": "Ремонт ОС",
              "data": "Ремонт ОС",
              "p_l": 0,
              "d_l": 1,
              "activity": 3,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            }
          ]
        }
      ]
    },
    {
      "key": "1",
      "label": "Деятельность вне МП",
      "data": "PNL",
      "expanded": true,
      "icon": "pi pi-fw pi-chart-pie",
      "children": [
        {
          "key": "2",
          "label": "Поступления",
          "data": "Work Folder",
          "icon": "pi pi-fw pi-sort-amount-up-alt",
          "children": [
            {
              "key": 143,
              "label": "Доход вне МП",
              "data": "Доход вне МП",
              "p_l": 0,
              "d_l": 1,
              "activity": 4,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            }
          ]
        },
        {
          "key": "2",
          "label": "Списания",
          "data": "Work Folder",
          "icon": "pi pi-fw pi-sort-amount-down-alt",
          "children": [
            {
              "key": 144,
              "label": "Расход вне МП",
              "data": "Расход вне МП",
              "p_l": 0,
              "d_l": 1,
              "activity": 4,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 0
            }
          ]
        }
      ]
    },
    {
      "key": "1",
      "label": "Внутренние переводы",
      "data": "Moving",
      "expanded": true,
      "icon": "pi pi-fw pi-chart-pie",
      "children": [
        {
          "key": "2",
          "label": "Поступления",
          "data": "Work Folder",
          "icon": "pi pi-fw pi-sort-amount-up-alt",
          "children": [
            {
              "key": 145,
              "label": "Перемещение (Поступление)",
              "data": "Перемещение (Поступление)",
              "p_l": 0,
              "d_l": 1,
              "activity": 5,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 1
            }
          ]
        },
        {
          "key": "2",
          "label": "Списания",
          "data": "Work Folder",
          "icon": "pi pi-fw pi-sort-amount-down-alt",
          "children": [
            {
              "key": 146,
              "label": "Перемещение (Списание)",
              "data": "Перемещение (Списание)",
              "p_l": 0,
              "d_l": 1,
              "activity": 5,
              "is_block": 1,
              "pnl_name": "",
              "is_visible": 1
            }
          ]
        }
      ]
    }
  ]