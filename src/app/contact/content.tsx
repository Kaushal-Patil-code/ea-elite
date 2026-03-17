'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Button from '@/components/ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const inputCls =
  'bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm w-full focus:outline-none focus:border-gold-500/50 transition-colors placeholder:text-white/30';

export default function ContactContent() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:amazingmmsygn@gmail.com,drminnzaw@gmail.com?subject=${subject}&body=${body}`;
  };

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
    <section ref={sectionRef} className="min-h-screen bg-navy-900 pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {/* ── Hero area ── */}
        <div className="reveal">
          <div className="section-tag">
            <span>{t('contact.tag')}</span>
          </div>

          <h1 className="font-[var(--font-cormorant)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('contact.heading')}
          </h1>

          <p className="text-white/50 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-8 sm:mb-12">
            {t('contact.desc')}
          </p>
        </div>

        {/* ── 2-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Left: Contact form */}
          <div className="reveal">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
              <input
                type="text"
                required
                placeholder={t('contact.form.name')}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
              />

              <input
                type="email"
                required
                placeholder={t('contact.form.email')}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputCls}
              />

              <input
                type="text"
                placeholder={t('contact.form.subject')}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inputCls}
              />

              <textarea
                required
                rows={5}
                placeholder={t('contact.form.message')}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputCls} resize-none`}
              />

              <div>
                <Button variant="primary" type="submit">
                  {t('contact.form.submit')}
                </Button>
              </div>
            </form>
          </div>

          {/* Right: Office cards */}
          <div className="flex flex-col gap-6">
            {/* Bangkok HQ */}
            <div className="reveal">
              <div className="bg-white/[0.03] backdrop-blur border border-[rgba(197,165,90,0.07)] rounded-lg p-4 sm:p-6">
                <span className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase">
                  {t('contact.bangkok.title')}
                </span>
                <h3 className="font-[var(--font-cormorant)] text-lg sm:text-xl md:text-2xl font-bold text-white mt-3">
                  E.A. Elite Trading Co., Ltd
                </h3>
                <p className="text-white/40 text-sm mt-2 leading-relaxed">
                  {t('contact.bangkok.address')}
                </p>
                <p className="text-white/40 text-sm mt-2">amazingmmsygn@gmail.com</p>
                <p className="text-white/40 text-sm">drminnzaw@gmail.com</p>
              </div>
            </div>

            {/* Japan & Singapore */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Japan Office */}
              <div className="reveal">
                <div className="bg-white/[0.03] backdrop-blur border border-[rgba(197,165,90,0.07)] rounded-lg p-4 sm:p-6 h-full">
                  <span className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase">
                    {t('contact.japan.title')}
                  </span>
                  <h3 className="font-[var(--font-cormorant)] text-base sm:text-lg md:text-xl font-bold text-white mt-3">
                    E.A. Elite Co., Ltd
                  </h3>
                  <p className="text-white/25 text-sm mt-2 italic leading-relaxed">
                    {t('contact.japan.address')}
                  </p>
                </div>
              </div>

              {/* Singapore Office */}
              <div className="reveal">
                <div className="bg-white/[0.03] backdrop-blur border border-[rgba(197,165,90,0.07)] rounded-lg p-4 sm:p-6 h-full">
                  <span className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase">
                    {t('contact.singapore.title')}
                  </span>
                  <h3 className="font-[var(--font-cormorant)] text-base sm:text-lg md:text-xl font-bold text-white mt-3">
                    E.A. Elite Co., Ltd
                  </h3>
                  <p className="text-white/25 text-sm mt-2 italic leading-relaxed">
                    {t('contact.singapore.address')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
