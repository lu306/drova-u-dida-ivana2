export const PHONE = '+380770984770';
export const PHONE_LABEL = '+380 77 098 47 70';

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
  3: 5600,
  4: 5200,
  5: 4900,
  6: 4400,
  7: 4200,
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

const PINE_PRICES: Record<number, number> = {
  3: 5300,
  4: 4800,
  5: 4500,
  6: 4100,
  7: 3900,
  8: 3800,
  9: 3800,
  10: 3700,
  11: 3700,
  12: 3700,
  13: 3700,
  14: 3700,
  15: 3600,
  20: 3600,
  25: 3500,
};

const HARDWOOD_PRICES: Record<number, number> = {
  3: 6300,
  4: 5900,
  5: 5700,
  6: 5400,
  7: 5300,
  8: 5200,
  9: 5100,
  10: 4900,
  11: 4900,
  12: 4900,
  13: 4900,
  14: 4900,
  15: 4900,
  20: 4800,
  25: 4700,
};

export const WOODS: WoodProduct[] = [
  {
    id: 'birch',
    name: 'Береза',
    genitive: 'берези',
    description:
      'Щільні дрова з високою тепловіддачею. Горять довго й рівно, добре тримають жар.',
    bestFor: 'Добрий вибір для печі, каміна та твердопаливного котла.',
    ordinaryPrice: 5600,
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
    ordinaryPrice: 5600,
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
    ordinaryPrice: 5300,
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
    ordinaryPrice: 6300,
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
