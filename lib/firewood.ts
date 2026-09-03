export const PHONE = '+380989661834';
export const PHONE_LABEL = '+380 98 966 18 34';

export type WoodId = 'birch' | 'alder' | 'pine';

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
  3: 5610,
  4: 5320,
  5: 5140,
  6: 4770,
  7: 4450,
  8: 4200,
  9: 4060,
  10: 3950,
  11: 3950,
  12: 3950,
  13: 3920,
  14: 3890,
  15: 3870,
  20: 3790,
  25: 3750,
};

const PINE_PRICES: Record<number, number> = {
  3: 5280,
  4: 4950,
  5: 4750,
  6: 4450,
  7: 4090,
  8: 3830,
  9: 3730,
  10: 3650,
  11: 3630,
  12: 3620,
  13: 3600,
  14: 3580,
  15: 3560,
  20: 3500,
  25: 3470,
};

export const WOODS: WoodProduct[] = [
  {
    id: 'birch',
    name: 'Береза',
    genitive: 'берези',
    description:
      'Щільні дрова з високою тепловіддачею. Горять довго й рівно, добре тримають жар.',
    bestFor: 'Добрий вибір для печі, каміна та твердопаливного котла.',
    ordinaryPrice: 5610,
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
    ordinaryPrice: 5610,
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
    ordinaryPrice: 5280,
    prices: PINE_PRICES,
    image: '/firewood-pine-v1.png',
    imagePosition: '100% 50%',
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
