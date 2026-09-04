import type { Metadata } from 'next';
import { Roboto_Condensed, Source_Sans_3 } from 'next/font/google';
import Script from 'next/script';
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
    'Колоті дрова по Києву та області: береза, вільха, сосна, дуб, граб і ясен. Доставка у вартості, ціна нижча при більшому замовленні.',
  openGraph: {
    title: 'Колоті дрова з доставкою по Києву та області',
    description:
      'Береза, вільха, сосна та тверді породи. Чим більше замовляєте — тим дешевше.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Колоті дрова з доставкою по Києву та області',
    description:
      'Береза, вільха, сосна та тверді породи. Чим більше замовляєте — тим дешевше.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18426173367"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18426173367');`}
        </Script>
      </head>
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
