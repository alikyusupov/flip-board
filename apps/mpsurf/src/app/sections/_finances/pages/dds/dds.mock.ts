import { IDDSAccount, IDDSGridData, IDDSPartner } from "./dds.model";

export const PARTNERS: IDDSPartner[] = [
  {
    "UID": "0e15268f8b0b11efa836c87f5454cc3a",
    "INN": null,
    "KPP": null,
    "checking_account": null,
    "name": "Поставщик 2",
    "status": 0,
    "user_shop_id": 586,
    "description": null,
    "shop_name": "Все",
    "expenses_item": null,
    "income_item": null,
    "sum_partners": "0.00",
    "sum_receipt": null,
    "sum_order": null,
    "count_operation": null
  },
  {
    "UID": "f302eba0824111efa836c87f5454cc3a",
    "INN": null,
    "KPP": null,
    "checking_account": null,
    "name": "Поставщик",
    "status": 0,
    "user_shop_id": 586,
    "description": null,
    "shop_name": "Все",
    "expenses_item": null,
    "income_item": null,
    "sum_partners": "0.00",
    "sum_receipt": null,
    "sum_order": null,
    "count_operation": null
  },
  {
    "UID": "ab8fd2d22ee311ef907dc87f5454cc3a",
    "INN": null,
    "KPP": null,
    "checking_account": null,
    "name": "test1232",
    "status": 0,
    "user_shop_id": 399,
    "description": "опа",
    "shop_name": "Все",
    "expenses_item": null,
    "income_item": null,
    "sum_partners": "0.00",
    "sum_receipt": null,
    "sum_order": null,
    "count_operation": null
  },
  {
    "UID": "045ce2c42ecf11ef907dc87f5454cc3a",
    "INN": null,
    "KPP": null,
    "checking_account": null,
    "name": "Kontragent",
    "status": 0,
    "user_shop_id": 399,
    "description": null,
    "shop_name": "Все",
    "expenses_item": null,
    "income_item": null,
    "sum_partners": "0.00",
    "sum_receipt": null,
    "sum_order": null,
    "count_operation": null
  },
  {
    "UID": "fdf4706c2d6a11ef907dc87f5454cc3a",
    "INN": null,
    "KPP": null,
    "checking_account": null,
    "name": "Вымпелком",
    "status": 0,
    "user_shop_id": 399,
    "description": null,
    "shop_name": "Все",
    "expenses_item": null,
    "income_item": null,
    "sum_partners": "0.00",
    "sum_receipt": null,
    "sum_order": null,
    "count_operation": null
  },
  {
    "UID": "a976f0c5299811ef907dc87f5454cc3a",
    "INN": null,
    "KPP": null,
    "checking_account": null,
    "name": "Контрагенты тест",
    "status": 0,
    "user_shop_id": 399,
    "description": null,
    "shop_name": "Все",
    "expenses_item": null,
    "income_item": null,
    "sum_partners": "0.00",
    "sum_receipt": null,
    "sum_order": null,
    "count_operation": null
  },
  {
    "UID": "fbb09679da3b11ee965bc87f5454cc3a",
    "INN": null,
    "KPP": null,
    "checking_account": null,
    "name": "Тест 42",
    "status": 0,
    "user_shop_id": 399,
    "description": null,
    "shop_name": "Все",
    "expenses_item": null,
    "income_item": null,
    "sum_partners": "0.00",
    "sum_receipt": null,
    "sum_order": null,
    "count_operation": null
  }
]

