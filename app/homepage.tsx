'use client';

import { useEffect, useState } from 'react';
import {
  BadgeCheck,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Flame,
  House,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  MobileBottomBar,
  OrderCalculator,
  PhoneBlock,
  PhoneButton,
  PriceTable,
  ProductCard,
} from '@/app/firewood-ui';
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

const benefits = [
  {
    icon: PackageCheck,
    title: 'Чесний складометр',
    text: 'Привозимо той обсяг, за який ви платите.',
  },
  {
    icon: Flame,
    title: 'Дрова вже поколені',
    text: 'Можна одразу складати та використовувати.',
  },
  {
    icon: Truck,
    title: 'Доставка до двору',
    text: 'Працюємо по Києву та Київській області.',
  },
  {
    icon: Sparkles,
    title: 'Більше — дешевше',
    text: 'Ціна за складометр зменшується від обсягу.',
  },
];

const faq = [
  [
    'Що таке складометр?',
    'Це один кубічний метр акуратно складених дров. Ви платите за реальний складений обсяг, а не за насип із великими порожнинами.',
  ],
  [
    'Який мінімальний обсяг замовлення?',
    'Мінімальне замовлення — 3 складометри. Найвигідніша ціна діє від 10 складометрів.',
  ],
  [
    'Чи входить доставка у ціну?',
    'Так. Усі ціни в цьому макеті вже включають доставку по Києву та узгодженій зоні Київської області.',
  ],
  [
    'Які дрова краще для печі?',
    'Береза дає багато рівного тепла. Вільха горить чистіше й утворює менше сажі. Сосна добре підходить для швидкого розпалювання.',
  ],
  [
    'Береза чи вільха — що краще?',
    'Для тривалого жару частіше обирають березу. Якщо важливіше чисте горіння та менше сажі — вільху.',
  ],
  [
    'Наскільки сухі дрова?',
    'Вологість залежить від партії. Перед замовленням менеджер назве фактичний стан дров і допоможе підібрати варіант.',
  ],
  [
    'Коли буде доставка?',
    'Зазвичай погоджуємо зручний день і проміжок часу телефоном. Точний строк залежить від адреси та завантаження.',
  ],
] as const;

