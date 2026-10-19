'use client';

import { useEffect, useState } from 'react';

export function promotionText(now: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const part = (type: string) =>
    Number(parts.find((item) => item.type === type)!.value);
  // Work with Kyiv calendar dates in UTC to keep three-day periods stable
  // across daylight-saving changes. The first period is 19–21 October 2026.
  const dayMs = 86_400_000;
  const anchor = Date.UTC(2026, 9, 19);
  const today = Date.UTC(part('year'), part('month') - 1, part('day'));
  const period = Math.floor((today - anchor) / (3 * dayMs));
  const end = new Date(anchor + (period * 3 + 2) * dayMs);
  const deadline = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
  }).format(end);
  return `🔥 Акція — ціни знижено до ${deadline}!`;
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
