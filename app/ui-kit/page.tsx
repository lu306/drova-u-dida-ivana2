'use client';

import { ArrowLeft, Check, Flame, Phone, Truck } from 'lucide-react';
import { useState } from 'react';

import {
  MobileBottomBar,
  OrderCalculator,
  PhoneBlock,
  PhoneButton,
  PriceTable,
  ProductCard,
} from '@/app/firewood-ui';
import { WOODS, type WoodId } from '@/lib/firewood';

function KitSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#d8c8aa] py-12 sm:py-16">
      <div className="mb-7 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary font-black text-white">
          {number}
        </span>
        <h2 className="font-heading text-3xl font-black uppercase text-primary sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default function UiKitPage() {
  const [woodId, setWoodId] = useState<WoodId>('birch');
  const [quantity, setQuantity] = useState(6);

  return (
    <main className="min-h-screen bg-[#efe7d6] text-primary">
      <header className="sticky top-0 z-30 border-b border-[#d8c8aa] bg-[#fffaf0]/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-4">
          <a
            href="/"
            className="flex min-h-12 items-center gap-2 rounded-xl px-3 text-lg font-black hover:bg-[#f1e6d1]"
          >
            <ArrowLeft className="size-6" /> На головну
          </a>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="size-12 rounded-full" />
            <div>
              <p className="font-black">Дрова у Діда Івана</p>
              <p className="text-sm font-bold text-[#6b6c64]">UI‑компоненти</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1220px] px-4 sm:px-6">
        <section className="py-14 sm:py-20">
          <p className="text-sm font-black uppercase tracking-[.16em] text-[#9b3724]">
            High‑fidelity component sheet
          </p>
          <h1 className="mt-3 max-w-4xl font-heading text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-[.9] tracking-[-.04em]">
            Окремі UI‑компоненти
          </h1>
          <p className="mt-5 max-w-3xl text-xl font-semibold text-[#5f635d]">
            Великі ціни, чіткі стани вибору, контрастні кнопки та один основний
            сценарій — зателефонувати.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              ['#FFF8EB', 'Кремовий'],
              ['#183A28', 'Темно‑зелений'],
              ['#7B4D2A', 'Дерево'],
              ['#B84A2F', 'Ціна / акцент'],
              ['#F0B83D', 'Вигода'],
            ].map(([color, label]) => (
              <div
                key={color}
                className="flex items-center gap-2 rounded-full border border-[#d8c8aa] bg-[#fffaf0] py-2 pl-2 pr-4 font-bold"
              >
                <span
                  className="size-8 rounded-full border border-black/10"
                  style={{ background: color }}
                />
                {label}
              </div>
            ))}
          </div>
        </section>

        <KitSection number="1" title="Картка товару">
          <div className="max-w-md">
            <ProductCard wood={WOODS[0]} compact onChoose={setWoodId} />
          </div>
        </KitSection>

        <KitSection number="2" title="Таблиця цін">
          <PriceTable />
        </KitSection>

        <KitSection number="3" title="Калькулятор">
          <OrderCalculator
            woodId={woodId}
            quantity={quantity}
            onWoodChange={setWoodId}
            onQuantityChange={setQuantity}
          />
        </KitSection>

        <KitSection number="4" title="CTA та кнопки">
          <div className="grid gap-4 rounded-3xl bg-[#fffaf0] p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            <PhoneButton className="w-full" />
            <a
              href="#"
              className="flex min-h-14 items-center justify-center rounded-xl bg-primary px-5 text-lg font-black text-white"
            >
              Замовити березу
            </a>
            <a
              href="#"
              className="flex min-h-14 items-center justify-center rounded-xl border-2 border-primary bg-[#fffaf0] px-5 text-lg font-black text-primary"
            >
              Подивитися ціни
            </a>
            <a
              href="#"
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#f0b83d] px-5 text-lg font-black text-primary"
            >
              <Flame className="size-5" /> Порахувати вигоду
            </a>
          </div>
        </KitSection>

        <KitSection number="5" title="Блок телефону">
          <PhoneBlock />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              [Check, 'Чесний об’єм'],
              [Truck, 'Доставка включена'],
              [Phone, 'Дзвінок в один дотик'],
            ].map(([Icon, label]) => (
              <div
                key={String(label)}
                className="flex min-h-16 items-center gap-3 rounded-xl bg-[#fffaf0] px-5 text-lg font-black"
              >
                <Icon className="size-6 text-[#9b3724]" />
                {String(label)}
              </div>
            ))}
          </div>
        </KitSection>

        <KitSection number="6" title="Мобільна нижня панель">
          <div className="mx-auto max-w-sm overflow-hidden rounded-[2.2rem] border-[8px] border-[#17281d] bg-[#fffaf0] shadow-xl">
            <div className="flex min-h-[360px] flex-col justify-between p-6">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="" className="size-14 rounded-full" />
                <p className="text-lg font-black">Дрова у Діда Івана</p>
              </div>
              <div>
                <p className="font-heading text-4xl font-black uppercase leading-none">
                  Ціна і дзвінок завжди поруч
                </p>
                <p className="mt-3 text-lg font-semibold text-[#656760]">
                  Панель залишається внизу екрана.
                </p>
              </div>
            </div>
            <MobileBottomBar demo />
          </div>
        </KitSection>
      </div>
    </main>
  );
}