export const ACCOUNTS: IDDSAccount[] = [
  {
    "name": "Счет №1",
    "date_balance_init": "2024-09-01",
    "balance_init": "100000.00",
    "description": null,
    "UID": "d6bfd18e774b11efa836c87f5454cc3a",
    "balance_current": "-600.00"
  },
  {
    "name": "Счет 2",
    "date_balance_init": "2024-10-01",
    "balance_init": "500.00",
    "description": null,
    "UID": "1070c1227fee11efa836c87f5454cc3a",
    "balance_current": "70432.00"
  },
  {
    "name": "Сбер",
    "date_balance_init": "2024-10-04",
    "balance_init": "10000.00",
    "description": null,
    "UID": "60e1ab49824211efa836c87f5454cc3a",
    "balance_current": "-89667.00"
  },
  {
    "name": "Альфа",
    "date_balance_init": "2024-10-14",
    "balance_init": "100000.00",
    "description": null,
    "UID": "f365dc5b8b0a11efa836c87f5454cc3a",
    "balance_current": "100000.00"
  },
  {
    "name": "Личные средства",
    "date_balance_init": "2024-08-07",
    "balance_init": "1.00",
    "description": null,
    "UID": "4fe5d00aa8dd11efa836c87f5454cc3a",
    "balance_current": "1.00"
  },
  {
    "name": "Test 1",
    "date_balance_init": "2025-09-01",
    "balance_init": "10000.00",
    "description": null,
    "UID": "c6df7e2788ad11f0bbc9c87f5454cc3a",
    "balance_current": "9223.00"
  },
  {
    "name": "Test 2",
    "date_balance_init": "2025-09-01",
    "balance_init": "50000.00",
    "description": null,
    "UID": "cf66326188ad11f0bbc9c87f5454cc3a",
    "balance_current": "50777.00"
  }
]

