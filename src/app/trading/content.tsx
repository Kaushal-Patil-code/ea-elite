'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import GlassCard from '@/components/ui/GlassCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tabData = [
  {
    id: 'agriculture',
    items: [
      { titleKey: 'trading.agri.maize.title', descKey: 'trading.agri.maize.desc' },
      { titleKey: 'trading.agri.commodities.title', descKey: 'trading.agri.commodities.desc' },
      { titleKey: 'trading.agri.bulk.title', descKey: 'trading.agri.bulk.desc' },
    ],
  },
  {
    id: 'seafood',
    items: [
      { titleKey: 'trading.seafood.rohu.title', descKey: 'trading.seafood.rohu.desc' },
      { titleKey: 'trading.seafood.products.title', descKey: 'trading.seafood.products.desc' },
      { titleKey: 'trading.seafood.coldchain.title', descKey: 'trading.seafood.coldchain.desc' },
    ],
  },
  {
    id: 'minerals',
    items: [
      { titleKey: 'trading.minerals.ores.title', descKey: 'trading.minerals.ores.desc' },
      { titleKey: 'trading.minerals.copper.title', descKey: 'trading.minerals.copper.desc' },
      { titleKey: 'trading.minerals.metals.title', descKey: 'trading.minerals.metals.desc' },
    ],
  },
];

const tabKeys = [
  'trading.tab.agriculture',
  'trading.tab.seafood',
  'trading.tab.minerals',
] as const;

export default function TradingContent() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Scroll-reveal animations
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

  // Animate cards when tab changes
  const animateTabChange = useCallback(
    (newTab: number) => {
      if (newTab === activeTab || !gridRef.current) return;

      const cards = gridRef.current.children;

      gsap.to(cards, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setActiveTab(newTab);
          // Wait for React to render new content, then animate in
          requestAnimationFrame(() => {
            if (!gridRef.current) return;
            const newCards = gridRef.current.children;
            gsap.fromTo(
              newCards,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.35,
                ease: 'power2.out',
              }
            );
          });
        },
      });
    },
    [activeTab]
  );

  const currentItems = tabData[activeTab].items;

  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-navy-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section tag */}
        <div className="reveal section-tag">
          <span>{t('nav.trading')}</span>
        </div>

        {/* Heading */}
        <h1 className="reveal font-[var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold max-w-3xl leading-tight mt-6">
          {t('trading.heading')}
        </h1>

        {/* Overview */}
        <p className="reveal text-white/70 text-base sm:text-lg max-w-2xl mt-4 sm:mt-6 leading-relaxed">
          {t('trading.overview')}
        </p>

        {/* Tab buttons */}
        <div className="reveal flex flex-wrap gap-2 sm:gap-3 mt-8 sm:mt-12">
          {tabKeys.map((key, idx) => (
            <button
              key={key}
              onClick={() => animateTabChange(idx)}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeTab === idx
                  ? 'bg-gold-500 text-navy-900'
                  : 'border border-gold-500/30 text-white/70 hover:border-gold-500/60 hover:text-white/90'
              }`}
            >
              {t(key)}
            </button>
          ))}
        </div>

        {/* Tab content — product cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-10"
        >
          {currentItems.map((item) => (
            <GlassCard key={item.titleKey}>
              <h3 className="text-white font-semibold text-base sm:text-lg">
                {t(item.titleKey)}
              </h3>
              <p className="text-white/60 text-sm mt-3 leading-relaxed">
                {t(item.descKey)}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
