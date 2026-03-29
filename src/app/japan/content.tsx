'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SectionTag from '@/components/layout/SectionTag';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const objectives = [
  { icon: '🤝', titleKey: 'japan.partners', descKey: 'japan.partners.desc' },
  { icon: '💰', titleKey: 'japan.investors', descKey: 'japan.investors.desc' },
  { icon: '📦', titleKey: 'japan.b2b', descKey: 'japan.b2b.desc' },
];

const productTags = [
  'Yellow Maize',
  'Frozen Rohu',
  'Seafood',
  'Minerals',
  'Strawberries',
  'Preserves',
];

export default function JapanContent() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Scroll-reveal animations
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'japan' }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setForm({ name: '', email: '', company: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm w-full focus:outline-none focus:border-gold-500/50 placeholder:text-white/40';

  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-navy-900">
      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="reveal">
          <SectionTag labelKey="japan.tag" />
        </div>

        <h1 className="reveal font-[var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold max-w-3xl leading-tight mt-6">
          {t('japan.heading')}
        </h1>

        <p className="reveal text-white/70 text-base sm:text-lg max-w-2xl mt-4 sm:mt-6 leading-relaxed">
          {t('japan.desc')}
        </p>
      </div>

      {/* Objectives */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mt-14 sm:mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {objectives.map((obj) => (
            <GlassCard key={obj.titleKey} className="reveal">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{obj.icon}</div>
              <h3 className="text-white font-semibold text-base sm:text-lg">
                {t(obj.titleKey)}
              </h3>
              <p className="text-white/70 text-sm mt-3 leading-relaxed">
                {t(obj.descKey)}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Product Tags */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mt-10 sm:mt-16">
        <div className="reveal flex flex-wrap gap-3">
          {productTags.map((tag) => (
            <span
              key={tag}
              className="bg-gold-500/10 border border-gold-500/15 text-gold-500 rounded-full px-4 py-1.5 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mt-14 sm:mt-24">
        <GlassCard className="reveal max-w-full sm:max-w-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-white/70 text-[10px] sm:text-xs tracking-wider uppercase mb-2 block">
                {t('japan.form.name')}
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder={t('japan.form.name')}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-white/70 text-[10px] sm:text-xs tracking-wider uppercase mb-2 block">
                {t('japan.form.email')}
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder={t('japan.form.email')}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-white/70 text-[10px] sm:text-xs tracking-wider uppercase mb-2 block">
                {t('japan.form.company')}
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder={t('japan.form.company')}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-white/70 text-[10px] sm:text-xs tracking-wider uppercase mb-2 block">
                {t('japan.form.message')}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={t('japan.form.message')}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="mt-1 sm:mt-2">
              <Button variant="primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : t('japan.form.submit')}
              </Button>
            </div>

            {status === 'sent' && (
              <p className="text-green-400 text-sm">Your enquiry has been sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm">Failed to send. Please try again.</p>
            )}
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
