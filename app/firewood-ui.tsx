'use client';

import {
  Check,
  ChevronDown,
  Flame,
  Minus,
  Phone,
  Plus,
  Tags,
  Truck,
} from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  PHONE,
  PHONE_LABEL,
  PRICE_ROWS,
  WOODS,
  formatPrice,
  getUnitPrice,
  getWood,
  type WoodId,
  type WoodProduct,
} from '@/lib/firewood';
import { cn } from '@/lib/utils';

export function PhoneButton({
  label = 'Зателефонувати',
  className,
  light = false,
}: {
  label?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <a
      href={`tel:${PHONE}`}
      className={cn(
        buttonVariants({ size: 'lg' }),
        'min-h-14 rounded-xl px-6 text-lg font-black shadow-[0_4px_0_#6f2d20] transition active:translate-y-1 active:shadow-none',
        light
          ? 'bg-[#fff8eb] text-primary shadow-[0_4px_0_#c8b797] hover:bg-white'
          : 'bg-[#b84a2f] text-white hover:bg-[#a33e27]',
        className,
      )}
      aria-label={`${label}: ${PHONE_LABEL}`}
    >
      <Phone className="size-6" /> {label}
    </a>
  );
}

export function ProductCard({
  wood,
  onChoose,
  compact = false,
}: {
  wood: WoodProduct;
  onChoose?: (id: WoodId) => void;
  compact?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-[#d6c7aa] bg-[#fffaf0] shadow-[0_12px_34px_rgba(59,43,23,.09)]">
      <div
        role="img"
        aria-label={`Колоті дрова: ${wood.name}`}
        className={cn(
          'product-photo relative min-h-56 w-full bg-[#a77d55]',
          compact && 'min-h-44',
        )}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(10, 28, 18, 0) 58%, rgba(10, 28, 18, 0.16)), url('${wood.image}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute left-4 top-4 rounded-full bg-[#fffaf0]/95 px-3 py-2 text-sm font-black text-primary shadow-md">
          Колоті · готові до використання
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-4xl font-black uppercase text-primary">
              {wood.name}
            </h3>
            <p className="mt-1 text-lg font-semibold text-[#5d625c]">
              {wood.description}
            </p>
          </div>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#183a28] text-[#f0b83d]">
            <Flame className="size-6" />
          </span>
        </div>

        <p className="mt-4 text-base font-bold text-[#6e6a60]">
          Звичайна ціна: <s>{formatPrice(wood.ordinaryPrice)} грн</s>
        </p>
        <div className="mt-2 rounded-2xl bg-[#f5e6cd] p-4">
          <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#9b3724]">
            <Tags className="size-5" /> Від 20 складометрів
          </p>
          <p className="mt-1 font-heading text-4xl font-black text-[#9b3724] sm:text-5xl">
            {formatPrice(getUnitPrice(wood, 20))}{' '}
            <span className="text-xl">грн / скл. м</span>
          </p>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-[#d6c7aa] bg-white text-base">
          {PRICE_ROWS.map((row, index) => (
            <div
              key={row.label}
              className={cn(
                'flex items-center justify-between gap-3 px-4 py-2.5',
                index !== PRICE_ROWS.length - 1 && 'border-b border-[#e6dcc9]',
                index === PRICE_ROWS.length - 1 &&
                  'bg-[#f0f5ef] font-black text-primary',
              )}
            >
              <span>{row.label}</span>
              <strong>{formatPrice(wood.prices[row.quantity])} грн</strong>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-2 text-base font-bold text-primary">
          <Truck className="size-5" /> Доставка вже у вартості
        </p>

        <div className="mt-auto grid gap-3 pt-5">
          <Button
            onClick={() => onChoose?.(wood.id)}
            className="min-h-14 rounded-xl bg-primary px-5 text-lg font-black text-white hover:bg-[#244d37]"
          >
            Замовити {wood.name.toLowerCase()}
          </Button>
          <PhoneButton className="w-full" />
        </div>
      </div>
    </article>
  );
}

export function PriceTable({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-3xl border-2 border-[#d6c7aa] bg-[#fffaf0] shadow-[0_12px_34px_rgba(59,43,23,.08)]',
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse text-left text-lg">
          <caption className="sr-only">
            Ціни за один складометр залежно від обсягу замовлення
          </caption>
          <thead className="bg-primary text-white">
            <tr>
              <th scope="col" className="px-5 py-5 text-xl">
                Обсяг
              </th>
              {WOODS.map((wood) => (
                <th key={wood.id} scope="col" className="px-5 py-5 text-xl">
                  {wood.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRICE_ROWS.map((row, rowIndex) => (
              <tr
                key={row.label}
                className={cn(
                  'border-t border-[#ddd0b7]',
                  rowIndex === 2 && 'bg-[#e6f0e7] text-primary',
                )}
              >
                <th scope="row" className="px-5 py-5 text-xl font-black">
                  {row.label}
                  {rowIndex === 2 && (
                    <span className="ml-2 rounded-full bg-[#b84a2f] px-2.5 py-1 text-xs text-white">
                      Найвигідніше
                    </span>
                  )}
                </th>
                {WOODS.map((wood) => (
                  <td key={wood.id} className="px-5 py-5 font-black">
                    {formatPrice(wood.prices[row.quantity])} грн
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-between gap-2 border-t border-[#d6c7aa] bg-[#f5ead6] px-5 py-4 text-base font-bold sm:flex-row">
        <span>
          <Check className="mr-1 inline size-5 text-primary" /> Ціна за 1
          складометр
        </span>
        <span>
          <Truck className="mr-1 inline size-5 text-primary" /> Доставка по
          Києву та області включена
        </span>
      </div>
    </div>
  );
}

export function OrderCalculator({
  woodId,
  quantity,
  onWoodChange,
  onQuantityChange,
  className,
}: {
  woodId: WoodId;
  quantity: number;
  onWoodChange: (id: WoodId) => void;
  onQuantityChange: (quantity: number) => void;
  className?: string;
}) {
  const wood = getWood(woodId);
  const unitPrice = getUnitPrice(wood, quantity);
  const ordinaryTotal = wood.ordinaryPrice * quantity;
  const total = unitPrice * quantity;
  const saving = ordinaryTotal - total;

  const setQuantity = (next: number) =>
    onQuantityChange(Math.max(3, Math.min(20, next)));

  return (
    <div
      className={cn(
        'grid overflow-hidden rounded-3xl bg-[#fffaf0] text-primary shadow-[0_20px_50px_rgba(0,0,0,.18)] lg:grid-cols-[1fr_.9fr]',
        className,
      )}
    >
      <div className="p-5 sm:p-8">
        <p className="step-label">Крок 1 · Оберіть дрова</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {WOODS.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              onClick={() => onWoodChange(item.id)}
              aria-pressed={woodId === item.id}
              className={cn(
                'min-h-16 rounded-xl border-2 text-lg font-black',
                woodId === item.id
                  ? 'border-primary bg-primary text-white hover:bg-primary/90 hover:text-white'
                  : 'border-[#d6c7aa] bg-white hover:bg-[#f5ead6]',
              )}
            >
              {item.name}
            </Button>
          ))}
        </div>

        <p className="step-label mt-7">Крок 2 · Скільки складометрів?</p>
        <div className="mt-3 flex items-stretch gap-3">
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 3}
            aria-label="Зменшити кількість"
            className="size-16 rounded-xl border-2 border-[#d6c7aa] bg-white"
          >
            <Minus className="size-7" />
          </Button>
          <output
            aria-live="polite"
            className="flex min-h-16 flex-1 items-center justify-center rounded-xl border-2 border-primary bg-[#f7eedc] font-heading text-4xl font-black"
          >
            {quantity} <span className="ml-2 text-lg">скл. м</span>
          </output>
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= 20}
            aria-label="Збільшити кількість"
            className="size-16 rounded-xl border-2 border-[#d6c7aa] bg-white"
          >
            <Plus className="size-7" />
          </Button>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {[3, 4, 5, 6, 8, 10, 12].map((value) => (
            <Button
              key={value}
              variant="outline"
              onClick={() => setQuantity(value)}
              aria-pressed={quantity === value}
              className={cn(
                'h-11 rounded-lg border-[#d6c7aa] text-base font-black',
                quantity === value &&
                  'border-[#b84a2f] bg-[#b84a2f] text-white hover:bg-[#b84a2f] hover:text-white',
              )}
            >
              {value}
            </Button>
          ))}
        </div>
        <p className="mt-3 text-base font-bold text-[#696a61]">
          Мінімальне замовлення — 3 складометри
        </p>
      </div>

      <div className="flex flex-col justify-between bg-[#f0b83d] p-5 sm:p-8">
        <div>
          <p className="text-base font-black uppercase tracking-wide">
            Ваше замовлення
          </p>
          <h3 className="mt-2 font-heading text-4xl font-black">
            {quantity} складометрів {wood.genitive}
          </h3>
          <div className="mt-6 rounded-2xl bg-[#fff8eb]/80 p-5">
            <p className="text-base font-bold text-[#6d6556]">Звичайна сума</p>
            <p className="text-2xl font-bold text-[#7a6f5b]">
              <s>{formatPrice(ordinaryTotal)} грн</s>
            </p>
            <p className="mt-4 text-base font-black uppercase text-[#9b3724]">
              Ваша ціна
            </p>
            <p className="font-heading text-5xl font-black text-primary">
              {formatPrice(total)} грн
            </p>
            <p className="mt-2 text-lg font-black text-[#9b3724]">
              Ваша вигода: {formatPrice(saving)} грн
            </p>
          </div>
          <p className="mt-4 flex items-center gap-2 text-lg font-black">
            <Truck className="size-6" /> Доставка: 0 грн
          </p>
        </div>
        <a
          href={`tel:${PHONE}`}
          className="mt-6 flex min-h-16 items-center justify-center gap-3 rounded-xl bg-primary px-5 text-center text-xl font-black text-white shadow-[0_5px_0_#0e2418] transition hover:bg-[#244d37] active:translate-y-1 active:shadow-none"
        >
          <Phone className="size-6" /> Замовити за цією ціною
        </a>
      </div>
    </div>
  );
}

export function PhoneBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-3xl bg-primary p-6 text-center text-white sm:p-9',
        className,
      )}
    >
      <p className="text-lg font-bold text-white/75">
        Зателефонуйте — допоможемо обрати і порахувати
      </p>
      <a
        href={`tel:${PHONE}`}
        className="mt-2 block font-heading text-[clamp(2.4rem,7vw,5rem)] font-black leading-none text-[#f0b83d] underline decoration-4 underline-offset-8"
      >
        {PHONE_LABEL}
      </a>
      <p className="mt-4 text-lg font-bold">Щодня з 08:00 до 20:00</p>
    </div>
  );
}

export function MobileBottomBar({ demo = false }: { demo?: boolean }) {
  return (
    <div
      className={cn(
        'z-50 border-t border-[#0f281a] bg-[#183a28] p-2',
        demo ? 'relative rounded-b-3xl' : 'fixed inset-x-0 bottom-0 sm:hidden',
      )}
    >
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${PHONE}`}
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#b84a2f] px-3 text-lg font-black text-white"
        >
          <Phone className="size-5" /> Подзвонити
        </a>
        <a
          href="#prices"
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#fff8eb] px-3 text-lg font-black text-primary"
        >
          <Flame className="size-5" /> Ціни
        </a>
      </div>
    </div>
  );
}

export function SelectChevron() {
  return <ChevronDown className="size-5" />;
}
