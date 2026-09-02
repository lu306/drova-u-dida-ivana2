import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UI‑компоненти — Дрова у Діда Івана',
  description:
    'Картка товару, таблиця цін, калькулятор, CTA, телефон і мобільна панель.',
};

export default function UiKitLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
