'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SectionTag from '@/components/layout/SectionTag';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const objectives = [
  { icon: '🤝', titleKey: 'japan.partners', descKey: 'japan.partners.desc' },
  { icon: '💼', titleKey: 'japan.investors', descKey: 'japan.investors.desc' },
  { icon: '🏢', titleKey: 'japan.b2b', descKey: 'japan.b2b.desc' },
];

const productTags = [
  'Yellow Maize', 'Frozen Seafood', 'Copper Cathode',
  'Fresh Strawberries', 'Artisanal Preserves', 'Strawberry Wine',
];

export default function JapanCTA() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('.reveal');
    els.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section id="japan" ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="reveal">
          <SectionTag labelKey="japan.tag" />
        </div>
        <h2 className="reveal font-[var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl text-white font-semibold max-w-2xl mt-6">
          {t('japan.heading')}
        </h2>
        <p className="reveal text-white/50 text-base sm:text-lg max-w-2xl mt-3 sm:mt-4 leading-relaxed">
          {t('japan.desc')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {objectives.map((obj, i) => (
            <GlassCard key={i} className="reveal">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{obj.icon}</div>
              <h3 className="text-white font-semibold text-base sm:text-lg mb-1.5 sm:mb-2">{t(obj.titleKey)}</h3>
              <p className="text-white/40 text-sm">{t(obj.descKey)}</p>
            </GlassCard>
          ))}
        </div>

        <div className="reveal flex flex-wrap gap-2 mt-6 sm:mt-8">
          {productTags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 text-xs text-gold-500 border border-gold-500/20 rounded-full bg-gold-500/5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="reveal mt-8 sm:mt-10">
          <Button href="/japan" variant="primary">
            {t('japan.cta')} <span className="ml-1">&rarr;</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
