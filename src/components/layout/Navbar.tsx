'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import FullscreenMenu from './FullscreenMenu';
import gsap from 'gsap';

const navLinks = [
  { key: 'nav.group', href: '/group' },
  { key: 'nav.trading', href: '/trading' },
  { key: 'nav.hospitality', href: '/hospitality' },
  { key: 'nav.plantation', href: '/plantation' },
  { key: 'nav.japan', href: '/japan' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animate navbar entrance
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' });
    }
  }, []);

  // Slide the active indicator pill to the active link
  useEffect(() => {
    if (!linksContainerRef.current || !indicatorRef.current) return;
    const activeLink = linksContainerRef.current.querySelector(`[data-active="true"]`) as HTMLElement | null;
    if (activeLink) {
      const containerRect = linksContainerRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      gsap.to(indicatorRef.current, {
        x: linkRect.left - containerRect.left,
        width: linkRect.width,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      gsap.to(indicatorRef.current, { opacity: 0, duration: 0.25 });
    }
  }, [pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 opacity-0"
      >
        <div
          className={`
            mx-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border border-solid outline-none
            ${isScrolled
              ? 'max-w-[95%] sm:max-w-[900px] mt-3 rounded-2xl bg-[rgba(12,20,40,0.92)] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-gold-500/30'
              : 'max-w-[1400px] mt-0 rounded-none bg-transparent border-transparent'
            }
          `}
          style={{ WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className={`flex items-center justify-between transition-all duration-700 ${isScrolled ? 'h-14 px-3 sm:px-5' : 'h-20 px-6 md:px-12'}`}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <Image
                src="/logo.svg"
                alt="EA Elite"
                width={36}
                height={36}
                className={`transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(197,165,90,0.3)] ${isScrolled ? 'w-8 h-8' : 'w-9 h-9'}`}
                priority
              />
              <div className={`hidden sm:block transition-all duration-300 ${isScrolled ? 'scale-[0.88] origin-left' : ''}`}>
                <div className="text-white font-[var(--font-cormorant)] text-base font-semibold leading-tight tracking-wide">
                  E.A. Elite
                </div>
                <div className="text-gold-500/80 text-[8px] tracking-[2.5px] uppercase font-medium">
                  Trading Group
                </div>
              </div>
            </Link>

            {/* Center nav links — desktop only */}
            <div ref={linksContainerRef} className="hidden lg:flex items-center gap-0.5 relative">
              {/* Sliding indicator */}
              <div
                ref={indicatorRef}
                className="absolute top-0 bottom-0 rounded-xl bg-gold-500/[0.06] opacity-0 pointer-events-none"
                style={{ transition: 'none' }}
              />
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-active={isActive}
                    className={`
                      relative px-4 py-2 text-[13px] tracking-wide rounded-xl transition-colors duration-300
                      ${isActive ? 'text-gold-400' : 'text-white/60 hover:text-white/90'}
                    `}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Language toggle */}
              <div className="flex items-center rounded-full p-[3px] bg-white/[0.04] border border-gold-500/10">
                <button
                  onClick={() => setLocale('en')}
                  className={`
                    relative px-2.5 py-1 text-[11px] rounded-full transition-all duration-300 font-medium
                    ${locale === 'en'
                      ? 'bg-gold-500 text-navy-900 shadow-[0_2px_8px_rgba(197,165,90,0.3)]'
                      : 'text-white/50 hover:text-white/80'
                    }
                  `}
                >
                  EN
                </button>
                <button
                  onClick={() => setLocale('ja')}
                  className={`
                    relative px-2.5 py-1 text-[11px] rounded-full transition-all duration-300 font-medium
                    ${locale === 'ja'
                      ? 'bg-gold-500 text-navy-900 shadow-[0_2px_8px_rgba(197,165,90,0.3)]'
                      : 'text-white/50 hover:text-white/80'
                    }
                  `}
                >
                  JA
                </button>
              </div>

              {/* Contact — desktop */}
              <Link
                href="/contact"
                className={`
                  hidden lg:flex items-center gap-1.5 text-[13px] font-medium tracking-wide rounded-full transition-all duration-300
                  bg-gold-500/[0.08] border border-gold-500/20 text-gold-400
                  hover:bg-gold-500/15 hover:border-gold-500/40 hover:shadow-[0_0_20px_rgba(197,165,90,0.1)]
                  ${isScrolled ? 'px-4 py-1.5' : 'px-5 py-2'}
                `}
              >
                {t('nav.contact')}
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="opacity-50">
                  <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Hamburger — mobile */}
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.04] border border-gold-500/10 hover:bg-white/[0.08] transition-colors"
                aria-label="Open menu"
              >
                <div className="flex flex-col items-end gap-[5px]">
                  <span className="block w-[18px] h-[1.5px] bg-white/80 rounded-full" />
                  <span className="block w-[12px] h-[1.5px] bg-gold-500 rounded-full" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
