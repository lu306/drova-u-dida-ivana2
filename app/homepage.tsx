'use client';

import { useEffect, useState } from 'react';
import {
  BadgeCheck,
  Banknote,
  Check,
  Clock3,
  Menu,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Warehouse,
  X,
} from 'lucide-react';

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
    icon: PackageCheck,
    title: 'Чесний об’єм',
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
    title: 'Більше 10 років на ринку',
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

  return (
    <section
      id="calculator"
      className="relative z-30 mx-auto -mt-[70px] max-w-[1280px] px-3 pb-8 sm:-mt-[90px] sm:px-6 lg:-mt-[115px]"
    >
      <div className="overflow-hidden rounded-[1.35rem] border-4 border-[#3c5b3d] bg-[#29462f] p-3 text-white shadow-[0_18px_45px_rgba(45,65,43,.2)] sm:rounded-[1.7rem] sm:p-7">
        <div className="text-center">
          <p className="whitespace-nowrap font-heading text-[1.12rem] font-black uppercase sm:text-3xl">
            Розрахуйте свою економію
          </p>
          <p className="mt-1 text-sm font-semibold text-white/75 sm:text-lg">
            Чим більше замовлення — тим менша ціна за складометр
          </p>
          <div className="mx-auto mt-3 grid max-w-[560px] grid-cols-3 gap-2 sm:mt-4 sm:gap-3">
            {WOODS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onWoodChange(item.id)}
                aria-pressed={woodId === item.id}
                className={cn(
                  'min-h-11 rounded-lg border-2 px-2 text-sm font-black transition sm:min-h-12 sm:text-base',
                  woodId === item.id
                    ? 'border-[#e2a72c] bg-[#f0b83d] text-[#193726] shadow-[inset_0_0_0_1px_rgba(255,255,255,.25)]'
                    : 'border-[#d9cfb9] bg-[#fffaf0] text-primary hover:border-[#e2a72c]',
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-2xl bg-[#fffaf0] p-4 text-primary sm:p-5">
            <p className="text-base font-black">Оберіть об’єм</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {quantities.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onQuantityChange(value)}
                  aria-pressed={quantity === value}
                  className={cn(
                    'min-h-11 whitespace-nowrap rounded-lg border-2 px-1 text-[.78rem] font-black transition sm:min-h-14 sm:px-2 sm:text-lg',
                    quantity === value
                      ? 'border-[#d99600] bg-[#f0b83d]'
                      : 'border-[#d8c8aa] bg-white hover:border-[#d99600]',
                  )}
                >
                  {value} скл. м
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-[#fffaf0] text-primary">
            <p className="border-b border-[#d8c8aa] px-5 py-3 text-center text-base font-bold text-[#5f635d]">
              {quantity} скл. м · {wood.name} · доставка включена
            </p>
            <div className="grid sm:grid-cols-[.8fr_1fr_1.15fr]">
              <div className="flex flex-col justify-center border-b border-[#d8c8aa] p-5 text-center sm:border-b-0 sm:border-r sm:p-7">
                <p className="text-base font-bold text-[#6b665b]">Було</p>
                <p className="mt-1 font-heading text-3xl font-black">
                  <s className="decoration-[#b84a2f] decoration-4">
                    {formatPrice(ordinaryTotal)}
                  </s>{' '}
                  <span className="text-lg">грн</span>
                </p>
              </div>

              <div className="flex flex-col items-center justify-center bg-[#f0b83d] p-5 text-center sm:p-7">
                <p className="text-base font-black">Ваша економія</p>
                <p className="mt-1 font-heading text-4xl font-black">
                  {formatPrice(saving)} грн
                </p>
              </div>

              <div className="flex flex-col items-center justify-center p-5 text-center sm:p-7">
                <p className="text-base font-bold text-[#6b665b]">Стало</p>
                <p className="mt-1 font-heading text-4xl font-black">
                  {formatPrice(total)} <span className="text-lg">грн</span>
                </p>
                <a
                  href={`tel:${PHONE}`}
                  className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-base font-black text-white"
                >
                  <Phone className="size-5" /> Подзвонити
                </a>
              </div>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              throw new Error(
                'Оберіть породу та обсяг 5, 10, 15 або 20 складометрів',
              );
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
      <header className="relative z-10 border-b border-[#d8c8aa] bg-[#fffaf0]">
        <div className="mx-auto hidden max-w-[1280px] grid-cols-[185px_255px_1fr_250px] grid-rows-[96px_60px] px-6 pt-2 lg:grid">
          <a
            href="#top"
            className="row-span-2 flex items-center justify-center pr-4"
          >
            <img
              src="/logo.png"
              alt="Дрова у Діда Івана"
              className="size-[154px] object-contain"
            />
          </a>

          <div className="flex flex-col justify-center px-5">
            <p className="font-heading text-3xl font-black leading-none">
              Дрова
              <span className="block">у Діда Івана</span>
            </p>
            <p className="mt-2 whitespace-nowrap text-sm font-semibold text-[#625f56]">
              Натуральні дрова з доставкою
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 px-5 text-sm font-bold text-[#615d54]">
            <span>
              <Truck className="mr-2 inline size-4 text-[#9b6a18]" /> Доставка
              включена
            </span>
            <span>
              <Banknote className="mr-2 inline size-4 text-[#9b6a18]" /> Оплата
              при отриманні
            </span>
            <span>
              <ShieldCheck className="mr-2 inline size-4 text-[#9b6a18]" />
              Чесні ціни
            </span>
          </div>

          <div className="flex flex-col justify-center px-5 text-right">
            <a
              href={`tel:${PHONE}`}
              className="whitespace-nowrap font-heading text-2xl font-black"
            >
              <Phone className="mr-2 inline size-6 text-[#d99600]" />
              {PHONE_LABEL}
            </a>
            <p className="text-sm font-bold text-[#625f56]">
              Пн–Нд: 08:00–20:00
            </p>
          </div>

          <nav
            aria-label="Головна навігація"
            className="col-start-2 col-end-5 row-start-2 grid grid-cols-[max-content_190px_1fr] items-center px-7 text-base font-black"
          >
            <div className="flex items-center gap-7">
              <a href="#products" className="hover:text-[#b17300]">
                Береза
              </a>
              <a href="#products" className="hover:text-[#b17300]">
                Вільха
              </a>
              <a href="#products" className="hover:text-[#b17300]">
                Сосна
              </a>
              <a href="#benefits" className="hover:text-[#b17300]">
                Про нас
              </a>
              <a href="#benefits" className="hover:text-[#b17300]">
                Доставка
              </a>
              <a href="#benefits" className="hover:text-[#b17300]">
                Оплата
              </a>
            </div>
            <a
              href="#contacts"
              className="col-start-3 justify-self-start hover:text-[#b17300]"
            >
              Контакти
            </a>
          </nav>
        </div>

        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 lg:hidden">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img
              src="/logo.png"
              alt="Дрова у Діда Івана"
              className="size-16 shrink-0 object-contain"
            />
            <div>
              <p className="font-heading text-xl font-black leading-none">
                Дрова
                <span className="block">у Діда Івана</span>
              </p>
              <p className="mt-1 text-xs font-bold italic text-[#8a652c]">
                З лісу — додому!
              </p>
            </div>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
            className="flex size-12 items-center justify-center rounded-lg border border-[#d8c8aa] lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="size-7" />
            ) : (
              <Menu className="size-7" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Мобільна навігація"
            className="grid grid-cols-2 gap-px border-t border-[#d8c8aa] bg-[#d8c8aa] lg:hidden"
          >
            {[
              ['Береза', '#products'],
              ['Вільха', '#products'],
              ['Сосна', '#products'],
              ['Розрахунок', '#calculator'],
              ['Про нас', '#benefits'],
              ['Контакти', '#contacts'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-14 items-center justify-center bg-[#fffaf0] px-4 text-base font-black"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section
        id="top"
        className="relative border-b border-[#d8c8aa] bg-[#fffaf0]"
      >
        <div className="relative mx-auto min-h-[280px] max-w-[1280px] overflow-hidden md:min-h-[400px] lg:hidden">
          <img
            src="/hero-grandfather-v3.png"
            alt="Дід Іван тримає колоті березові дрова"
            className="absolute inset-0 size-full object-cover object-center md:object-top"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 390 280"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 size-full md:hidden"
          >
            <defs>
              <linearGradient id="mobile-hero-cream" x1="0" x2="1">
                <stop offset="0" stopColor="#f4ecdc" />
                <stop offset="0.82" stopColor="#f4ecdc" />
                <stop offset="1" stopColor="#f4ecdc" stopOpacity="0.88" />
              </linearGradient>
            </defs>
            <path
              d="M0 0H238C241 26 225 49 222 75C219 101 212 125 217 150C223 178 216 203 213 228C211 249 208 267 202 280H0Z"
              fill="url(#mobile-hero-cream)"
            />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 820 400"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden size-full md:block"
          >
            <path
              d="M0 0H438C451 42 425 81 431 121C438 166 416 202 420 247C425 298 398 350 374 400H0Z"
              fill="#f4ecdc"
            />
          </svg>
          <div className="absolute inset-y-0 left-0 flex w-[67%] items-center px-4 py-5 md:w-[50%] md:px-8">
            <div>
              <h1 className="font-heading text-[1.65rem] font-black uppercase leading-[.9] tracking-[-.035em] text-[#29432f] md:text-[2.6rem]">
                Більше дров —
                <span className="block text-[#c38322]">більша економія</span>
                <span className="block text-[#a75a2a]">в гривнях!</span>
              </h1>
              <p className="mt-3 max-w-[200px] text-sm font-semibold leading-snug text-[#344334] md:mt-5 md:max-w-[310px] md:text-lg">
                Економте{' '}
                <strong className="text-[#a75a2a]">до 36 400 грн</strong> на
                замовленні.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto hidden min-h-[540px] max-w-[1280px] grid-cols-[1.15fr_.85fr] lg:grid">
          <div className="paper-texture flex items-center px-12 py-12">
            <div className="max-w-[610px]">
              <h1 className="font-heading text-[3.75rem] font-black uppercase leading-[.9] tracking-[-.04em] text-[#29432f] xl:text-[4rem]">
                Більше дров —
                <span className="block whitespace-nowrap text-[#c38322]">
                  більша економія
                </span>
                <span className="block text-[#a75a2a]">в гривнях!</span>
              </h1>
              <p className="mt-5 max-w-xl text-2xl font-semibold leading-snug text-[#344334]">
                Замовляйте більший об’єм та економте{' '}
                <strong className="text-[#a75a2a]">до 36 400 грн</strong> на
                одному замовленні.
              </p>
            </div>
          </div>
          <div className="relative min-h-[540px] overflow-hidden">
            <img
              src="/hero-winter-background-v1.png"
              alt="Зимова дровітня зі складеними дровами"
              className="absolute inset-0 size-full object-cover object-[68%_center]"
            />
          </div>
        </div>
        <img
          src="/grandfather-cutout-v4.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-445px] left-[62%] z-20 hidden h-[1050px] max-w-none -translate-x-1/2 object-contain [clip-path:inset(0_0_42%_0)] drop-shadow-[0_18px_22px_rgba(44,29,15,.18)] lg:block"
        />
      </section>

      <SavingsCalculator
        woodId={woodId}
        quantity={quantity}
        onWoodChange={setWoodId}
        onQuantityChange={setQuantity}
      />

      <section id="benefits" className="paper-texture px-4 pb-12 sm:px-6">
        <div className="mx-auto grid max-w-[1180px] grid-cols-3 gap-2 sm:gap-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-2 py-4 text-center sm:flex-row sm:gap-3 sm:text-left"
            >
              <Icon className="size-8 shrink-0 text-[#9b6a18]" />
              <div>
                <p className="text-sm font-black sm:text-base">{title}</p>
                <p className="text-xs font-semibold text-[#67635b] sm:text-sm">
                  {text}
                </p>
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
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(10, 28, 18, 0) 58%, rgba(10, 28, 18, 0.16)), url('${wood.image}')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                />
                <div className="flex flex-col p-5">
                  <h3 className="font-heading text-3xl font-black uppercase">
                    {wood.name}
                  </h3>
                  <p className="mt-2 text-base font-semibold text-[#5f625b]">
                    {wood.description}
                  </p>
                  <p className="mt-3 text-sm font-bold leading-relaxed text-[#776b59]">
                    {wood.bestFor}
                  </p>
                  <div className="mt-auto flex flex-col gap-3 pt-7 xl:flex-row">
                    <button
                      type="button"
                      onClick={() => chooseWood(wood.id)}
                      className="min-h-13 flex-1 rounded-lg bg-primary px-4 text-base font-black text-white"
                    >
                      Розрахувати вигоду
                    </button>
                    <a
                      href={`tel:${PHONE}`}
                      className="flex min-h-13 flex-1 items-center justify-center gap-2 rounded-lg bg-[#e2a72c] px-4 text-base font-black text-primary"
                    >
                      <Phone className="size-5" /> Подзвонити
                    </a>
                  </div>
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

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#0f281a] bg-[#183a28] p-2 sm:hidden">
        <a
          href="#calculator"
          className="flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#f0b83d] px-3 text-base font-black text-primary"
        >
          <Sparkles className="size-5" /> Розрахувати
        </a>
      </div>
    </main>
  );
}
