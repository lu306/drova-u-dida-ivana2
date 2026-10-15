'use client';

import { useEffect, useState } from 'react';

export function promotionText(now: Date): string | null {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const part = (type: string) =>
    parts.find((item) => item.type === type)!.value;
  const date = `${part('year')}-${part('month')}-${part('day')}`;
  if (date >= '2026-10-15' && date <= '2026-10-18')
    return '🔥 Акція — ціни знижено до 18 жовтня!';
  if (date >= '2026-10-19' && date <= '2026-10-25')
    return '🔥 Акція — ціни знижено до 25 жовтня!';
  return null;
}

export default function HeroPromotion() {
  // Static HTML and the first client render agree. Only the live client clock
  // selects a period, so cached HTML never contains an expired offer.
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setText(promotionText(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('focus', update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('focus', update);
    };
  }, []);
  return (
    <div className="hero-promotion" role="status" aria-live="polite">
      {text && <p className="promo-call">{text}</p>}
    </div>
  );
}
