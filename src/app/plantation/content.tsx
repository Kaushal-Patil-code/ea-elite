'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SectionTag from '@/components/layout/SectionTag';
import GlassCard from '@/components/ui/GlassCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { icon: '🍓', titleKey: 'plantation.strawberries.title', descKey: 'plantation.strawberries.desc' },
  { icon: '🫙', titleKey: 'plantation.preserves.title', descKey: 'plantation.preserves.desc' },
  { icon: '🍷', titleKey: 'plantation.wine.title', descKey: 'plantation.wine.desc' },
];

const stages = [
  { icon: '🌱', key: 'plantation.journey.field' },
  { icon: '🌾', key: 'plantation.journey.harvest' },
  { icon: '⚙️', key: 'plantation.journey.processing' },
  { icon: '📦', key: 'plantation.journey.packaging' },
  { icon: '🚢', key: 'plantation.journey.export' },
];

export default function PlantationContent() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const journeyTrackRef = useRef<HTMLDivElement>(null);

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

  // Horizontal scroll journey animation
  useEffect(() => {
    if (!journeyRef.current || !journeyTrackRef.current) return;
    const track = journeyTrackRef.current;
    const scrollWidth = track.scrollWidth - track.clientWidth;

    gsap.to(track, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: journeyRef.current,
        start: 'top top',
        end: `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-navy-900">
      {/* Story Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="reveal">
          <SectionTag labelKey="plantation.tag" />
        </div>

        <h1 className="reveal font-[var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold max-w-3xl leading-tight mt-6">
          {t('plantation.heading')}
        </h1>

        <p className="reveal text-white/50 text-base sm:text-lg max-w-2xl mt-4 sm:mt-6 leading-relaxed">
          {t('plantation.story')}
        </p>
      </div>

      {/* Products Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mt-14 sm:mt-24">
        <div className="reveal">
          <SectionTag labelKey="plantation.products.tag" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-10">
          {products.map((product) => (
            <GlassCard key={product.titleKey} className="reveal">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{product.icon}</div>
              <h3 className="text-white font-semibold text-base sm:text-lg">
                {t(product.titleKey)}
              </h3>
              <p className="text-white/40 text-sm mt-3 leading-relaxed">
                {t(product.descKey)}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Journey Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mt-14 sm:mt-24 mb-4 sm:mb-8">
        <div className="reveal">
          <SectionTag labelKey="plantation.journey.tag" />
        </div>
      </div>

      <div ref={journeyRef} className="relative h-screen flex items-center overflow-hidden">
        <div
          ref={journeyTrackRef}
          className="flex items-center gap-0 pl-6 sm:pl-12 md:pl-24 pr-[30vw] sm:pr-[40vw]"
          style={{ width: 'max-content' }}
        >
          {stages.map((stage, idx) => (
            <div key={stage.key} className="flex items-center">
              {/* Stage card */}
              <div className="flex flex-col items-center w-[220px] sm:w-[260px] md:w-[300px] shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-gold-500/10 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl">
                  {stage.icon}
                </div>
                <span className="mt-4 text-white font-medium text-xs sm:text-sm tracking-wide text-center">
                  {t(stage.key)}
                </span>
              </div>

              {/* Gold connecting line (not after last) */}
              {idx < stages.length - 1 && (
                <div className="w-12 sm:w-16 md:w-24 h-[2px] border-t-2 border-dashed border-gold-500/40 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
