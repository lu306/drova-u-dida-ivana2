'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  BadgeDollarSign,
  Calculator,
  Check,
  ChevronRight,
  Flame,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
} from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PHONE = '+380671234567';
const PHONE_LABEL = '(067) 123 45 67';

const woods = [
  {
    id: 'birch',
    name: 'Береза',
    note: 'Найбільше тепла, горить довго',
    price: 4200,
    color: '#e8ddd0',
  },
  {
    id: 'alder',
    name: 'Вільха',
    note: 'Мало диму та сажі',
    price: 3900,
    color: '#c08a5a',
  },
  {
    id: 'pine',
    name: 'Сосна',
    note: 'Швидко розпалюється',
    price: 3300,
    color: '#b89a67',
  },
] as const;

const volumes = [
  { value: 5, discount: 0 },
  { value: 10, discount: 200 },
  { value: 15, discount: 350 },
  { value: 20, discount: 500 },
] as const;

export default function Home() {
  const [concept, setConcept] = useState(1);
  const [woodId, setWoodId] = useState<(typeof woods)[number]['id']>('birch');
  const [volume, setVolume] = useState(10);

  const selectedWood = woods.find((wood) => wood.id === woodId) ?? woods[0];
  const selectedVolume =
    volumes.find((item) => item.value === volume) ?? volumes[1];
  const calculation = useMemo(() => {
    const pricePerMeter = selectedWood.price - selectedVolume.discount;
    return {
      pricePerMeter,
      total: pricePerMeter * volume,
      saving: selectedVolume.discount * volume,
    };
  }, [selectedVolume, selectedWood, volume]);

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
            'Обирає породу та об’єм, оновлює видимий розрахунок ціни перед дзвінком.',
          inputSchema: {
            type: 'object',
            properties: {
              wood: { type: 'string', enum: woods.map((item) => item.id) },
              volume: {
                type: 'number',
                enum: volumes.map((item) => item.value),
              },
            },
            required: ['wood', 'volume'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute(input: unknown) {
            if (!input || typeof input !== 'object')
              throw new Error('Некоректні параметри');
            const { wood, volume: nextVolume } = input as {
              wood?: unknown;
              volume?: unknown;
            };
            const nextWood = woods.find((item) => item.id === wood);
            const nextTier = volumes.find((item) => item.value === nextVolume);
            if (!nextWood || !nextTier)
              throw new Error('Оберіть доступну породу та об’єм');

            setWoodId(nextWood.id);
            setVolume(nextTier.value);
            window.setTimeout(
              () =>
                document
                  .getElementById('calculator')
                  ?.scrollIntoView({ behavior: 'smooth' }),
              0,
            );

            const pricePerMeter = nextWood.price - nextTier.discount;
            return {
              wood: nextWood.name,
              volume: nextTier.value,
              pricePerMeter,
              total: pricePerMeter * nextTier.value,
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
    <main className="min-h-screen overflow-x-hidden bg-background pb-16 text-foreground sm:pb-0">
      <div className="bg-primary px-4 py-2 text-center text-sm font-bold text-primary-foreground sm:text-base">
        <Truck className="mr-2 inline size-5" /> Доставка вже у вартості —
        доплачувати не потрібно
      </div>

      <header className="border-b border-[#d7c8ad] bg-[#fffaf0]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src="/logo.png"
              alt="Дрова у Діда Івана"
              className="size-16 shrink-0 rounded-full object-contain sm:size-20"
            />
            <div>
              <p className="font-heading text-xl font-black leading-none sm:text-2xl">
                Дрова у Діда Івана
              </p>
              <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
                Чесний об’єм. Сухі дрова. Без прихованих доплат.
              </p>
            </div>
          </div>
          <a
            href={`tel:${PHONE}`}
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-14 rounded-xl bg-accent px-5 text-base font-black text-accent-foreground shadow-[0_5px_0_#9d6500] hover:bg-[#f0b32a] sm:h-16 sm:px-7 sm:text-xl',
            )}
            aria-label={`Подзвонити ${PHONE_LABEL}`}
          >
            <Phone className="size-6" />
            <span className="hidden sm:inline">{PHONE_LABEL}</span>
            <span className="sm:hidden">Подзвонити</span>
          </a>
        </div>
      </header>

      <nav
        aria-label="Вибір концепції макета"
        className="sticky top-0 z-40 border-b border-[#cdbd9f] bg-[#efe4cf]/95 px-3 py-3 shadow-sm backdrop-blur"
      >
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-2 overflow-x-auto">
          {[
            [1, '1 · Вигода'],
            [2, '2 · Ціни'],
            [3, '3 · Довіра'],
          ].map(([id, label]) => (
            <Button
              key={id}
              variant={concept === id ? 'default' : 'outline'}
              onClick={() => setConcept(Number(id))}
              aria-pressed={concept === id}
              className={cn(
                'h-11 min-w-28 rounded-full px-5 text-base font-black',
                concept !== id &&
                  'border-[#bca989] bg-[#fffaf0] hover:bg-white',
              )}
            >
              {label}
            </Button>
          ))}
        </div>
      </nav>

      <section
        className={cn(
          'paper-texture border-b border-[#d7c8ad]',
          concept !== 1 && 'hidden',
        )}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:py-14">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="trust-pill">
                <BadgeCheck /> Чесна ціна
              </span>
              <span className="trust-pill">
                <Truck /> Доставка включена
              </span>
            </div>
            <h1 className="max-w-4xl font-heading text-[clamp(2.5rem,6vw,5.75rem)] font-black uppercase leading-[.93] tracking-[-.045em] text-primary">
              Більше дров —<br />
              <span className="text-[#bf7700]">менша ціна</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-semibold leading-snug sm:text-2xl">
              Замовляйте від 10 складометрів і заощаджуйте. Покажемо повну ціну
              одразу — разом із доставкою.
            </p>
            <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
              {woods.map((wood) => (
                <Button
                  key={wood.id}
                  variant="outline"
                  onClick={() => setWoodId(wood.id)}
                  aria-pressed={woodId === wood.id}
                  className={cn(
                    'h-auto min-h-20 justify-start rounded-xl border-2 px-4 py-3 text-left',
                    woodId === wood.id
                      ? 'border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                      : 'border-[#cdbd9f] bg-[#fffaf0] hover:bg-[#f4ead8]',
                  )}
                >
                  <span
                    className="size-9 rounded-full border-2 border-white/60 shadow-inner"
                    style={{ background: wood.color }}
                  />
                  <span>
                    <strong className="block text-lg">{wood.name}</strong>
                    <span className="text-xs opacity-80">
                      від {wood.price.toLocaleString('uk-UA')} грн
                    </span>
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-5 rounded-full bg-[#d99816]/20 blur-3xl" />
            <img
              src="/logo.png"
              alt="Дід Іван із дровами"
              className="relative z-10 w-full drop-shadow-[0_24px_32px_rgba(53,40,20,.22)]"
            />
            <div className="absolute bottom-3 left-1/2 z-20 w-[88%] -translate-x-1/2 rounded-xl border border-[#d7c8ad] bg-[#fffaf0]/95 p-3 text-center text-base font-extrabold shadow-lg backdrop-blur">
              <ShieldCheck className="mr-2 inline size-5 text-primary" />{' '}
              Привеземо рівно стільки, скільки замовили
            </div>
          </div>
        </div>
      </section>

      <section
        className={cn(
          'paper-texture border-b border-[#d7c8ad] px-4 py-10 sm:px-6 lg:py-14',
          concept !== 2 && 'hidden',
        )}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-7 lg:grid-cols-[.72fr_1.28fr]">
            <div className="rounded-3xl bg-[#183a28] p-6 text-white shadow-xl sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt="Дрова у Діда Івана"
                  className="size-24 rounded-full border-4 border-[#f3b61d]"
                />
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#f3b61d]">
                    Концепція 2
                  </p>
                  <p className="font-heading text-3xl font-black">
                    Ціна без сюрпризів
                  </p>
                </div>
              </div>
              <h1 className="mt-8 font-heading text-5xl font-black uppercase leading-[.94] sm:text-6xl">
                Оберіть дрова.
                <br />
                Ціну вже видно.
              </h1>
              <p className="mt-5 text-xl font-semibold text-white/80">
                Вкажіть об’єм — одразу покажемо повну суму разом із доставкою.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {volumes.map((item) => (
                  <Button
                    key={item.value}
                    variant="outline"
                    onClick={() => setVolume(item.value)}
                    aria-pressed={volume === item.value}
                    className={cn(
                      'h-16 rounded-xl border-2 text-lg font-black',
                      volume === item.value
                        ? 'border-[#f3b61d] bg-[#f3b61d] text-[#183a28] hover:bg-[#f3b61d]'
                        : 'border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white',
                    )}
                  >
                    {item.value} м³
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <p className="font-bold text-[#bf7700]">Доставка: 0 грн</p>
                  <h2 className="font-heading text-4xl font-black uppercase text-primary sm:text-5xl">
                    Ціни на {volume} м³
                  </h2>
                </div>
                <p className="font-bold text-muted-foreground">
                  за 1 складометр
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {woods.map((wood) => {
                  const unitPrice = wood.price - selectedVolume.discount;
                  const active = wood.id === woodId;
                  return (
                    <button
                      key={wood.id}
                      onClick={() => setWoodId(wood.id)}
                      aria-pressed={active}
                      className={cn(
                        'rounded-2xl border-2 p-5 text-left transition focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#d69000]',
                        active
                          ? 'border-primary bg-primary text-white shadow-xl'
                          : 'border-[#cdbd9f] bg-[#fffaf0] hover:-translate-y-1 hover:border-primary',
                      )}
                    >
                      <span
                        className={cn(
                          'mb-5 flex size-14 items-center justify-center rounded-full',
                          active
                            ? 'bg-[#f3b61d] text-primary'
                            : 'bg-[#183a28] text-[#f3b61d]',
                        )}
                      >
                        <Flame className="size-7" />
                      </span>
                      <span className="text-2xl font-black">{wood.name}</span>
                      <span
                        className={cn(
                          'mt-1 block min-h-10 text-sm',
                          active ? 'text-white/70' : 'text-muted-foreground',
                        )}
                      >
                        {wood.note}
                      </span>
                      <span className="mt-5 block font-heading text-3xl font-black">
                        {unitPrice.toLocaleString('uk-UA')} грн
                      </span>
                      <span
                        className={cn(
                          'mt-1 block text-sm font-bold',
                          active ? 'text-[#f3b61d]' : 'text-primary',
                        )}
                      >
                        Разом: {(unitPrice * volume).toLocaleString('uk-UA')}{' '}
                        грн
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 grid overflow-hidden rounded-2xl border-2 border-[#d69000] bg-[#f3b61d] sm:grid-cols-[1fr_auto]">
                <div className="p-5 sm:p-6">
                  <p className="font-bold uppercase tracking-wide">Ваш вибір</p>
                  <p className="mt-1 text-2xl font-black">
                    {selectedWood.name}, {volume} м³ —{' '}
                    {calculation.total.toLocaleString('uk-UA')} грн
                  </p>
                  <p className="mt-1 font-semibold">
                    <Truck className="mr-1 inline size-5" /> Доставка включена
                  </p>
                </div>
                <a
                  href={`tel:${PHONE}`}
                  className="flex min-h-20 items-center justify-center gap-3 bg-[#183a28] px-7 text-xl font-black text-white"
                >
                  <Phone className="size-6" /> Подзвонити
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={cn(
          'overflow-hidden border-b border-[#d7c8ad] bg-[#10291c] text-white',
          concept !== 3 && 'hidden',
        )}
      >
        <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#33553e_0%,#10291c_66%)]" />
            <img
              src="/logo.png"
              alt="Дід Іван із дровами"
              className="relative z-10 w-full max-w-lg drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]"
            />
          </div>
          <div className="paper-texture p-6 text-[#213426] sm:p-10 lg:min-h-[500px] lg:p-14">
            <p className="font-bold uppercase tracking-[.16em] text-[#bf7700]">
              Концепція 3 · Довіра спочатку
            </p>
            <h1 className="mt-3 font-heading text-5xl font-black uppercase leading-[.94] text-primary sm:text-7xl">
              Скільки замовили — стільки й привеземо
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold sm:text-2xl">
              Без накруток, прихованої доставки та «повітря» замість дров. Ціну
              називаємо до виїзду.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                [
                  PackageCheck,
                  'Чесний об’єм',
                  'Перевіряємо завантаження разом',
                ],
                [BadgeDollarSign, 'Чесна ціна', 'Фіксуємо суму до доставки'],
                [Truck, 'Доставка включена', 'У рахунку немає окремої доплати'],
                [ShieldCheck, 'Оплата після огляду', 'Спочатку бачите дрова'],
              ].map(([Icon, title, text]) => (
                <div
                  key={String(title)}
                  className="rounded-xl border-2 border-[#d7c8ad] bg-[#fffaf0] p-4"
                >
                  <Icon className="size-7 text-primary" />
                  <p className="mt-2 text-lg font-black">{String(title)}</p>
                  <p className="text-sm text-muted-foreground">
                    {String(text)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${PHONE}`}
                className="flex min-h-16 flex-1 items-center justify-center gap-3 rounded-xl bg-[#f3b61d] px-6 text-xl font-black text-primary shadow-[0_5px_0_#9d6500]"
              >
                <Phone className="size-6" /> {PHONE_LABEL}
              </a>
              <a
                href="#calculator"
                className="flex min-h-16 flex-1 items-center justify-center rounded-xl border-2 border-primary bg-[#fffaf0] px-6 text-center text-lg font-black text-primary"
              >
                Спочатку порахувати ціну
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="calculator"
        className="bg-[#183a28] px-4 py-10 text-white sm:px-6 sm:py-14"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 flex items-center gap-2 font-bold text-[#f3b61d]">
                <Calculator className="size-5" /> Розрахунок без реєстрації
              </p>
              <h2 className="font-heading text-3xl font-black uppercase sm:text-5xl">
                Ваша ціна і вигода
              </h2>
            </div>
            <p className="max-w-md text-base text-white/75 sm:text-lg">
              Оберіть об’єм. Чим більше замовлення — тим нижча ціна за
              складометр.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
            <div className="rounded-2xl bg-[#fffaf0] p-5 text-[#213426] sm:p-7">
              <p className="mb-3 text-lg font-black">1. Оберіть об’єм</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                {volumes.map((item) => (
                  <Button
                    key={item.value}
                    variant="outline"
                    onClick={() => setVolume(item.value)}
                    aria-pressed={volume === item.value}
                    className={cn(
                      'relative h-20 rounded-xl border-2 text-xl font-black',
                      volume === item.value
                        ? 'border-[#d69000] bg-[#f3b61d] text-[#263725] hover:bg-[#f3b61d]'
                        : 'border-[#d7c8ad] bg-white hover:bg-[#f5ecd9]',
                    )}
                  >
                    {item.value} м³
                    {item.value === 10 && (
                      <span className="absolute -top-2 right-2 rounded-full bg-[#183a28] px-2 py-1 text-[10px] uppercase tracking-wide text-white">
                        Обирають частіше
                      </span>
                    )}
                  </Button>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-[#d7c8ad] bg-white p-4">
                <p className="font-bold">Що ви отримуєте</p>
                <ul className="mt-2 space-y-2 text-base">
                  <li>
                    <Check className="mr-2 inline size-5 text-primary" />
                    Чесний складометр без пустот
                  </li>
                  <li>
                    <Check className="mr-2 inline size-5 text-primary" />
                    Доставка до двору включена
                  </li>
                  <li>
                    <Check className="mr-2 inline size-5 text-primary" />
                    Оплата після отримання
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid overflow-hidden rounded-2xl bg-white text-[#213426] sm:grid-cols-[1fr_.9fr]">
              <div className="p-6 sm:p-8">
                <p className="text-sm font-bold uppercase tracking-wider text-[#6f766f]">
                  {selectedWood.name} · {volume} м³ · з доставкою
                </p>
                <div className="mt-5 flex items-end justify-between gap-4 border-b border-[#e2d8c6] pb-5">
                  <span className="text-lg">Ціна за м³</span>
                  <strong className="text-3xl">
                    {calculation.pricePerMeter.toLocaleString('uk-UA')} грн
                  </strong>
                </div>
                <div className="flex items-end justify-between gap-4 border-b border-[#e2d8c6] py-5">
                  <span className="text-lg">Разом</span>
                  <strong className="text-4xl">
                    {calculation.total.toLocaleString('uk-UA')} грн
                  </strong>
                </div>
                <p className="mt-4 flex items-center gap-2 text-base font-bold text-primary">
                  <Truck className="size-5" /> Доставка: 0 грн
                </p>
              </div>
              <div className="flex flex-col justify-between bg-[#f3b61d] p-6 sm:p-8">
                <div>
                  <p className="text-sm font-black uppercase tracking-wider">
                    Ваша економія
                  </p>
                  <p className="mt-2 font-heading text-5xl font-black">
                    {calculation.saving.toLocaleString('uk-UA')}{' '}
                    <span className="text-2xl">грн</span>
                  </p>
                  <p className="mt-2 font-semibold">
                    порівняно із замовленням по 5 м³
                  </p>
                </div>
                <a
                  href={`tel:${PHONE}`}
                  className="mt-7 flex min-h-16 items-center justify-center gap-3 rounded-xl bg-[#183a28] px-5 text-center text-xl font-black text-white shadow-[0_5px_0_#0e2418] transition hover:bg-[#224c36] active:translate-y-1 active:shadow-none"
                >
                  <Phone className="size-6" /> Замовити телефоном
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="paper-texture px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-heading text-3xl font-black uppercase text-primary sm:text-5xl">
            Просто оберіть свої дрова
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {woods.map((wood) => (
              <button
                key={wood.id}
                onClick={() => {
                  setWoodId(wood.id);
                  document
                    .getElementById('calculator')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group rounded-2xl border-2 border-[#d7c8ad] bg-[#fffaf0] p-5 text-left transition hover:-translate-y-1 hover:border-primary hover:shadow-xl focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#d69000]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-16 items-center justify-center rounded-full bg-[#183a28] text-[#f3b61d]">
                    <Flame className="size-8" />
                  </span>
                  <ChevronRight className="size-7 transition group-hover:translate-x-1" />
                </div>
                <h3 className="mt-5 text-2xl font-black">{wood.name}</h3>
                <p className="mt-1 min-h-12 text-base text-muted-foreground">
                  {wood.note}
                </p>
                <p className="mt-4 text-xl font-black">
                  від {wood.price.toLocaleString('uk-UA')} грн/м³
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#10291c] px-4 py-9 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="size-16 rounded-full" />
            <div>
              <p className="text-xl font-black">Дрова у Діда Івана</p>
              <p className="text-white/65">Щодня, 08:00–20:00</p>
            </div>
          </div>
          <a
            href={`tel:${PHONE}`}
            className="text-2xl font-black text-[#f3b61d] underline decoration-2 underline-offset-4"
          >
            <Phone className="mr-2 inline size-6" /> {PHONE_LABEL}
          </a>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#0f281a] bg-[#183a28] p-2 sm:hidden">
        <a
          href={`tel:${PHONE}`}
          className="flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#f3b61d] px-4 text-lg font-black text-[#213426] shadow-lg"
        >
          <Phone className="size-6" /> Подзвонити та замовити
        </a>
      </div>
    </main>
  );
}
