'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SectionTag from '@/components/layout/SectionTag';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 25, suffix: '+', labelKey: 'numbers.years' },
  { value: 160, suffix: '', labelKey: 'numbers.staff' },
  { value: 100000, suffix: '+', labelKey: 'numbers.exported' },
  { value: 15000, suffix: '+', labelKey: 'numbers.imported' },
  { value: 10000, suffix: '+', labelKey: 'numbers.customers' },
  { value: 5, suffix: '', labelKey: 'numbers.countries' },
];

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toString();
}

export default function StatsCounter() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!countersRef.current) return;

    const statEls = countersRef.current.querySelectorAll('.stat-number');

    statEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const target = parseInt(htmlEl.dataset.target || '0');
      const suffix = htmlEl.dataset.suffix || '';

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power1.out',
        scrollTrigger: { trigger: htmlEl, start: 'top 85%' },
        onUpdate: () => {
          const current = Math.ceil(obj.val);
          htmlEl.textContent = formatNumber(current) + suffix;
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section id="numbers" ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-navy-900">
      <div className="max-w-[1400px] mx-auto">
        <SectionTag labelKey="numbers.tag" />

        <div ref={countersRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mt-8 sm:mt-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="stat-number text-3xl sm:text-4xl md:text-5xl font-[var(--font-cormorant)] font-bold text-gold-500"
                data-target={stat.value}
                data-suffix={stat.suffix}
                style={{ textShadow: '0 0 30px rgba(197,165,90,0.2)' }}
              >
                0
              </div>
              <div className="text-white/60 text-xs sm:text-sm mt-1.5 sm:mt-2 tracking-wide">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
