'use client';

import { useEffect, useRef, useState } from 'react';
import {
  BadgeCheck,
  ChevronDown,
  Banknote,
  MessageCircle,
  Menu,
  PackageCheck,
  Phone,
  PhoneCall,
  Send,
  ShieldCheck,
  Truck,
  Users,
  Warehouse,
  X,
} from 'lucide-react';

import {
  PHONE,
  PHONE_LABEL,
  WOODS,
  PRICE_QUANTITIES,
  PRICE_ROWS,
  formatPrice,
  getUnitPrice,
} from '@/lib/firewood';
import { cn } from '@/lib/utils';
import HeroPromotion from './hero-promotion';
import { landingFaq, productTitles } from '@/lib/landing-content';

const quantities: readonly number[] = PRICE_QUANTITIES;

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

export default function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = menuPanelRef.current!;
    panel.querySelector<HTMLButtonElement>('button')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
      if (event.key !== 'Tab') return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>('button, a[href]'),
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onResize);
      menuButtonRef.current?.focus({ preventScroll: true });
    };
  }, [mobileMenuOpen]);

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
            'Відкриває ціни обраної породи та обсягу в каталозі перед дзвінком.',
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
                'Оберіть породу та обсяг 2, 3, 5, 7, 10, 12, 15, 20 або 25 складометрів',
              );
            }
            const count = Number(nextQuantity);
            const unitPrice = getUnitPrice(nextWood, count);
            const prices = document.getElementById(`prices-${nextWood.id}`) as HTMLDetailsElement | null;
            if (prices) prices.open = true;
            document.getElementById(`price-${nextWood.id}-${count}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return {
              wood: nextWood.name,
              quantity: count,
              unitPrice,
              total: unitPrice * count,
              savingPerUnit: nextWood.ordinaryPrice - unitPrice,
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
      <header
        className={cn(
          'relative border-b border-[#d8c8aa] bg-[#fffaf0]',
          mobileMenuOpen ? 'z-[60]' : 'z-10',
        )}
      >
        <div className="mx-auto hidden max-w-[1280px] grid-cols-[185px_245px_1fr_285px] grid-rows-[96px_60px] px-6 pt-2 lg:grid xl:grid-cols-[185px_255px_1fr_345px]">
          <a
            href="#top"
            className="row-span-2 flex items-center justify-center pr-4"
          >
            <img
              src="/logo.webp"
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

          <div className="col-start-4 flex flex-col justify-center px-3 text-right xl:px-5">
            <div className="flex items-center justify-end gap-2 xl:gap-3">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center whitespace-nowrap font-heading text-xl font-black xl:text-2xl"
              >
                <Phone className="mr-1.5 size-5 text-[#d99600] xl:mr-2 xl:size-6" />
                {PHONE_LABEL}
              </a>
              <div className="flex items-center gap-1.5">
                <a
                  href={`https://t.me/${PHONE}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Написати в Telegram"
                  title="Telegram"
                  className="flex size-8 items-center justify-center rounded-full bg-[#229ED9] text-white transition hover:scale-105 hover:brightness-95 xl:size-9"
                >
                  <Send className="size-4 xl:size-[1.15rem]" />
                </a>
                <a
                  href={`viber://chat?number=${encodeURIComponent(PHONE)}`}
                  aria-label="Написати у Viber"
                  title="Viber"
                  className="flex size-8 items-center justify-center rounded-full bg-[#7360F2] text-white transition hover:scale-105 hover:brightness-95 xl:size-9"
                >
                  <PhoneCall className="size-4 xl:size-[1.15rem]" />
                </a>
                <a
                  href={`https://wa.me/${PHONE.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Написати у WhatsApp"
                  title="WhatsApp"
                  className="flex size-8 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:scale-105 hover:brightness-95 xl:size-9"
                >
                  <MessageCircle className="size-4 xl:size-[1.15rem]" />
                </a>
              </div>
            </div>
            <p className="text-sm font-bold text-[#625f56]">
              Пн–Нд: 08:00–20:00
            </p>
          </div>

          <nav
            aria-label="Головна навігація"
            className="col-start-2 col-end-5 row-start-2 grid grid-cols-[max-content_190px_1fr] items-center px-7 text-base font-black"
          >
            <div className="flex items-center gap-7">
              {['Дубові дрова', 'Береза', 'Вільха', 'Сосна'].map((name) => (
                <a key={name} href="#products" className="hover:text-[#b17300]">
                  {name}
                </a>
              ))}
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
              src="/logo.webp"
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
            ref={menuButtonRef}
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

        <div
          className={cn(
            'mobile-menu-layer lg:hidden',
            mobileMenuOpen && 'is-open',
          )}
          inert={!mobileMenuOpen}
          aria-hidden={!mobileMenuOpen}
        >
          <button
            type="button"
            className="mobile-menu-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Закрити меню поза панеллю"
            tabIndex={-1}
          />
          <div
            ref={menuPanelRef}
            className="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Мобільне меню"
          >
            <div className="mobile-menu-heading">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.webp"
                  alt=""
                  className="size-14 shrink-0 object-contain"
                />
                <p className="font-heading text-xl font-black leading-tight">
                  Дрова
                  <br />у Діда Івана
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Закрити меню"
                className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-[#d8c8aa] text-primary"
              >
                <X className="size-7" />
              </button>
            </div>
            <nav
              id="mobile-menu"
              aria-label="Мобільна навігація"
              className="mt-5 flex flex-col"
            >
              {[
                ['Дубові дрова', '#products'],
                ['Береза', '#products'],
                ['Вільха', '#products'],
                ['Сосна', '#products'],
                ['Ціни', '#products'],
                ['Про нас', '#benefits'],
                ['Контакти', '#contacts'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-link"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <section id="top" className="promo-hero">
        <div className="promo-inner">
          <div className="hero-photo-frame"><img className="hero-photo" src="/hero-grandfather-v3.webp" alt="Дід Іван із колотими дровами" width={1536} height={1024} fetchPriority="high" /></div>
          <img className="pine-decor pine-top" src="/pine-ornament.webp" alt="" width={1536} height={1024} aria-hidden="true" />
          <div className="promo-copy">
            <p className="hero-eyebrow">Натуральні дрова<br />з доставкою</p>
            <h1>
              Колоті дрова з доставкою по Києву та Київській області
            </h1>
            <p className="promo-summary">Від 2 складометрів. Доставка до вашого двору.</p>
            <div className="promotion-decorated"><HeroPromotion /><img className="pine-decor pine-promo" src="/pine-ornament.webp" alt="" width={1536} height={1024} aria-hidden="true" /></div>
<section id="benefits" className="paper-texture px-4 sm:px-6">
        <div className="mx-auto grid max-w-[1180px] grid-cols-3 gap-2 sm:gap-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-2 py-3 text-center sm:flex-row sm:gap-3 sm:text-left"
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
          </div>
        </div>
      </section>

      <section
        id="products"
        className="paper-texture px-4 py-12 sm:px-6 lg:py-16"
      >
        <div className="mx-auto max-w-[1280px]">
          <span id="calculator" aria-hidden="true" className="block" />
          <div className="flex items-center justify-center gap-4 text-center">
            <span className="h-px flex-1 bg-[#cda86c]" />
            <h2 className="font-heading text-[clamp(2.4rem,5vw,4.2rem)] font-black uppercase leading-none">
              Наш асортимент
            </h2>
            <span className="h-px flex-1 bg-[#cda86c]" />
          </div>

          <div className="mt-9 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {WOODS.map((wood) => (
              <article
                key={wood.id}
                className="grid overflow-hidden rounded-2xl border-2 border-[#d6c7aa] bg-[#fffaf0] shadow-[0_10px_25px_rgba(59,43,23,.08)] grid-rows-[auto_1fr] sm:grid-cols-[.9fr_1.1fr] sm:grid-rows-1 lg:grid-cols-1 lg:grid-rows-[auto_1fr]"
              >
                <div className="product-photo relative aspect-[4/3] w-full self-start overflow-hidden">
                  <img src={wood.image} alt={`Колоті дрова з ${wood.genitive} з доставкою по Києву та області`} width={1448} height={1086} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-58% to-[#0a1c1229]" />
                </div>
                <div className="flex flex-col p-5">
                  <h3 className="font-heading text-3xl font-black uppercase">
                    {productTitles[wood.id]}
                  </h3>
                  <p className="mt-4 text-lg font-black text-[#9b3724]">
                    <span className="product-price-number">{new Set(Object.values(wood.prices)).size > 1 ? 'Від ' : ''}{formatPrice(getUnitPrice(wood, 15))}</span> <span className="product-price-unit">грн / скл. м</span>{' '}
                    {new Set(Object.values(wood.prices)).size > 1 && (
                      <span className="block text-sm font-semibold text-[#776b59]">при замовленні від 15 складометрів</span>
                    )}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#5f625b]">Доставка включена · від 2 до 25 скл. м</p>
                  <div className="product-actions mt-auto flex flex-col gap-3 pt-7">
                    <details id={`prices-${wood.id}`} className="product-prices">
                      <summary aria-label={`Ціни для всіх об’ємів — ${wood.name}`}>
                        <span>Ціни для всіх об’ємів</span>
                        <ChevronDown className="product-prices-chevron" aria-hidden="true" />
                      </summary>
                      <div className="product-prices-list">
                        <p className="mb-2 text-xs font-semibold text-[#776b59]">Повна вартість із доставкою</p>
                        <dl className="text-sm">
                          {PRICE_ROWS.map((row) => (
                            <div id={`price-${wood.id}-${row.quantity}`} key={row.quantity} className="flex justify-between gap-2 border-t border-[#e6dcc9] py-2">
                              <dt>{row.label}</dt>
                              <dd className="font-black">{formatPrice(getUnitPrice(wood, row.quantity) * row.quantity)} грн</dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-3 text-sm text-[#5f625b]">{wood.description}</p>
                        <p className="mt-2 text-sm text-[#776b59]">{wood.bestFor}</p>
                      </div>
                    </details>
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

      <div className="catalog-contact">
        <img className="pine-decor pine-bottom-left" src="/pine-ornament.webp" alt="" width={1536} height={1024} aria-hidden="true" />
        <a href={`tel:${PHONE}`}><Phone size={22} /> Подзвонити <span>{PHONE_LABEL}</span></a>
        <img className="pine-decor pine-bottom-right" src="/pine-ornament.webp" alt="" width={1536} height={1024} aria-hidden="true" />
      </div>

      <section aria-labelledby="buy-firewood-title" className="paper-texture px-4 pt-8 sm:px-6">
        <div className="mx-auto max-w-[1180px]">
          <h2 id="buy-firewood-title" className="font-heading text-2xl font-black sm:text-3xl">Купити дрова у Києві та області</h2>
          <p className="mt-3 max-w-[960px] text-base leading-relaxed text-[#5f625b]">Пропонуємо колоті дрова з доставкою до вашого двору по Києву та Київській області — від 2 складометрів. Обирайте тверді, листяні або хвойні породи для печі, каміна чи котла. Рахуємо об’єм у складометрах складених дров, а ціну за складометр і загальну суму показуємо до замовлення.</p>
        </div>
      </section>

      <section aria-labelledby="delivery-title" className="paper-texture px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-[1180px]">
          <h2 id="delivery-title" className="font-heading text-2xl font-black sm:text-3xl">Дрова з доставкою по Києву та Київській області</h2>
          <p className="mt-3 text-base leading-relaxed text-[#5f625b]">Замовляйте колоті дрова довжиною 30–40 см від 2 складометрів. Оберіть породу та потрібний об’єм у каталозі, перегляньте повну вартість у картці товару й зателефонуйте для погодження адреси та дати доставки. Щоб замовити дрова у Києві або області, достатньо узгодити ці деталі з менеджером.</p>
          <p lang="ru" className="mt-3 text-sm leading-relaxed text-[#67635b]">Принимаем заказы на украинском и русском. Купить дрова в Киеве и Киевской области можно по телефону: подберём породу, объём и согласуем дрова с доставкой.</p>
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

      <section aria-labelledby="faq-title" className="paper-texture px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[1180px]">
          <h2 id="faq-title" className="font-heading text-3xl font-black">Питання про замовлення дров</h2>
          <div className="mt-5 grid gap-3">
            {landingFaq.map(({ question, answer }) => (
              <details key={question} className="rounded-lg border border-[#d6c7aa] bg-[#fffaf0] p-4">
                <summary className="min-h-6 cursor-pointer font-bold">{question}</summary>
                <p className="mt-3 max-w-[960px] leading-relaxed text-[#5f625b]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contacts"
        className="bg-[#10291c] px-4 py-10 text-white sm:px-6"
      >
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <img src="/logo.webp" alt="" className="size-20 object-contain" />
            <div>
              <p className="font-heading text-2xl font-black">
                Дрова у Діда Івана
              </p>
              <p className="text-base font-semibold text-white/65">
                Дуб · Граб · Береза · Вільха · Сосна · Осика
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

      <div className="floating-call fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-[#10291c] via-[#10291c]/95 to-transparent px-4 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-4 sm:hidden">
        <a
          href={`tel:${PHONE}`}
          aria-label={`Подзвонити: ${PHONE_LABEL}`}
          className="mx-auto flex min-h-16 w-full max-w-md items-center justify-center gap-3 rounded-full border-2 border-[#f7cf72] bg-[#f0b83d] px-5 font-heading text-[1.45rem] font-black tracking-wide text-primary shadow-[0_8px_24px_rgba(7,24,14,.4)] active:scale-[.98]"
        >
          <Phone className="size-6 shrink-0" /> {PHONE_LABEL}
        </a>
      </div>
    </main>
  );
}
