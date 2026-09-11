export const PHONE = '+380989661834';
export const PHONE_LABEL = '+380 98 966 18 34';

export type WoodId = 'birch' | 'alder' | 'pine' | 'hardwood';

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

const BIRCH_ALDER_PRICES: Record<number, number> = {
  3: 5900,
  4: 5600,
  5: 5300,
  6: 5100,
  7: 4700,
  8: 4400,
  9: 4300,
  10: 4200,
  11: 4200,
  12: 4200,
  13: 4200,
  14: 4100,
  15: 4100,
  20: 4000,
  25: 3900,
};

const PINE_PRICES: Record<number, number> = {
  3: 5600,
  4: 5200,
  5: 4900,
  6: 4800,
  7: 4400,
  8: 4100,
  9: 4000,
  10: 3900,
  11: 3900,
  12: 3900,
  13: 3900,
  14: 3900,
  15: 3900,
  20: 3800,
  25: 3700,
};

const HARDWOOD_PRICES: Record<number, number> = {
  3: 6600,
  4: 6300,
  5: 6100,
  6: 6100,
  7: 5800,
  8: 5600,
  9: 5500,
  10: 5400,
  11: 5400,
  12: 5400,
  13: 5300,
  14: 5300,
  15: 5300,
  20: 5200,
  25: 5100,
};

export const WOODS: WoodProduct[] = [
  {
    id: 'birch',
    name: 'Береза',
    genitive: 'берези',
    description:
      'Щільні дрова з високою тепловіддачею. Горять довго й рівно, добре тримають жар.',
    bestFor: 'Добрий вибір для печі, каміна та твердопаливного котла.',
    ordinaryPrice: 5900,
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
    ordinaryPrice: 5900,
    prices: BIRCH_ALDER_PRICES,
    image: '/firewood-alder-v1.png',
    imagePosition: '50% 50%',
  },
  {
    id: 'pine',
    name: 'Сосна',
    genitive: 'сосни',
    description:
      'Легко розпалюється та швидко прогріває приміщення. Має приємний хвойний аромат.',
    bestFor: 'Зручна для розпалювання, печі та твердопаливного котла.',
    ordinaryPrice: 5600,
    prices: PINE_PRICES,
    image: '/firewood-pine-v1.png',
    imagePosition: '100% 50%',
  },
  {
    id: 'hardwood',
    name: 'Тверді породи',
    genitive: 'твердих порід',
    description:
      'Дуб, граб і ясен — щільні дрова з високою тепловіддачею. Довго горять і добре тримають жар.',
    bestFor:
      'Найкращий вибір для тривалого опалення печі та твердопаливного котла.',
    ordinaryPrice: 6600,
    prices: HARDWOOD_PRICES,
    image: '/firewood-hardwood-v1.png',
    imagePosition: '50% 50%',
  },
];

export const PRICE_ROWS = [
  { label: '5 скл. м', quantity: 5 },
  { label: '10 скл. м', quantity: 10 },
  { label: '15 скл. м', quantity: 15 },
  { label: '20 скл. м', quantity: 20 },
] as const;

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
