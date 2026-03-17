'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SectionTag from '@/components/layout/SectionTag';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const companies = [
  { nameKey: 'group.ea.th.name', roleKey: 'group.ea.th.role', locKey: 'group.ea.th.location', color: '#C5A55A' },
  { nameKey: 'group.ea.jp.name', roleKey: 'group.ea.jp.role', locKey: 'group.ea.jp.location', color: '#FF6B6B' },
  { nameKey: 'group.ea.sg.name', roleKey: 'group.ea.sg.role', locKey: 'group.ea.sg.location', color: '#4ECDC4' },
  { nameKey: 'group.mtb.name', roleKey: 'group.mtb.role', locKey: 'group.mtb.location', color: '#45B7D1' },
  { nameKey: 'group.minn.name', roleKey: 'group.minn.role', locKey: 'group.minn.location', color: '#2ECC71' },
];

export default function GroupContent() {
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
        },
      );
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-navy-900">
      <div className="py-10 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="reveal">
          <SectionTag labelKey="group.tag" />
        </div>

        <h2 className="reveal font-[var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold max-w-3xl leading-tight mt-2 mb-8 sm:mb-12">
          {t('group.heading')}
        </h2>

        <div className="flex flex-col gap-3 sm:gap-5">
          {companies.map((company) => (
            <div key={company.nameKey} className="reveal">
              <div
                className="glass-card p-4 sm:p-6 flex items-center gap-3 sm:gap-5"
                style={{ borderLeft: `3px solid ${company.color}` }}
              >
                {/* Color-coded dot */}
                <div
                  className="shrink-0 w-[10px] h-[10px] rounded-full"
                  style={{
                    backgroundColor: company.color,
                    boxShadow: `0 0 10px ${company.color}60`,
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-[var(--font-cormorant)] text-base sm:text-lg md:text-xl font-bold text-white">
                    {t(company.nameKey)}
                  </h3>
                  <p className="text-white/50 text-sm mt-0.5">
                    {t(company.roleKey)}
                  </p>
                </div>

                <span className="hidden sm:block text-white/30 text-xs tracking-wider uppercase shrink-0">
                  {t(company.locKey)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
