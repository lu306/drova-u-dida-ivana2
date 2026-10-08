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

// Колоті дрова: колонка STOP, прайс 07.10.2026. Ціна за 1 скл. м.
const BIRCH_ALDER_PRICES: Record<number, number> = {
  3: 4800,
  4: 4400,
  5: 4200,
  6: 3800,
  7: 3700,
  8: 3700,
  9: 3600,
  10: 3500,
  11: 3500,
  12: 3500,
  13: 3500,
  14: 3500,
  15: 3500,
  20: 3400,
  25: 3400,
};

const PINE_PRICES: Record<number, number> = {
  3: 4500,
  4: 4100,
  5: 3800,
  6: 3700,
  7: 3500,
  8: 3500,
  9: 3400,
  10: 3300,
  11: 3300,
  12: 3300,
  13: 3300,
  14: 3300,
  15: 3300,
  20: 3300,
  25: 3200,
};

const HARDWOOD_PRICES: Record<number, number> = {
  3: 5400,
  4: 5100,
  5: 5000,
  6: 4800,
  7: 4700,
  8: 4700,
  9: 4600,
  10: 4500,
  11: 4500,
  12: 4500,
  13: 4500,
  14: 4400,
  15: 4400,
  20: 4400,
  25: 4400,
};

const MAPLE_PRICES: Record<number, number> = {
  3: 5200,
  4: 4900,
  5: 4800,
  6: 4600,
  7: 4500,
  8: 4500,
  9: 4400,
  10: 4300,
  11: 4300,
  12: 4300,
  13: 4300,
  14: 4200,
  15: 4200,
  20: 4200,
  25: 4200,
};

export const WOODS: WoodProduct[] = [
  {
    id: 'birch',
    name: 'Береза / яблуня / груша',
    genitive: 'берези / яблуні / груші',
    description:
      'Щільні дрова з високою тепловіддачею. Горять довго й рівно, добре тримають жар.',
    bestFor: 'Добрий вибір для печі, каміна та твердопаливного котла.',
    ordinaryPrice: 4800,
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
    ordinaryPrice: 4800,
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
    ordinaryPrice: 4500,
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
    ordinaryPrice: 5400,
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
    ordinaryPrice: 5200,
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
    ordinaryPrice: 5500,
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