export const GRID: IDDSGridData = {
  "data": [
    {
      "data": {
        "name": "Доступные средства на начало периода",
        "2025-12": 0,
        "2026-01": -99859834
      }
    },
    {
      "data": {
        "name": "Доступные средства на конец периода",
        "2025-12": -99859834,
        "2026-01": -99859834
      }
    },
    {
      "data": {
        "name": "Оборот денег за период",
        "2025-12": -100
      }
    },
    {
      "data": {
        "name": "Операционная деятельность",
        "2025-12": null,
        "2026-01": null
      },
      "expanded": true,
      "children": [
        {
          "data": {
            "name": "Поступления",
            "2025-12": null,
            "2026-01": null
          },
          "expanded": false,
          "children": [
            {
              "data": {
                "name": "Выручка от Wildberries"
              }
            },
            {
              "data": {
                "name": "Возврат д/с от поставщика"
              }
            },
            {
              "data": {
                "name": "Кэшбэк от банка"
              }
            },
            {
              "data": {
                "name": "Выручка от Ozon"
              }
            }
          ]
        },
        {
          "data": {
            "name": "Списания",
            "2025-12": null,
            "2026-01": null
          },
          "expanded": false,
          "children": [
            {
              "data": {
                "name": "Закупка товара у поставщиков"
              }
            },
            {
              "data": {
                "name": "Доставка до ФФ"
              }
            },
            {
              "data": {
                "name": "Упаковка и расходные материалы"
              }
            },
            {
              "data": {
                "name": "Фулфилмент вне с/с"
              }
            },
            {
              "data": {
                "name": "Фулфилмент"
              }
            },
            {
              "data": {
                "name": "Возврат клиенту по браку"
              }
            },
            {
              "data": {
                "name": "Дизайнеры / Фотографы"
              }
            },
            {
              "data": {
                "name": "Реклама таргет / блогеры"
              }
            },
            {
              "data": {
                "name": "Пополнение рекламы ВБ"
              }
            },
            {
              "data": {
                "name": "Кэшбек за отзывы"
              }
            },
            {
              "data": {
                "name": "СМВ/ раздача товара"
              }
            },
            {
              "data": {
                "name": "Расчетно-кассовое обслуживание (РКО)"
              }
            },
            {
              "data": {
                "name": "Софт, сервисы"
              }
            },
            {
              "data": {
                "name": "Сертификация и регистрация торговых марок"
              }
            },
            {
              "data": {
                "name": "Аренда и коммунальные платежи"
              }
            },
            {
              "data": {
                "name": "ЗП (зарплата)"
              }
            },
            {
              "data": {
                "name": "Обучение"
              }
            },
            {
              "data": {
                "name": "Оборудование менее 40т.руб."
              }
            },
            {
              "data": {
                "name": "Налоги"
              }
            },
            {
              "data": {
                "name": "Займ / кредит (Выплата процентов)"
              }
            },
            {
              "data": {
                "name": "Инвесторы (Выплата процентов)"
              }
            },
            {
              "data": {
                "name": "Test Eyyup 12:04"
              }
            }
          ]
        }
      ]
    },
    {
      "data": {
        "name": "Финансовая деятельность",
        "2025-12": "-100.00",
        "2026-01": null
      },
      "expanded": true,
      "children": [
        {
          "data": {
            "name": "Поступления",
            "2025-12": null,
            "2026-01": null
          },
          "expanded": false,
          "children": [
            {
              "data": {
                "name": "Поступление собственных средств"
              }
            },
            {
              "data": {
                "name": "Поступление займа / кредита"
              }
            },
            {
              "data": {
                "name": "Поступления от инвесторов"
              }
            }
          ]
        },
        {
          "data": {
            "name": "Списания",
            "2025-12": "-100.00",
            "2026-01": null
          },
          "expanded": false,
          "children": [
            {
              "data": {
                "name": "Дивиденды собственнику"
              }
            },
            {
              "data": {
                "name": "Вложенные средства собственника (Погашение тела долга)\r\n"
              }
            },
            {
              "data": {
                "name": "Займ / кредит (Погашение тела долга)"
              }
            },
            {
              "data": {
                "name": "Инвесторы (Погашение тела долга)"
              }
            },
            {
              "data": {
                "name": "Упаковка и расходные материалы вне с/с"
              }
            },
            {
              "data": {
                "name": "НДС для ОПиУ",
                "2025-12": -100
              }
            }
          ]
        }
      ]
    },
    {
      "data": {
        "name": "Инвестиционная деятельность",
        "2025-12": null,
        "2026-01": null
      },
      "expanded": true,
      "children": [
        {
          "data": {
            "name": "Поступления",
            "2025-12": null,
            "2026-01": null
          },
          "expanded": false,
          "children": [
            {
              "data": {
                "name": "Продажа ОС"
              }
            }
          ]
        },
        {
          "data": {
            "name": "Списания",
            "2025-12": null,
            "2026-01": null
          },
          "expanded": false,
          "children": [
            {
              "data": {
                "name": "Покупка ОС"
              }
            },
            {
              "data": {
                "name": "Ремонт ОС"
              }
            }
          ]
        }
      ]
    },
    {
      "data": {
        "name": "Деятельность вне МП",
        "2025-12": null,
        "2026-01": null
      },
      "expanded": true,
      "children": [
        {
          "data": {
            "name": "Поступления",
            "2025-12": null,
            "2026-01": null
          },
          "expanded": false,
          "children": [
            {
              "data": {
                "name": "Доход вне МП"
              }
            }
          ]
        },
        {
          "data": {
            "name": "Списания",
            "2025-12": null,
            "2026-01": null
          },
          "expanded": false,
          "children": [
            {
              "data": {
                "name": "Расход вне МП"
              }
            }
          ]
        }
      ]
    },
    {
      "data": {
        "name": "Перемещения",
        "2025-12": null,
        "2026-01": null
      },
      "expanded": true,
      "children": [
        {
          "data": {
            "name": "Поступления",
            "2025-12": null,
            "2026-01": null
          },
          "expanded": false,
          "children": [
            {
              "data": {
                "name": "Перемещение (Поступление)"
              }
            }
          ]
        },
        {
          "data": {
            "name": "Списания",
            "2025-12": null,
            "2026-01": null
          },
          "expanded": false,
          "children": [
            {
              "data": {
                "name": "Перемещение (Списание)"
              }
            }
          ]
        }
      ]
    }
  ],
  "columns": [
    {
      "field": "2025-12",
      "header": "12.2025"
    },
    {
      "field": "2026-01",
      "header": "01.2026"
    }
  ]
}