function SectionTitle({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center')}>
      {eyebrow && (
        <p className="mb-2 text-sm font-black uppercase tracking-[.16em] text-[#9b3724]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-[clamp(2.35rem,5vw,4.7rem)] font-black uppercase leading-[.95] tracking-[-.03em] text-primary">
        {title}
      </h2>
      {text && (
        <p className="mt-4 text-xl font-semibold leading-snug text-[#5b615b]">
          {text}
        </p>
      )}
    </div>
  );
}

export default function Homepage() {
  const [woodId, setWoodId] = useState<WoodId>('birch');
  const [quantity, setQuantity] = useState(6);

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
            'Обирає породу та кількість складометрів, оновлює видимий розрахунок перед дзвінком.',
          inputSchema: {
            type: 'object',
            properties: {
              wood: { type: 'string', enum: WOODS.map((wood) => wood.id) },
              quantity: { type: 'integer', minimum: 3, maximum: 20 },
            },
            required: ['wood', 'quantity'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute(input: unknown) {
            if (!input || typeof input !== 'object')
              throw new Error('Некоректні параметри');
            const { wood, quantity: nextQuantity } = input as {
              wood?: unknown;
              quantity?: unknown;
            };
            const nextWood = WOODS.find((item) => item.id === wood);
            if (
              !nextWood ||
              !Number.isInteger(nextQuantity) ||
              Number(nextQuantity) < 3 ||
              Number(nextQuantity) > 20
            ) {
              throw new Error(
                'Оберіть доступну породу та кількість від 3 до 20',
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
    <main className="min-h-screen overflow-x-hidden bg-background pb-16 text-foreground sm:pb-0">
      <div className="bg-primary px-4 py-2 text-center text-base font-black text-white">
        <Truck className="mr-2 inline size-5 text-[#f0b83d]" /> Доставка по
        Києву та області вже у вартості
      </div>

      <header className="relative z-30 border-b border-[#d8c8aa] bg-[#fffaf0]">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img
              src="/logo.png"
              alt="Дрова у Діда Івана"
              className="size-16 shrink-0 rounded-full object-contain sm:size-20"
            />
            <div>
              <p className="font-heading text-xl font-black leading-none sm:text-2xl">
                Дрова у Діда Івана
              </p>
              <p className="mt-1 hidden text-base font-semibold text-[#666960] sm:block">
                Нормальні дрова від нормальних людей
              </p>
            </div>
          </a>
          <nav
            aria-label="Головна навігація"
            className="hidden items-center gap-7 text-base font-black lg:flex"
          >
            <a href="#products" className="hover:text-[#9b3724]">
              Дрова
            </a>
            <a href="#prices" className="hover:text-[#9b3724]">
              Ціни
            </a>
            <a href="#calculator" className="hover:text-[#9b3724]">
              Розрахунок
            </a>
            <a href="#delivery" className="hover:text-[#9b3724]">
              Доставка
            </a>
            <a href="/ui-kit" className="text-[#6c6d65] hover:text-[#9b3724]">
              UI‑компоненти
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden text-right xl:block">
              <a
                href={`tel:${PHONE}`}
                className="text-2xl font-black text-primary"
              >
                {PHONE_LABEL}
              </a>
              <p className="text-sm font-bold text-[#696a62]">
                Щодня 08:00–20:00
              </p>
            </div>
            <PhoneButton className="min-h-14 px-4 sm:px-6" />
          </div>
        </div>
      </header>

      <section
        id="top"
        className="relative isolate overflow-hidden border-b border-[#d8c8aa] bg-[#f4ead8]"
      >
        <img
          src="/hero-firewood-v2.png"
          alt="Акуратно складені колоті дрова біля дерев’яного сараю"
          className="absolute inset-0 -z-20 size-full object-cover object-center lg:object-right"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(247,239,224,.99)_0%,rgba(247,239,224,.96)_43%,rgba(247,239,224,.38)_69%,rgba(12,24,16,.08)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(247,239,224,.98)_0%,rgba(247,239,224,.92)_56%,rgba(247,239,224,.4)_100%)]" />
        <div className="mx-auto grid min-h-[680px] max-w-[1380px] items-center px-4 py-12 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8 lg:py-16">
          <div className="max-w-3xl rounded-3xl border border-white/70 bg-[#fffaf0]/84 p-5 shadow-[0_20px_60px_rgba(48,33,18,.15)] backdrop-blur-[2px] sm:p-8 lg:-ml-2">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="trust-pill">
                <MapPin /> Київ та область
              </span>
              <span className="trust-pill">
                <BadgeCheck /> Чесний складометр
              </span>
            </div>
            <h1 className="font-heading text-[clamp(3rem,6.3vw,6.7rem)] font-black uppercase leading-[.9] tracking-[-.05em] text-primary">
              Колоті дрова <span className="text-[#9b3724]">з доставкою</span>
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-bold leading-snug sm:text-2xl">
              Береза, вільха та сосна. Чим більше замовляєте — тим дешевша ціна
              за складометр.
            </p>
            <div className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-2 rounded-2xl border-2 border-[#d9c6a4] bg-[#fffaf0] p-4 sm:p-5">
              <div>
                <p className="text-base font-black uppercase tracking-wide text-[#9b3724]">
                  Береза від 10 складометрів
                </p>
                <p className="font-heading text-[clamp(2.7rem,6vw,4.9rem)] font-black leading-none text-[#9b3724]">
                  3 700{' '}
                  <span className="text-2xl text-primary">грн / скл. м</span>
                </p>
              </div>
              <div className="pb-1 text-lg font-bold text-[#6d6a62]">
                <s>4 300 грн</s>
                <ChevronRight className="mx-1 inline size-6 text-[#9b3724]" />3
                700 грн
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <PhoneButton className="min-h-16 text-xl" />
              <a
                href="#prices"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'min-h-16 rounded-xl border-2 border-primary bg-[#fffaf0] px-6 text-xl font-black text-primary hover:bg-white',
                )}
              >
                Подивитися ціни
              </a>
            </div>
            <div className="mt-5 grid gap-2 text-base font-black sm:grid-cols-2">
              {[
                'Доставка по Києву та області',
                'Чесний складометр',
                'Дрова вже поколені',
                'Ціна нижча при більшому замовленні',
              ].map((item) => (
                <p key={item}>
                  <Check className="mr-2 inline size-5 text-[#9b3724]" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="paper-texture px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-[1380px]">
          <SectionTitle
            eyebrow="Тільки три зрозумілі варіанти"
            title="Оберіть свої дрова"
            text="У картці одразу видно звичайну ціну, ціну від обсягу та повну шкалу знижок."
            center
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {WOODS.map((wood) => (
              <ProductCard key={wood.id} wood={wood} onChoose={chooseWood} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="prices"
        className="bg-[#e8efe7] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-[1220px]">
          <SectionTitle
            eyebrow="Ціна за один складометр"
            title="Чим більше замовлення — тим менша ціна"
            text="Ніяких прихованих рівнів. Найвигідніший тариф автоматично діє від 10 складометрів."
            center
          />
          <PriceTable className="mt-10" />
          <p className="mt-4 text-center text-base font-bold text-[#62675f]">
            Демонстраційні ціни зібрані в одному місці й легко замінюються перед
            запуском.
          </p>
        </div>
      </section>

      <section
        id="calculator"
        className="bg-primary px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-[1220px]">
          <div className="mb-9 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-[.16em] text-[#f0b83d]">
                Два прості кроки
              </p>
              <h2 className="font-heading text-[clamp(2.5rem,5vw,5rem)] font-black uppercase leading-[.95]">
                Порахуйте своє замовлення
              </h2>
            </div>
            <p className="max-w-lg text-xl font-semibold text-white/75">
              Оберіть породу та кількість — ціна, доставка й ваша вигода
              з’являться одразу.
            </p>
          </div>
          <OrderCalculator
            woodId={woodId}
            quantity={quantity}
            onWoodChange={setWoodId}
            onQuantityChange={setQuantity}
          />
        </div>
      </section>

      <section className="paper-texture px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1220px]">
          <SectionTitle
            eyebrow="Без складних обіцянок"
            title="Чому купують у Діда Івана"
            center
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-3xl border-2 border-[#d8c8aa] bg-[#fffaf0] p-6 shadow-[0_10px_24px_rgba(59,43,23,.07)]"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-[#f0b83d]">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-5 text-2xl font-black text-primary">
                  {title}
                </h3>
                <p className="mt-2 text-lg font-semibold leading-snug text-[#61655f]">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f0e2c9] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1220px]">
          <SectionTitle
            eyebrow="Без кошика та реєстрації"
            title="Як замовити"
            center
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              [
                '1',
                'Оберіть дрова та кількість',
                'Подивіться ціну в картці або калькуляторі.',
              ],
              [
                '2',
                'Зателефонуйте',
                `Натисніть кнопку або наберіть ${PHONE_LABEL}.`,
              ],
              [
                '3',
                'Узгоджуємо і привозимо',
                'Підтверджуємо адресу, день та час доставки.',
              ],
            ].map(([number, title, text]) => (
              <article
                key={number}
                className="relative rounded-3xl bg-[#fffaf0] p-7 shadow-sm"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-[#b84a2f] font-heading text-3xl font-black text-white">
                  {number}
                </span>
                <h3 className="mt-5 text-2xl font-black">{title}</h3>
                <p className="mt-2 text-lg font-semibold text-[#64665f]">
                  {text}
                </p>
              </article>
            ))}
          </div>
          <PhoneBlock className="mt-7" />
        </div>
      </section>

      <section className="overflow-hidden bg-[#10291c] text-white">
        <div className="mx-auto grid max-w-[1220px] items-center lg:grid-cols-[.7fr_1.3fr]">
          <div className="flex items-center justify-center p-7 lg:p-12">
            <img
              src="/logo.png"
              alt="Дід Іван"
              className="w-full max-w-sm drop-shadow-[0_24px_34px_rgba(0,0,0,.35)]"
            />
          </div>
          <div className="border-t border-white/10 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
            <p className="text-sm font-black uppercase tracking-[.18em] text-[#f0b83d]">
              Дід Іван радить
            </p>
            <h2 className="mt-3 font-heading text-[clamp(2.7rem,5vw,5rem)] font-black uppercase leading-[.95]">
              Беріть дрова з запасом
            </h2>
            <p className="mt-5 max-w-3xl text-xl font-semibold leading-relaxed text-white/80">
              При більшому замовленні ціна одного складометра нижча, а доставка
              потрібна лише один раз. Так і дешевше, і спокійніше перед
              холодами.
            </p>
            <a
              href="#calculator"
              className="mt-7 inline-flex min-h-14 items-center justify-center rounded-xl bg-[#f0b83d] px-7 text-lg font-black text-primary"
            >
              Порахувати вигоду
            </a>
          </div>
        </div>
      </section>

      <section
        id="delivery"
        className="paper-texture px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <SectionTitle
              eyebrow="Доставка до двору"
              title="Куди привозимо"
              text="Київ та основні напрямки Київської області. Точну можливість і день доставки підтвердимо телефоном."
            />
            <PhoneButton
              className="mt-7 min-h-16 text-xl"
              label="Уточнити доставку"
            />
          </div>
          <div className="rounded-3xl border-2 border-[#d8c8aa] bg-[#fffaf0] p-6 shadow-[0_12px_34px_rgba(59,43,23,.08)] sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Київ',
                'Буча · Ірпінь · Гостомель',
                'Бровари та напрямок',
                'Бориспіль та напрямок',
                'Вишневе · Боярка',
                'Обухів · Васильків',
              ].map((place) => (
                <p
                  key={place}
                  className="flex min-h-14 items-center gap-3 rounded-xl bg-[#f4ead8] px-4 text-lg font-black"
                >
                  <MapPin className="size-6 shrink-0 text-[#9b3724]" /> {place}
                </p>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-primary p-5 text-white">
              <p className="text-xl font-black">
                Не знайшли свій населений пункт?
              </p>
              <p className="mt-1 text-lg font-semibold text-white/75">
                Зателефонуйте — скажемо, чи можемо привезти.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e8efe7] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1000px]">
          <SectionTitle
            eyebrow="Відповіді без дрібного шрифту"
            title="Часті питання"
            center
          />
          <Accordion className="mt-9 gap-3">
            {faq.map(([question, answer], index) => (
              <AccordionItem
                key={question}
                value={`faq-${index}`}
                className="rounded-2xl border-2 border-[#d0c4aa] bg-[#fffaf0] px-5 sm:px-6"
              >
                <AccordionTrigger className="min-h-16 py-4 text-xl font-black hover:no-underline">
                  <span className="flex items-center gap-3">
                    <CircleHelp className="size-6 shrink-0 text-[#9b3724]" />
                    {question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-9 text-lg font-semibold leading-relaxed text-[#60635d]">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="paper-texture px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1220px] overflow-hidden rounded-[2.2rem] border-2 border-[#d8c8aa] bg-[#fffaf0] shadow-[0_20px_60px_rgba(59,43,23,.12)]">
          <div className="grid items-center lg:grid-cols-[1.15fr_.85fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <p className="text-sm font-black uppercase tracking-[.16em] text-[#9b3724]">
                Можна не рахувати самостійно
              </p>
              <h2 className="mt-3 font-heading text-[clamp(3rem,6vw,6rem)] font-black uppercase leading-[.9] text-primary">
                Потрібні дрова?
              </h2>
              <p className="mt-5 max-w-2xl text-xl font-semibold text-[#60635d]">
                Оберіть породу та кількість — або просто зателефонуйте.
                Допоможемо порахувати.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-lg font-black">
                <span>
                  <House className="mr-2 inline size-6" />
                  Київ та область
                </span>
                <span>
                  <Clock3 className="mr-2 inline size-6" />
                  08:00–20:00
                </span>
              </div>
            </div>
            <div className="bg-primary p-7 text-center text-white sm:p-10 lg:min-h-full lg:p-12">
              <p className="text-lg font-bold text-white/70">
                Натисніть, щоб зателефонувати
              </p>
              <a
                href={`tel:${PHONE}`}
                className="mt-3 block font-heading text-[clamp(2.5rem,5vw,4.7rem)] font-black leading-none text-[#f0b83d] underline decoration-4 underline-offset-8"
              >
                {PHONE_LABEL}
              </a>
              <PhoneButton
                label="Зателефонувати"
                className="mt-8 w-full min-h-16 text-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0b2116] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1220px] flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="size-16 rounded-full" />
            <div>
              <p className="text-xl font-black">Дрова у Діда Івана</p>
              <p className="text-base font-semibold text-white/60">
                Береза · Вільха · Сосна
              </p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <a
              href={`tel:${PHONE}`}
              className="text-2xl font-black text-[#f0b83d]"
            >
              {PHONE_LABEL}
            </a>
            <p className="text-base font-semibold text-white/60">
              Демонстраційні ціни та номер
            </p>
          </div>
        </div>
      </footer>

      <MobileBottomBar />
    </main>
  );
}
