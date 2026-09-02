import type { Metadata } from 'next';
import { Roboto_Condensed, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const bodyFont = Source_Sans_3({
  variable: '--font-body',
  subsets: ['cyrillic', 'latin'],
});
const headingFont = Roboto_Condensed({
  variable: '--font-display',
  subsets: ['cyrillic', 'latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      'https://drova-u-dida-ivana.adept-trout-3642.chatgpt.site',
  ),
  title: 'Колоті дрова з доставкою — Дрова у Діда Івана',
  description:
    'Колоті дрова по Києву та області: береза, вільха і сосна. Доставка у вартості, ціна нижча при більшому замовленні.',
  openGraph: {
    title: 'Колоті дрова з доставкою по Києву та області',
    description:
      'Береза, вільха та сосна. Чим більше замовляєте — тим дешевше.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Колоті дрова з доставкою по Києву та області',
    description:
      'Береза, вільха та сосна. Чим більше замовляєте — тим дешевше.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
