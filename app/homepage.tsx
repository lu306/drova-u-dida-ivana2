'use client';

import { useEffect, useState } from 'react';
import {
  BadgeCheck,
  Banknote,
  Check,
  Clock3,
  Flame,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Warehouse,
} from 'lucide-react';

import { PhoneButton } from '@/app/firewood-ui';
import {
  PHONE,
  PHONE_LABEL,
  WOODS,
  formatPrice,
  getUnitPrice,
  getWood,
  type WoodId,
} from '@/lib/firewood';
import { cn } from '@/lib/utils';

const quantities = [5, 10, 15, 20];

const benefits = [
  {
    icon: Flame,
    title: 'Сухі дрова',
    text: 'Вологість 15–20%',
  },
  {
    icon: PackageCheck,
    title: 'Чистий об’єм',
    text: 'Без обману та порожнин',
  },
  {
    icon: Truck,
    title: 'Швидка доставка',
    text: 'Вже включена у вартість',
  },
  {
    icon: Banknote,
    title: 'Зручна оплата',
    text: 'При отриманні або карткою',
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Працюємо з 1985 року',
  },
  {
    icon: Users,
    title: 'Понад 20 000 клієнтів',
  },
  {
    icon: Warehouse,
    title: 'Власні склади й транспорт',
  },
  {
    icon: BadgeCheck,
    title: 'Гарантуємо об’єм та якість',
  },
];

