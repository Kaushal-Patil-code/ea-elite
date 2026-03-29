'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SectionTag from '@/components/layout/SectionTag';
import Button from '@/components/ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
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
    <section id="about" ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="reveal">
          <SectionTag labelKey="about.tag" />
        </div>
        <h2 className="reveal font-[var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold max-w-3xl leading-tight mt-6">
          {t('about.heading')}
        </h2>
        <p className="reveal text-white/70 text-base sm:text-lg max-w-2xl mt-4 sm:mt-6 leading-relaxed">
          {t('about.body')}
        </p>
        <div className="reveal mt-6 sm:mt-8">
          <Button href="/who-we-are" variant="secondary">
            {t('about.cta')} <span className="ml-1">&rarr;</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
