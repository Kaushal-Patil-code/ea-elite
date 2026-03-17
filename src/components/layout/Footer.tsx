'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 sm:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Left: company info */}
          <div>
            <h3 className="text-white font-[var(--font-cormorant)] text-xl sm:text-2xl font-semibold mb-2">
              E.A. Elite Trading Group
            </h3>
            <p className="text-gold-500 text-xs sm:text-sm tracking-wide">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Right: countries */}
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 text-xs sm:text-sm text-white/50">
            <span>{t('footer.thailand')}</span>
            <span>{t('footer.japan')}</span>
            <span>{t('footer.singapore')}</span>
            <span>{t('footer.myanmar')}</span>
          </div>
        </div>

        {/* Bottom: copyright */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-[10px] sm:text-xs">
            &copy; {year} {t('footer.copyright')}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-white/30 text-[10px] sm:text-xs">
            <span>amazingmmsygn@gmail.com</span>
            <span>drminnzaw@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