function SavingsCalculator({
  woodId,
  quantity,
  onWoodChange,
  onQuantityChange,
}: {
  woodId: WoodId;
  quantity: number;
  onWoodChange: (id: WoodId) => void;
  onQuantityChange: (quantity: number) => void;
}) {
  const wood = getWood(woodId);
  const ordinaryTotal = wood.ordinaryPrice * quantity;
  const total = getUnitPrice(wood, quantity) * quantity;
  const saving = ordinaryTotal - total;
  const savingPercent = Math.round((saving / ordinaryTotal) * 10000) / 100;

  return (
    <section
      id="calculator"
      className="relative z-10 mx-auto -mt-1 max-w-[1280px] px-3 pb-8 sm:px-6"
    >
      <div className="overflow-hidden rounded-[1.7rem] border-4 border-[#254b31] bg-[#183a28] p-4 text-white shadow-[0_18px_45px_rgba(21,42,28,.2)] sm:p-7">
        <div className="text-center">
          <p className="font-heading text-2xl font-black uppercase sm:text-3xl">
            Розрахуйте свою економію
          </p>
          <p className="mt-1 text-base font-semibold text-white/75 sm:text-lg">
            Чим більше замовлення — тим менша ціна за складометр
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-2xl bg-[#fffaf0] p-4 text-primary sm:p-5">
            <p className="text-base font-black">Оберіть породу</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {WOODS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onWoodChange(item.id)}
                  aria-pressed={woodId === item.id}
                  className={cn(
                    'min-h-12 rounded-lg border-2 px-2 text-base font-black transition',
                    woodId === item.id
                      ? 'border-[#d99600] bg-[#f0b83d]'
                      : 'border-[#d8c8aa] bg-white hover:border-[#d99600]',
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <p className="mt-5 text-base font-black">Оберіть об’єм</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {quantities.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onQuantityChange(value)}
                  aria-pressed={quantity === value}
                  className={cn(
                    'min-h-14 rounded-lg border-2 px-2 text-lg font-black transition',
                    quantity === value
                      ? 'border-[#d99600] bg-[#f0b83d]'
                      : 'border-[#d8c8aa] bg-white hover:border-[#d99600]',
                  )}
                >
                  {value} м³
                </button>
              ))}
            </div>
            <p className="mt-3 text-center text-sm font-bold text-[#6a675f]">
              1 складометр ≈ 1,7 м³
            </p>
          </div>

          <div className="grid overflow-hidden rounded-2xl bg-[#fffaf0] text-primary sm:grid-cols-[1.15fr_.85fr]">
            <div className="grid grid-cols-2 items-center gap-3 p-5 sm:p-7">
              <div className="border-r border-[#d8c8aa] pr-3">
                <p className="text-base font-bold text-[#6b665b]">Було</p>
                <p className="mt-1 font-heading text-3xl font-black">
                  <s className="decoration-[#b84a2f] decoration-4">
                    {formatPrice(ordinaryTotal)}
                  </s>{' '}
                  <span className="text-lg">грн</span>
                </p>
              </div>
              <div className="pl-2">
                <p className="text-base font-bold text-[#6b665b]">Зараз</p>
                <p className="mt-1 font-heading text-3xl font-black">
                  {formatPrice(total)} <span className="text-lg">грн</span>
                </p>
              </div>
              <p className="col-span-2 text-base font-bold text-[#5f635d]">
                {quantity} м³ · {wood.name} · доставка включена
              </p>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#f0b83d] p-5 text-center text-primary sm:p-7">
              <p className="text-base font-black">Ваша економія</p>
              <p className="mt-1 font-heading text-4xl font-black sm:text-5xl">
                {formatPrice(saving)} грн
              </p>
              <p className="mt-1 text-base font-black">
                Економія {savingPercent}%
              </p>
              <a
                href={`tel:${PHONE}`}
                className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-base font-black text-white"
              >
                <Phone className="size-5" /> Подзвонити
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Homepage() {
  const [woodId, setWoodId] = useState<WoodId>('birch');
  const [quantity, setQuantity] = useState(10);

  const chooseWood = (id: WoodId) => {
    setWoodId(id);
    window.setTimeout(
      () =>
        document
          .getElementById('calculator')
          ?.scrollIntoView({ behavior: 'smooth' }),
      0,
    );
  };

  useEffect(() => {
    const modelContext = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options?: { signal?: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!modelContext?.registerTool) return;

    const lifecycle = new AbortController();
    void Promise.resolve(
      modelContext.registerTool(
        {
          name: 'stage_firewood_quote',
          title: 'Підготувати розрахунок дров',
          description:
            'Обирає породу та обсяг, оновлює видимий розрахунок перед дзвінком.',
          inputSchema: {
            type: 'object',
            properties: {
              wood: { type: 'string', enum: WOODS.map((wood) => wood.id) },
              quantity: {
                type: 'integer',
                enum: quantities,
              },
            },
            required: ['wood', 'quantity'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute(input: unknown) {
            if (!input || typeof input !== 'object') {
              throw new Error('Некоректні параметри');
            }
            const { wood, quantity: nextQuantity } = input as {
              wood?: unknown;
              quantity?: unknown;
            };
            const nextWood = WOODS.find((item) => item.id === wood);
            if (!nextWood || !quantities.includes(Number(nextQuantity))) {
              throw new Error('Оберіть породу та обсяг 5, 10, 15 або 20 м³');
            }
            const count = Number(nextQuantity);
            const unitPrice = getUnitPrice(nextWood, count);
            setWoodId(nextWood.id);
            setQuantity(count);
            window.setTimeout(
              () =>
                document
                  .getElementById('calculator')
                  ?.scrollIntoView({ behavior: 'smooth' }),
              0,
            );
            return {
              wood: nextWood.name,
              quantity: count,
              unitPrice,
              total: unitPrice * count,
              saving: (nextWood.ordinaryPrice - unitPrice) * count,
              delivery: 0,
              nextStep: `Зателефонувати ${PHONE_LABEL}`,
            };
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6efdf] pb-[76px] text-primary sm:pb-0">
      <div className="border-b border-white/10 bg-[#183a28] px-4 py-2 text-white">
        <div className="mx-auto flex max-w-[1180px] flex-wrap justify-center gap-x-8 gap-y-1 text-sm font-bold sm:text-base">
          <span>
            <Truck className="mr-2 inline size-4 text-[#f0b83d]" />
            Доставка по Києву та області
          </span>
          <span className="hidden sm:inline">
            <Banknote className="mr-2 inline size-4 text-[#f0b83d]" />
            Оплата при отриманні
          </span>
          <span className="hidden md:inline">
            <ShieldCheck className="mr-2 inline size-4 text-[#f0b83d]" />
            Чесні ціни — без сюрпризів
          </span>
        </div>
      </div>

      <header className="border-b border-[#d8c8aa] bg-[#fffaf0]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#advice" className="flex min-w-0 items-center gap-3">
            <img
              src="/logo.png"
              alt="Дрова у Діда Івана"
              className="size-16 shrink-0 object-contain sm:size-24"
            />
            <div>
              <p className="font-heading text-xl font-black leading-none sm:text-3xl">
                Дрова
                <span className="block">у Діда Івана</span>
              </p>
              <p className="mt-1 hidden text-sm font-semibold text-[#625f56] sm:block">
                Натуральні дрова з доставкою
              </p>
            </div>
          </a>

          <div className="hidden flex-1 lg:block">
            <div className="flex items-center justify-end gap-8 border-b border-[#e2d7c3] pb-3 text-sm font-bold text-[#615d54]">
              <span>
                <Truck className="mr-2 inline size-4" /> Доставка включена
              </span>
              <span>
                <Banknote className="mr-2 inline size-4" /> Оплата при отриманні
              </span>
            </div>
            <nav
              aria-label="Головна навігація"
              className="flex items-center justify-end gap-7 pt-3 text-base font-black"
            >
              <a href="#products" className="hover:text-[#b17300]">
                Береза
              </a>
              <a href="#products" className="hover:text-[#b17300]">
                Вільха
              </a>
              <a href="#products" className="hover:text-[#b17300]">
                Сосна
              </a>
              <a href="#calculator" className="hover:text-[#b17300]">
                Розрахунок
              </a>
              <a href="#contacts" className="hover:text-[#b17300]">
                Контакти
              </a>
            </nav>
          </div>

          <div className="text-right">
            <a
              href={`tel:${PHONE}`}
              className="hidden font-heading text-2xl font-black xl:block"
            >
              <Phone className="mr-2 inline size-6 text-[#d99600]" />
              {PHONE_LABEL}
            </a>
            <p className="hidden text-sm font-bold text-[#625f56] xl:block">
              Пн–Нд: 08:00–20:00
            </p>
            <PhoneButton
              label="Подзвонити"
              className="min-h-12 px-4 text-base xl:hidden"
            />
          </div>
        </div>
      </header>

      <section id="advice" className="bg-[#10291c] text-white">
        <div className="mx-auto flex max-w-[1180px] items-center gap-4 px-4 py-4 sm:px-6">
          <img
            src="/logo.png"
            alt=""
            className="size-20 shrink-0 object-contain sm:size-24"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black uppercase tracking-[.14em] text-[#f0b83d]">
              Дід Іван радить
            </p>
            <p className="mt-1 font-heading text-2xl font-black uppercase leading-tight sm:text-4xl">
              Беріть дрова з запасом
            </p>
            <p className="mt-1 hidden text-base font-semibold text-white/75 md:block">
              Чим більше замовлення — тим нижча ціна за складометр.
            </p>
          </div>
          <a
            href="#calculator"
            className="hidden min-h-12 shrink-0 items-center justify-center rounded-lg bg-[#f0b83d] px-5 text-base font-black text-primary sm:flex"
          >
            Порахувати вигоду
          </a>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-[#d8c8aa]">
        <img
          src="/hero-firewood-v2.png"
          alt="Складені колоті дрова"
          className="absolute inset-0 -z-20 size-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#fffaf0_0%,rgba(255,250,240,.97)_45%,rgba(255,250,240,.28)_76%,rgba(16,41,28,.08)_100%)] max-md:bg-[linear-gradient(180deg,rgba(255,250,240,.98)_0%,rgba(255,250,240,.9)_72%,rgba(255,250,240,.45)_100%)]" />
        <div className="mx-auto grid min-h-[500px] max-w-[1280px] items-center px-4 py-10 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:py-14">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-[#d8c8aa] bg-[#fffaf0]/90 px-4 py-2 text-sm font-black uppercase tracking-wide">
              Береза · Вільха · Сосна
            </p>
            <h1 className="mt-5 font-heading text-[clamp(3.2rem,6.4vw,6.7rem)] font-black uppercase leading-[.88] tracking-[-.04em]">
              Більше дров —
              <span className="block text-[#d08a00]">більша економія</span>
              <span className="block text-[#9b3724]">в гривнях!</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl font-semibold leading-snug sm:text-2xl">
              Замовляйте більший об’єм та економте{' '}
              <strong className="text-[#9b3724]">до 6 000 грн</strong> на одному
              замовленні.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PhoneButton className="min-h-16 text-xl" />
              <a
                href="#calculator"
                className="flex min-h-16 items-center justify-center rounded-xl border-2 border-primary bg-[#fffaf0] px-6 text-xl font-black"
              >
                Розрахувати вигоду
              </a>
            </div>
          </div>
          <div className="pointer-events-none relative hidden min-h-[430px] lg:block">
            <img
              src="/logo.png"
              alt=""
              className="absolute bottom-[-55px] right-0 w-[430px] drop-shadow-[0_24px_30px_rgba(32,21,12,.25)]"
            />
          </div>
        </div>
      </section>

      <SavingsCalculator
        woodId={woodId}
        quantity={quantity}
        onWoodChange={setWoodId}
        onQuantityChange={setQuantity}
      />

      <section className="paper-texture px-4 pb-12 sm:px-6">
        <div className="mx-auto grid max-w-[1180px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-center gap-3 border-b border-[#d8c8aa] py-4 lg:border-b-0"
            >
              <Icon className="size-8 shrink-0 text-[#9b6a18]" />
              <div>
                <p className="text-base font-black">{title}</p>
                <p className="text-sm font-semibold text-[#67635b]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="products"
        className="paper-texture px-4 py-12 sm:px-6 lg:py-16"
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="flex items-center justify-center gap-4 text-center">
            <span className="h-px flex-1 bg-[#cda86c]" />
            <h2 className="font-heading text-[clamp(2.4rem,5vw,4.2rem)] font-black uppercase leading-none">
              Оберіть свої дрова
            </h2>
            <span className="h-px flex-1 bg-[#cda86c]" />
          </div>

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {WOODS.map((wood) => (
              <article
                key={wood.id}
                className="grid overflow-hidden rounded-2xl border-2 border-[#d6c7aa] bg-[#fffaf0] shadow-[0_10px_25px_rgba(59,43,23,.08)] sm:grid-cols-[.9fr_1.1fr] lg:grid-cols-1"
              >
                <div
                  role="img"
                  aria-label={`Колоті дрова: ${wood.name}`}
                  className="product-photo min-h-52"
                  style={{ backgroundPosition: wood.imagePosition }}
                />
                <div className="flex flex-col p-5">
                  <h3 className="font-heading text-3xl font-black uppercase">
                    {wood.name}
                  </h3>
                  <p className="mt-2 text-base font-semibold text-[#5f625b]">
                    {wood.description}
                  </p>
                  <p className="mt-5 text-sm font-black uppercase text-[#776b59]">
                    від
                  </p>
                  <p className="font-heading text-4xl font-black">
                    {formatPrice(wood.tiers[2])}{' '}
                    <span className="text-lg">грн / м³</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => chooseWood(wood.id)}
                    className="mt-5 min-h-13 rounded-lg bg-primary px-4 text-base font-black text-white"
                  >
                    Розрахувати вигоду
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:pb-20">
        <div className="mx-auto grid max-w-[1280px] gap-3 rounded-2xl bg-[#183a28] p-5 text-white sm:grid-cols-2 lg:grid-cols-4 lg:p-7">
          {trustItems.map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/40">
                <Icon className="size-6 text-[#f0b83d]" />
              </span>
              <p className="text-base font-black leading-tight">{title}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contacts"
        className="bg-[#10291c] px-4 py-10 text-white sm:px-6"
      >
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="size-20 object-contain" />
            <div>
              <p className="font-heading text-2xl font-black">
                Дрова у Діда Івана
              </p>
              <p className="text-base font-semibold text-white/65">
                Береза · Вільха · Сосна
              </p>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-sm font-bold text-white/65">
              Натисніть, щоб зателефонувати
            </p>
            <a
              href={`tel:${PHONE}`}
              className="mt-1 block font-heading text-3xl font-black text-[#f0b83d]"
            >
              {PHONE_LABEL}
            </a>
            <p className="mt-1 text-sm font-bold text-white/65">
              Щодня 08:00–20:00
            </p>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[#0f281a] bg-[#183a28] p-2 sm:hidden">
        <a
          href={`tel:${PHONE}`}
          className="flex min-h-14 items-center justify-center gap-2 rounded-lg border border-[#fffaf0]/50 bg-[#183a28] px-3 text-base font-black text-white"
        >
          <Phone className="size-5" /> Подзвонити
        </a>
        <a
          href="#calculator"
          className="flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[#f0b83d] px-3 text-base font-black text-primary"
        >
          <Sparkles className="size-5" /> Розрахувати
        </a>
      </div>
    </main>
  );
}
