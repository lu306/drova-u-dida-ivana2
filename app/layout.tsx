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
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: 'Дрова у Діда Івана — чесна ціна з доставкою',
  description:
    'Береза, вільха та сосна з доставкою. Чим більше замовлення — тим нижча ціна.',
  openGraph: {
    title: 'Більше дров — менша ціна',
    description: 'Береза, вільха та сосна. Доставка вже у вартості.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Більше дров — менша ціна',
    description: 'Береза, вільха та сосна. Доставка вже у вартості.',
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
