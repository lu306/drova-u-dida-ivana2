import type { Metadata } from 'next';
import Homepage from '@/app/homepage';
import { PHONE, WOODS, PRICE_QUANTITIES, getUnitPrice } from '@/lib/firewood';
import { landingFaq, productTitles } from '@/lib/landing-content';

const site = 'https://did-ivan-drova.com';
export const metadata: Metadata = { alternates: { canonical: `${site}/` } };
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Store', '@id': `${site}/#store`, name: 'Дрова у Діда Івана', url: `${site}/`, telephone: PHONE, logo: `${site}/logo.webp`, image: `${site}/logo.webp`, areaServed: ['Київ', 'Київська область'] },
    ...WOODS.map((wood) => ({
      '@type': 'Product', '@id': `${site}/#product-${wood.id}`,
      name: wood.id === 'hardwood' ? 'Колоті дрова твердих порід: дуб, ясен, акація' : productTitles[wood.id],
      description: `${wood.description} ${wood.bestFor}`,
      image: `${site}${wood.image}`,
      offers: PRICE_QUANTITIES.map((quantity) => ({
        '@type': 'Offer', '@id': `${site}/#offer-${wood.id}-${quantity}`, name: `${quantity} скл. м — ${wood.name}`,
        url: `${site}/#products`, priceCurrency: 'UAH',
        price: getUnitPrice(wood, quantity) * quantity,
        // The offer price covers this whole order, not one складометр.
        eligibleQuantity: { '@type': 'QuantitativeValue', value: quantity, unitText: 'складометр' },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: getUnitPrice(wood, quantity) * quantity,
          priceCurrency: 'UAH',
          referenceQuantity: { '@type': 'QuantitativeValue', value: quantity, unitText: 'складометр' },
        },
        description: `${quantity} складометрів, ${getUnitPrice(wood, quantity)} грн за складометр. Доставка включена.`,
        seller: { '@id': `${site}/#store` },
      })),
    })),
    { '@type': 'FAQPage', '@id': `${site}/#faq-title`, url: `${site}/#faq-title`, inLanguage: 'uk-UA', mainEntity: landingFaq.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ],
};
export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <Homepage />
  </>;
}
