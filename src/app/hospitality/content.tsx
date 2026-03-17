'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SectionTag from '@/components/layout/SectionTag';
import GlassCard from '@/components/ui/GlassCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: '\u{1F3E8}', titleKey: 'hospitality.hotels.title', descKey: 'hospitality.hotels.desc' },
  { icon: '\u2615', titleKey: 'hospitality.coffee.title', descKey: 'hospitality.coffee.desc' },
  { icon: '\u{1F372}', titleKey: 'hospitality.restaurant.title', descKey: 'hospitality.restaurant.desc' },
];

export default function HospitalityContent() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('.reveal');
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-navy-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section tag */}
        <div className="reveal">
          <SectionTag labelKey="hospitality.tag" />
        </div>

        {/* Heading */}
        <h1 className="reveal font-[var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold max-w-3xl leading-tight mt-6">
          {t('hospitality.heading')}
        </h1>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {services.map((service) => (
            <div key={service.titleKey} className="reveal">
              <GlassCard className="flex flex-col gap-4">
                <span className="text-3xl sm:text-4xl">{service.icon}</span>
                <h3 className="text-white font-semibold text-base sm:text-lg">
                  {t(service.titleKey)}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {t(service.descKey)}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
