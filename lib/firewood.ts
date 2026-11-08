export const PHONE = '+380989661834';
export const PHONE_LABEL = '+380 98 966 18 34';

export type WoodId =
  | 'birch'
  | 'alder'
  | 'pine'
  | 'hardwood'
  | 'hornbeam'
  | 'aspen';

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

// Колоті дрова: колонка БАЗА, прайс 27.10.2026. Ціна за 1 скл. м.
const BIRCH_ALDER_PRICES: Record<number, number> = {
  3: 4200,
  4: 4000,
  5: 3900,
  6: 3500,
  7: 3500,
  8: 3500,
  9: 3400,
  10: 3400,
  11: 3400,
  12: 3400,
  13: 3300,
  14: 3300,
  15: 3300,
  20: 3300,
  25: 3300,
};

const PINE_PRICES: Record<number, number> = {
  3: 3900,
  4: 3600,
  5: 3500,
  6: 3400,
  7: 3300,
  8: 3200,
  9: 3200,
  10: 3200,
  11: 3100,
  12: 3100,
  13: 3100,
  14: 3100,
  15: 3100,
  20: 3100,
  25: 3100,
};

const HARDWOOD_PRICES: Record<number, number> = {
  3: 4900,
  4: 4700,
  5: 4700,
  6: 4500,
  7: 4500,
  8: 4500,
  9: 4400,
  10: 4400,
  11: 4400,
  12: 4400,
  13: 4300,
  14: 4300,
  15: 4300,
  20: 4300,
  25: 4300,
};

const woodProducts: WoodProduct[] = [
  {
    id: 'birch',
    name: 'Береза',
    genitive: 'берези',
    description:
      'Щільні дрова з високою тепловіддачею. Горять довго й рівно, добре тримають жар.',
    bestFor: 'Добрий вибір для печі, каміна та твердопаливного котла.',
    ordinaryPrice: BIRCH_ALDER_PRICES[3],
    prices: BIRCH_ALDER_PRICES,
    image: '/firewood-birch-v3.webp',
    imagePosition: '0% 50%',
  },
  {
    id: 'alder',
    name: 'Вільха',
    genitive: 'вільхи',
    description:
      'Швидко розпалюється, дає м’яке рівне тепло та утворює небагато диму й сажі.',
    bestFor: 'Підходить для печі, каміна та лазні.',
    ordinaryPrice: BIRCH_ALDER_PRICES[3],
    prices: BIRCH_ALDER_PRICES,
    image: '/firewood-alder-v3.webp',
    imagePosition: '50% 50%',
  },
  {
    id: 'pine',
    name: 'Сосна',
    genitive: 'сосни',
    description:
      'Легко розпалюється та швидко прогріває приміщення. Має приємний хвойний аромат.',
    bestFor: 'Зручна для розпалювання, печі та твердопаливного котла.',
    ordinaryPrice: PINE_PRICES[3],
    prices: PINE_PRICES,
    image: '/firewood-pine-v3.webp',
    imagePosition: '100% 50%',
  },
  {
    id: 'hardwood',
    name: 'Дубові дрова',
    genitive: 'дуба',
    description:
      'Дубові колоті дрова з високою тепловіддачею. Довго горять і добре тримають жар.',
    bestFor:
      'Найкращий вибір для тривалого опалення печі та твердопаливного котла.',
    ordinaryPrice: HARDWOOD_PRICES[3],
    prices: HARDWOOD_PRICES,
    image: '/firewood-hardwood-v3.webp',
    imagePosition: '50% 50%',
  },
  {
    id: 'hornbeam',
    name: 'Граб',
    genitive: 'граба',
    description:
      'Щільні дрова для тривалого горіння.',
    bestFor: 'Для тривалого опалення печі та котла.',
    ordinaryPrice: HARDWOOD_PRICES[3],
    prices: HARDWOOD_PRICES,
    image: '/firewood-hornbeam-v4.webp',
    imagePosition: '50% 50%',
  },
  {
    id: 'aspen',
    name: 'Осика',
    genitive: 'осики',
    description: 'Колоті дрова з осики для домашнього опалення.',
    bestFor: 'Для печі та твердопаливного котла.',
    ordinaryPrice: PINE_PRICES[3],
    prices: PINE_PRICES,
    image: '/firewood-aspen-v3.webp',
    imagePosition: '50% 50%',
  },
];

const woodOrder: WoodId[] = [
  'hardwood',
  'hornbeam',
  'birch',
  'alder',
  'pine',
  'aspen',
];
// Оновлені фіксовані ціни за 1 скл. м на всіх обсягах (08.11.2026).
const FIXED_UNIT_PRICES: Partial<Record<WoodId, number>> = {
  hardwood: 4150,
  birch: 3200,
  alder: 3200,
  pine: 3000,
  aspen: 3000,
};
// Для решти порід збережено попередні тарифи БАЗА +100 грн/скл. м.
const SITE_MARKUP = 100;
export const WOODS: WoodProduct[] = woodOrder.map((id) => {
  const wood = woodProducts.find((item) => item.id === id)!;
  const fixedPrice = FIXED_UNIT_PRICES[id];
  return {
    ...wood,
    ordinaryPrice: fixedPrice ?? wood.ordinaryPrice + SITE_MARKUP,
    prices: {
      2: fixedPrice ?? wood.prices[3] + SITE_MARKUP,
      ...Object.fromEntries(
        Object.entries(wood.prices).map(([quantity, price]) => [quantity, fixedPrice ?? price + SITE_MARKUP]),
      ),
    },
  };
});

export const PRICE_QUANTITIES = [2, 3, 5, 7, 10, 12, 15, 20, 25] as const;

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
