export const PHONE = '+380770984770';
export const PHONE_LABEL = '+380 77 098 47 70';

export type WoodId =
  | 'birch'
  | 'alder'
  | 'pine'
  | 'hardwood'
  | 'maple'
  | 'hornbeam';

export type WoodProduct = {
  id: WoodId;
  name: string;
  genitive: string;
  description: string;
  bestFor: string;
  ordinaryPrice: number;
  prices: Record<number, number>;
  image: string;
  imagePosition: string;
};

// Колоті дрова: колонка БАЗА, прайс 07.10.2026. Ціна за 1 скл. м.
const BIRCH_ALDER_PRICES: Record<number, number> = {
  3: 4900,
  4: 4600,
  5: 4300,
  6: 3900,
  7: 3900,
  8: 3800,
  9: 3700,
  10: 3600,
  11: 3600,
  12: 3600,
  13: 3600,
  14: 3600,
  15: 3600,
  20: 3600,
  25: 3500,
};

const PINE_PRICES: Record<number, number> = {
  3: 4600,
  4: 4200,
  5: 3900,
  6: 3800,
  7: 3700,
  8: 3600,
  9: 3500,
  10: 3400,
  11: 3400,
  12: 3400,
  13: 3400,
  14: 3400,
  15: 3400,
  20: 3400,
  25: 3300,
};

const HARDWOOD_PRICES: Record<number, number> = {
  3: 5600,
  4: 5300,
  5: 5100,
  6: 4900,
  7: 4900,
  8: 4800,
  9: 4700,
  10: 4600,
  11: 4600,
  12: 4600,
  13: 4600,
  14: 4600,
  15: 4600,
  20: 4600,
  25: 4500,
};

const MAPLE_PRICES: Record<number, number> = {
  3: 5400,
  4: 5100,
  5: 4900,
  6: 4700,
  7: 4700,
  8: 4600,
  9: 4500,
  10: 4400,
  11: 4400,
  12: 4400,
  13: 4400,
  14: 4400,
  15: 4400,
  20: 4400,
  25: 4300,
};

export const WOODS: WoodProduct[] = [
  {
    id: 'birch',
    name: 'Береза / яблуня / груша',
    genitive: 'берези / яблуні / груші',
    description:
      'Щільні дрова з високою тепловіддачею. Горять довго й рівно, добре тримають жар.',
    bestFor: 'Добрий вибір для печі, каміна та твердопаливного котла.',
    ordinaryPrice: 4900,
    prices: BIRCH_ALDER_PRICES,
    image: '/firewood-birch-v1.png',
    imagePosition: '0% 50%',
  },
  {
    id: 'alder',
    name: 'Вільха',
    genitive: 'вільхи',
    description:
      'Швидко розпалюється, дає м’яке рівне тепло та утворює небагато диму й сажі.',
    bestFor: 'Підходить для печі, каміна та лазні.',
    ordinaryPrice: 4900,
    prices: BIRCH_ALDER_PRICES,
    image: '/firewood-alder-v1.png',
    imagePosition: '50% 50%',
  },
  {
    id: 'pine',
    name: 'Сосна / осика',
    genitive: 'сосни / осики',
    description:
      'Легко розпалюється та швидко прогріває приміщення. Сосна та осика за однаковою ціною.',
    bestFor: 'Зручна для розпалювання, печі та твердопаливного котла.',
    ordinaryPrice: 4600,
    prices: PINE_PRICES,
    image: '/firewood-pine-v1.png',
    imagePosition: '100% 50%',
  },
  {
    id: 'hardwood',
    name: 'Тверді породи',
    genitive: 'твердих порід',
    description:
      'Дуб, ясен та акація — щільні дрова з високою тепловіддачею. Довго горять і добре тримають жар.',
    bestFor:
      'Найкращий вибір для тривалого опалення печі та твердопаливного котла.',
    ordinaryPrice: 5600,
    prices: HARDWOOD_PRICES,
    image: '/firewood-hardwood-v1.png',
    imagePosition: '50% 50%',
  },
  {
    id: 'maple',
    name: 'Клен',
    genitive: 'клена',
    description: 'Колоті дрова з клена. Рівне тепло для домашнього опалення.',
    bestFor: 'Для печі, каміна та твердопаливного котла.',
    ordinaryPrice: 5400,
    prices: MAPLE_PRICES,
    image: '/firewood-hardwood-v1.png',
    imagePosition: '50% 50%',
  },
  {
    id: 'hornbeam',
    name: 'Граб',
    genitive: 'граба',
    description:
      'Щільні дрова для тривалого горіння. Доплата за граб +100 грн/скл. м вже врахована.',
    bestFor: 'Для тривалого опалення печі та котла.',
    ordinaryPrice: 5700,
    prices: Object.fromEntries(
      Object.entries(HARDWOOD_PRICES).map(([quantity, price]) => [
        quantity,
        price + 100,
      ]),
    ),
    image: '/firewood-hardwood-v1.png',
    imagePosition: '50% 50%',
  },
];

export const PRICE_QUANTITIES = [5, 10, 15, 20] as const;

export const PRICE_ROWS = PRICE_QUANTITIES.map((quantity) => ({
  label: `${quantity} скл. м`,
  quantity,
}));

export function getWood(id: WoodId) {
  return WOODS.find((wood) => wood.id === id) ?? WOODS[0];
}

export function getUnitPrice(wood: WoodProduct, quantity: number) {
  if (wood.prices[quantity]) return wood.prices[quantity];
  const available = Object.keys(wood.prices)
    .map(Number)
    .sort((a, b) => a - b);
  const closest = available.filter((value) => value <= quantity).at(-1);
  return wood.prices[closest ?? available[0]];
}

export function formatPrice(value: number) {
  return value.toLocaleString('uk-UA');
}
