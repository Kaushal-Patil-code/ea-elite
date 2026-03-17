'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';

const menuLinks = [
  { key: 'nav.home', href: '/', num: '01' },
  { key: 'nav.about', href: '/who-we-are', num: '02' },
  { key: 'nav.group', href: '/group', num: '03' },
  { key: 'nav.trading', href: '/trading', num: '04' },
  { key: 'nav.hospitality', href: '/hospitality', num: '05' },
  { key: 'nav.plantation', href: '/plantation', num: '06' },
  { key: 'nav.japan', href: '/japan', num: '07' },
  { key: 'nav.contact', href: '/contact', num: '08' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenMenu({ isOpen, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    if (!overlayRef.current || !linksRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power3.out',
      });

      // Animate the vertical accent line
      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.6, delay: 0.1, ease: 'power3.out' });
      }

      // Stagger links in
      gsap.fromTo(
        linksRef.current.children,
        { opacity: 0, x: -40, skewX: -3 },
        {
          opacity: 1,
          x: 0,
          skewX: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.15,
        }
      );

      // Footer fade
      if (footerRef.current) {
        gsap.fromTo(footerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.5, ease: 'power2.out' });
      }
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.35,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] opacity-0 pointer-events-none"
      style={{
        background: 'linear-gradient(135deg, rgba(12,20,40,0.98) 0%, rgba(19,33,66,0.98) 50%, rgba(12,20,40,0.99) 100%)',
        backdropFilter: 'blur(40px) saturate(1.2)',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/60 hover:text-gold-500 hover:border-gold-500/20 transition-all duration-300 group"
        aria-label="Close menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Main content area */}
      <div className="h-full flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-24 max-w-[900px]">
        {/* Vertical accent line */}
        <div
          ref={lineRef}
          className="absolute left-6 sm:left-8 md:left-16 lg:left-24 top-[15%] bottom-[15%] w-[1px] origin-top"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(197,165,90,0.2) 30%, rgba(197,165,90,0.2) 70%, transparent)' }}
        />

        {/* Links */}
        <div ref={linksRef} className="flex flex-col gap-0.5 sm:gap-1 pl-6 sm:pl-8 md:pl-10">
          {menuLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="group flex items-center gap-4 py-1.5 sm:py-2 md:py-3"
              >
                {/* Number */}
                <span className={`
                  font-[var(--font-cormorant)] text-sm w-6 transition-colors duration-300
                  ${isActive ? 'text-gold-500' : 'text-white/40 group-hover:text-gold-500/50'}
                `}>
                  {link.num}
                </span>

                {/* Dot indicator */}
                <span className={`
                  w-1.5 h-1.5 rounded-full transition-all duration-300
                  ${isActive
                    ? 'bg-gold-500 shadow-[0_0_8px_rgba(197,165,90,0.5)]'
                    : 'bg-white/10 group-hover:bg-gold-500/40'
                  }
                `} />

                {/* Label */}
                <span className={`
                  font-[var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold transition-all duration-300
                  ${isActive
                    ? 'text-gold-500'
                    : 'text-white/80 group-hover:text-white group-hover:translate-x-2'
                  }
                `}>
                  {t(link.key)}
                </span>

                {/* Arrow on hover */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-0 -translate-x-3 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-300 text-gold-500"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="absolute bottom-8 left-6 sm:left-8 md:left-16 lg:left-24 right-6 sm:right-8 flex justify-between items-end"
      >
        <div className="flex gap-6 text-white/40 text-[10px] sm:text-xs tracking-wider">
          <span>eaelitetradingthailand@gmail.com</span>
        </div>
        <div className="text-white/40 text-[10px] tracking-[0.2em] uppercase">
          &copy; 2026 E.A. Elite
        </div>
      </div>
    </div>
  );
}
