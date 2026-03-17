'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SectionTag from '@/components/layout/SectionTag';
import GlassCard from '@/components/ui/GlassCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { titleKey: 'whoweare.values.innovation', descKey: 'whoweare.values.innovation.desc' },
  { titleKey: 'whoweare.values.trust', descKey: 'whoweare.values.trust.desc' },
  { titleKey: 'whoweare.values.growth', descKey: 'whoweare.values.growth.desc' },
];

const credentials = [
  'whoweare.founder.cred.1',
  'whoweare.founder.cred.2',
  'whoweare.founder.cred.3',
];

const timeline = [
  { titleKey: 'whoweare.timeline.1.title', descKey: 'whoweare.timeline.1.desc' },
  { titleKey: 'whoweare.timeline.2.title', descKey: 'whoweare.timeline.2.desc' },
  { titleKey: 'whoweare.timeline.3.title', descKey: 'whoweare.timeline.3.desc' },
  { titleKey: 'whoweare.timeline.4.title', descKey: 'whoweare.timeline.4.desc' },
];

const forces = [
  { titleKey: 'whoweare.forces.1.title', descKey: 'whoweare.forces.1.desc' },
  { titleKey: 'whoweare.forces.2.title', descKey: 'whoweare.forces.2.desc' },
  { titleKey: 'whoweare.forces.3.title', descKey: 'whoweare.forces.3.desc' },
];

export default function WhoWeAreContent() {
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
        },
      );
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-navy-900">
      {/* ── Core Values ── */}
      <div className="py-10 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="reveal">
          <SectionTag labelKey="whoweare.values.tag" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-2">
          {values.map((v) => (
            <div key={v.titleKey} className="reveal">
              <GlassCard className="h-full">
                <h3 className="font-[var(--font-cormorant)] text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3">
                  {t(v.titleKey)}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t(v.descKey)}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

      {/* ── Founder ── */}
      <div className="py-10 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="reveal">
          <SectionTag labelKey="whoweare.founder.tag" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mt-2">
          {/* Profile card */}
          <div className="reveal flex flex-col items-center lg:items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold-500/20 border-2 border-gold-500 flex items-center justify-center">
              <span className="font-[var(--font-cormorant)] text-xl sm:text-2xl font-bold text-gold-500">
                MZ
              </span>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="font-[var(--font-cormorant)] text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {t('whoweare.founder.name')}
              </h3>
              <p className="text-gold-500 text-sm tracking-wider uppercase mt-1">
                {t('whoweare.founder.title')}
              </p>
            </div>

            {/* Credential pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {credentials.map((key) => (
                <span
                  key={key}
                  className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-gold-500/30 text-gold-400 text-xs tracking-wide"
                >
                  {t(key)}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="reveal relative pl-8">
            {/* Vertical dotted line */}
            <div
              className="absolute left-[7px] top-2 bottom-2 w-[1px]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, #C5A55A 0px, #C5A55A 4px, transparent 4px, transparent 10px)',
              }}
            />

            <div className="flex flex-col gap-7 sm:gap-10">
              {timeline.map((item) => (
                <div key={item.titleKey} className="relative">
                  {/* Dot */}
                  <div className="absolute -left-8 top-1.5 w-[14px] h-[14px] rounded-full border-2 border-gold-500 bg-navy-900" />
                  <h4 className="font-[var(--font-cormorant)] text-lg font-semibold text-white">
                    {t(item.titleKey)}
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed mt-1">
                    {t(item.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Vision & Mission ── */}
      <div className="py-10 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="reveal">
          <SectionTag labelKey="whoweare.vision.tag" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-2">
          <div className="reveal">
            <GlassCard className="h-full">
              <span className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase">
                VISION
              </span>
              <h3 className="font-[var(--font-cormorant)] text-lg sm:text-xl md:text-2xl font-semibold text-white mt-3 mb-3">
                {t('whoweare.vision.title')}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {t('whoweare.vision.text')}
              </p>
            </GlassCard>
          </div>

          <div className="reveal">
            <GlassCard className="h-full">
              <span className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase">
                MISSION
              </span>
              <h3 className="font-[var(--font-cormorant)] text-lg sm:text-xl md:text-2xl font-semibold text-white mt-3 mb-3">
                {t('whoweare.mission.title')}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {t('whoweare.mission.text')}
              </p>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* ── Driving Forces ── */}
      <div className="py-10 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="reveal">
          <SectionTag labelKey="whoweare.forces.tag" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-2">
          {forces.map((f) => (
            <div key={f.titleKey} className="reveal">
              <GlassCard className="h-full">
                <h3 className="font-[var(--font-cormorant)] text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3">
                  {t(f.titleKey)}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t(f.descKey)}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
