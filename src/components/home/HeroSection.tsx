'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Button from '@/components/ui/Button';
import gsap from 'gsap';

const divisionKeys = [
  'hero.division.trading',
  'hero.division.hospitality',
  'hero.division.agriculture',
  'hero.division.japan',
];

export default function HeroSection() {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const divisionRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [divIdx, setDivIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initial entrance animation
  useEffect(() => {
    if (!mounted) return;

    const tl = gsap.timeline({ delay: 0.3 });

    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word');
      tl.fromTo(
        words,
        { opacity: 0, y: 50, rotateX: -20 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.06, duration: 0.8, ease: 'power3.out' }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    }

    if (divisionRef.current) {
      tl.fromTo(
        divisionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );
    }

    if (bodyRef.current) {
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );
    }

    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.1'
      );
    }

    return () => { tl.kill(); };
  }, [mounted]);

  // Division name cycling
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      if (divisionRef.current) {
        gsap.to(divisionRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => {
            setDivIdx((prev) => (prev + 1) % divisionKeys.length);
            gsap.fromTo(
              divisionRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3 }
            );
          },
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [mounted]);

  const titleText = t('hero.title');

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(197,165,90,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(197,165,90,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 w-full flex items-center justify-center pt-20 sm:pt-24">
        <div className="flex flex-col gap-4 sm:gap-6 max-w-2xl text-center items-center">
          <h1
            ref={titleRef}
            className="font-[var(--font-cormorant)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white leading-[0.95]"
            style={{ perspective: '600px' }}
            suppressHydrationWarning
          >
            {mounted
              ? titleText.split('').map((char, i) => (
                  <span
                    key={i}
                    className="word inline-block"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))
              : titleText}
          </h1>

          <span
            ref={subtitleRef}
            className="font-[var(--font-cormorant)] text-xl sm:text-2xl md:text-3xl text-gold-500 font-semibold opacity-0"
          >
            {t('hero.subtitle')}
          </span>

          {/* Cycling division name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-gold-500" />
            <div
              ref={divisionRef}
              className="text-gold-400 text-sm sm:text-base md:text-lg tracking-wider uppercase font-medium opacity-0"
            >
              {t(divisionKeys[divIdx])}
            </div>
          </div>

          <p
            ref={bodyRef}
            className="text-white/70 text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg leading-relaxed opacity-0"
          >
            {t('hero.desc')}
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-3 sm:gap-4 mt-2 justify-center">
            <Button href="/japan" variant="primary">
              {t('hero.cta.japan')} <span className="ml-1">&rarr;</span>
            </Button>
            <Button href="/who-we-are" variant="secondary">
              {t('hero.cta.learn')}
            </Button>
          </div>

          {/* Hero stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 w-full max-w-lg">
            {[
              { n: '25+', k: 'hero.stat.years' },
              { n: '160', k: 'hero.stat.staff' },
              { n: '100K+', k: 'hero.stat.exported' },
              { n: '10K+', k: 'hero.stat.customers' },
            ].map((s) => (
              <div key={s.k} className="text-center">
                <div className="font-[var(--font-cormorant)] text-xl sm:text-2xl md:text-3xl font-bold text-gold-500">
                  {s.n}
                </div>
                <div className="text-white/60 text-[9px] sm:text-[10px] tracking-wider uppercase mt-1">
                  {t(s.k)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollRef}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="text-white/50 text-[10px] tracking-[3px] uppercase">
          {t('hero.scroll')}
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gold-500 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
