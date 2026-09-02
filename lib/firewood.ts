export const PHONE = '+380671234567';
export const PHONE_LABEL = '(067) 123-45-67';

export type WoodId = 'birch' | 'alder' | 'pine';

export type WoodProduct = {
  id: WoodId;
  name: string;
  genitive: string;
  description: string;
  bestFor: string;
  ordinaryPrice: number;
  tiers: [number, number, number];
  imagePosition: string;
};

export const WOODS: WoodProduct[] = [
  {
    id: 'birch',
    name: 'Береза',
    genitive: 'берези',
    description: 'Дає багато тепла, горить довго та рівно.',
    bestFor: 'Для печі, каміна та котла',
    ordinaryPrice: 4300,
    tiers: [4200, 3900, 3700],
    imagePosition: '0% 50%',
  },
  {
    id: 'alder',
    name: 'Вільха',
    genitive: 'вільхи',
    description: 'Мало диму та сажі, приємне рівне тепло.',
    bestFor: 'Для печі, лазні та каміна',
    ordinaryPrice: 4000,
    tiers: [3900, 3600, 3400],
    imagePosition: '50% 50%',
  },
  {
    id: 'pine',
    name: 'Сосна',
    genitive: 'сосни',
    description: 'Швидко розпалюється та має доступну ціну.',
    bestFor: 'Для розпалювання та котла',
    ordinaryPrice: 3400,
    tiers: [3300, 3100, 2900],
    imagePosition: '100% 50%',
  },
];

export const PRICE_ROWS = [
  { label: '3–5 скл. м', tier: 0 },
  { label: '6–9 скл. м', tier: 1 },
  { label: '10+ скл. м', tier: 2 },
] as const;

export function getWood(id: WoodId) {
  return WOODS.find((wood) => wood.id === id) ?? WOODS[0];
}

export function getUnitPrice(wood: WoodProduct, quantity: number) {
  if (quantity >= 10) return wood.tiers[2];
  if (quantity >= 6) return wood.tiers[1];
  return wood.tiers[0];
}

export function formatPrice(value: number) {
  return value.toLocaleString('uk-UA');
}
