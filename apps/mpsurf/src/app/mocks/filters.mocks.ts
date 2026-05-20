import { IGoodFilterItem, IStatusFilterItem } from "@models";

export const GOODS_MOCK: IGoodFilterItem[] = [
  {
    "SKU": "33201-",
    "nmid": "15345136",
    "Barcode": "2000561293048",
    "photo": "https://basket-02.wbbasket.ru/vol153/part15345/15345136/images/big/1.webp"
  },
  {
    "SKU": "21201-",
    "nmid": "15345311",
    "Barcode": "2000561293154",
    "photo": "https://basket-02.wbbasket.ru/vol153/part15345/15345311/images/big/1.webp"
  },
  {
    "SKU": "21201светло-фиолетовый",
    "nmid": "16218406",
    "Barcode": "2000587250063",
    "photo": "https://basket-02.wbbasket.ru/vol162/part16218/16218406/images/big/1.webp"
  },
  {
    "SKU": "02211черный",
    "nmid": "26541399",
    "Barcode": "2001912140097",
    "photo": "https://basket-02.wbbasket.ru/vol265/part26541/26541399/images/big/1.webp"
  }
]

export const TAGS_MOCK: string[] = ["флис","Илья","Маша","саша","Девочки","лето","джинсовка","мальчики"]

export const STATUSES_MOCK: IStatusFilterItem[] = [
  {
    id: 1,
    index: 1,
    name: "CAT1"
  },
  {
    id: 2,
    index: 2,
    name: "CAT2"
  },
  {
    id: 3,
    index: 3,
    name: "CAT3"
  }
]

export const CATEGORIES_MOCK: string[] = ["category1", "category2", "category3", "category4"]

export const BRANDS_MOCK: string[] = ["brand1", "brand2", "brand3", "brand4"]

export const SUBJECTS_MOCK: string[] = [
    "Брюки",
    "Джинсы",
    "Куртки",
    "Полукомбинезоны",
    "Кардиганы",
    "Комбинезоны",
    "Косухи",
    "Ветровки",
    "Шорты",
    "Бомберы",
    "Дождевики",
    "Платья",
    "Костюмы",
    "Свитшоты",
    "Игровые палатки",
    "Конструкторы"
]