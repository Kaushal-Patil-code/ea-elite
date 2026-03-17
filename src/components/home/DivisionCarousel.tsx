'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import SectionTag from '@/components/layout/SectionTag';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const divisions = [
  { num: '01', icon: '🌾', nameKey: 'divisions.1.name', taglineKey: 'divisions.1.tagline', href: '/trading', color: '#C5A55A' },
  { num: '02', icon: '🐟', nameKey: 'divisions.2.name', taglineKey: 'divisions.2.tagline', href: '/trading', color: '#4ECDC4' },
  { num: '03', icon: '⛏️', nameKey: 'divisions.3.name', taglineKey: 'divisions.3.tagline', href: '/trading', color: '#F39C12' },
  { num: '04', icon: '🏨', nameKey: 'divisions.4.name', taglineKey: 'divisions.4.tagline', href: '/hospitality', color: '#FF6B6B' },
  { num: '05', icon: '☕', nameKey: 'divisions.5.name', taglineKey: 'divisions.5.tagline', href: '/hospitality', color: '#45B7D1' },
  { num: '06', icon: '🍓', nameKey: 'divisions.6.name', taglineKey: 'divisions.6.tagline', href: '/plantation', color: '#2ECC71' },
];

export default function DivisionCarousel() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const glareRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const rafRef = useRef<Map<string, number>>(new Map());

  // Scroll-triggered stagger entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.flip-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80, rotateX: -12, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%' },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent, id: string) => {
    const card = cardsRef.current.get(id);
    const glare = glareRef.current.get(id);
    if (!card) return;

    // Cancel previous frame
    const prevRaf = rafRef.current.get(id);
    if (prevRaf) cancelAnimationFrame(prevRaf);

    rafRef.current.set(id, requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Tilt: ±12deg
      const rotX = ((y - cy) / cy) * -12;
      const rotY = ((x - cx) / cx) * 12;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(20px)`;

      // Move glare
      if (glare) {
        const pctX = (x / rect.width) * 100;
        const pctY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
        glare.style.opacity = '1';
      }
    }));
  }, []);

  const handleMouseLeave = useCallback((id: string) => {
    const card = cardsRef.current.get(id);
    const glare = glareRef.current.get(id);
    if (card) {
      card.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      setTimeout(() => { if (card) card.style.transition = ''; }, 600);
    }
    if (glare) {
      glare.style.opacity = '0';
    }
  }, []);

  return (
    <section id="divisions" ref={sectionRef} className="py-16 sm:py-24 md:py-32 bg-navy-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <SectionTag labelKey="divisions.tag" />
        <p className="text-white/50 text-base sm:text-lg max-w-xl mb-10 sm:mb-16">
          {t('divisions.intro')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {divisions.map((div) => (
            <div
              key={div.num}
              className="flip-card group"
              style={{ perspective: '800px' }}
              onMouseMove={(e) => handleMouseMove(e, div.num)}
              onMouseLeave={() => handleMouseLeave(div.num)}
            >
              {/* Tilt wrapper — mouse-tracked */}
              <div
                ref={(el) => { if (el) cardsRef.current.set(div.num, el); }}
                className="relative w-full h-[280px] sm:h-[320px] md:h-[340px]"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                {/* Dynamic shadow layer */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background: 'transparent',
                    boxShadow: `0 25px 60px -12px ${div.color}25, 0 12px 30px -8px rgba(0,0,0,0.5)`,
                  }}
                />

                {/* Flip inner — CSS hover */}
                <div
                  className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:rotateY(180deg)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* ── FRONT FACE ── */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Card surface */}
                    <div
                      className="absolute inset-0 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between"
                      style={{
                        background: `linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 50%, rgba(0,0,0,0.1) 100%)`,
                        border: '1px solid rgba(197,165,90,0.1)',
                        boxShadow: `
                          inset 0 1px 0 rgba(255,255,255,0.06),
                          inset 0 -1px 0 rgba(0,0,0,0.15),
                          0 4px 16px rgba(0,0,0,0.3),
                          0 1px 3px rgba(0,0,0,0.2)
                        `,
                      }}
                    >
                      {/* Top accent bar with glow */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px]"
                        style={{
                          background: `linear-gradient(90deg, ${div.color}, ${div.color}60, transparent)`,
                          boxShadow: `0 0 12px ${div.color}40`,
                        }}
                      />

                      {/* Corner glow */}
                      <div
                        className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl"
                        style={{ background: div.color, opacity: 0.05 }}
                      />

                      {/* Content — pushed forward in Z for depth parallax */}
                      <div style={{ transform: 'translateZ(30px)' }}>
                        <div className="flex items-center justify-between mb-8">
                          <span
                            className="text-5xl sm:text-6xl font-[var(--font-cormorant)] font-bold"
                            style={{ color: div.color, opacity: 0.2 }}
                          >
                            {div.num}
                          </span>
                          <div
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-2xl sm:text-3xl"
                            style={{
                              background: `${div.color}10`,
                              border: `1px solid ${div.color}20`,
                              boxShadow: `0 4px 12px ${div.color}10`,
                            }}
                          >
                            {div.icon}
                          </div>
                        </div>

                        <h3 className="font-[var(--font-cormorant)] text-xl sm:text-2xl md:text-3xl text-white font-semibold leading-tight">
                          {t(div.nameKey)}
                        </h3>
                      </div>

                      {/* Bottom hint — pushed forward */}
                      <div className="flex items-center gap-2" style={{ transform: 'translateZ(20px)' }}>
                        <div className="w-5 h-[1px]" style={{ background: `${div.color}40` }} />
                        <span className="text-white/20 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">
                          Hover to explore
                        </span>
                      </div>
                    </div>

                    {/* Glare overlay */}
                    <div
                      ref={(el) => { if (el) glareRef.current.set(div.num, el); }}
                      className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-300"
                      style={{ mixBlendMode: 'overlay' }}
                    />
                  </div>

                  {/* ── Card edge (visible mid-flip) ── */}
                  <div
                    className="absolute top-0 bottom-0 rounded-r-sm"
                    style={{
                      right: '-2px',
                      width: '4px',
                      background: `linear-gradient(180deg, ${div.color}40, ${div.color}15, ${div.color}40)`,
                      transformOrigin: 'left center',
                      transform: 'rotateY(90deg) translateZ(2px)',
                      backfaceVisibility: 'hidden',
                    }}
                  />

                  {/* ── BACK FACE ── */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between"
                      style={{
                        background: `linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, ${div.color}08 100%)`,
                        border: `1px solid ${div.color}25`,
                        boxShadow: `
                          inset 0 1px 0 rgba(255,255,255,0.08),
                          inset 0 -1px 0 rgba(0,0,0,0.1),
                          0 4px 16px rgba(0,0,0,0.3),
                          0 1px 3px rgba(0,0,0,0.2)
                        `,
                      }}
                    >
                      {/* Top accent — full width solid */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px]"
                        style={{ background: div.color, boxShadow: `0 0 20px ${div.color}50` }}
                      />

                      {/* Bottom glow */}
                      <div
                        className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl"
                        style={{ background: div.color, opacity: 0.07 }}
                      />

                      {/* Content pushed forward */}
                      <div style={{ transform: 'translateZ(30px)' }}>
                        <div className="flex items-center gap-3 mb-6">
                          <div
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl"
                            style={{ background: `${div.color}15`, border: `1px solid ${div.color}30` }}
                          >
                            {div.icon}
                          </div>
                          <h3
                            className="font-[var(--font-cormorant)] text-lg sm:text-xl font-bold"
                            style={{ color: div.color }}
                          >
                            {t(div.nameKey)}
                          </h3>
                        </div>

                        <p className="text-white/60 text-xs sm:text-sm leading-[1.8]">
                          {t(div.taglineKey)}
                        </p>
                      </div>

                      <Link
                        href={div.href}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:gap-3 self-start"
                        style={{
                          color: div.color,
                          background: `${div.color}10`,
                          border: `1px solid ${div.color}25`,
                          transform: 'translateZ(20px)',
                        }}
                      >
                        Explore
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
