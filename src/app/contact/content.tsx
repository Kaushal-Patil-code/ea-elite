'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Button from '@/components/ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const countryCodes = [
  { flag: '🇹🇭', code: 'TH', dial: '+66' },
  { flag: '🇯🇵', code: 'JP', dial: '+81' },
  { flag: '🇸🇬', code: 'SG', dial: '+65' },
  { flag: '🇲🇲', code: 'MM', dial: '+95' },
  { flag: '🇦🇫', code: 'AF', dial: '+93' },
  { flag: '🇦🇱', code: 'AL', dial: '+355' },
  { flag: '🇩🇿', code: 'DZ', dial: '+213' },
  { flag: '🇦🇸', code: 'AS', dial: '+1684' },
  { flag: '🇦🇩', code: 'AD', dial: '+376' },
  { flag: '🇦🇴', code: 'AO', dial: '+244' },
  { flag: '🇦🇮', code: 'AI', dial: '+1264' },
  { flag: '🇦🇬', code: 'AG', dial: '+1268' },
  { flag: '🇦🇷', code: 'AR', dial: '+54' },
  { flag: '🇦🇲', code: 'AM', dial: '+374' },
  { flag: '🇦🇼', code: 'AW', dial: '+297' },
  { flag: '🇦🇺', code: 'AU', dial: '+61' },
  { flag: '🇦🇹', code: 'AT', dial: '+43' },
  { flag: '🇦🇿', code: 'AZ', dial: '+994' },
  { flag: '🇧🇸', code: 'BS', dial: '+1242' },
  { flag: '🇧🇭', code: 'BH', dial: '+973' },
  { flag: '🇧🇩', code: 'BD', dial: '+880' },
  { flag: '🇧🇧', code: 'BB', dial: '+1246' },
  { flag: '🇧🇾', code: 'BY', dial: '+375' },
  { flag: '🇧🇪', code: 'BE', dial: '+32' },
  { flag: '🇧🇿', code: 'BZ', dial: '+501' },
  { flag: '🇧🇯', code: 'BJ', dial: '+229' },
  { flag: '🇧🇲', code: 'BM', dial: '+1441' },
  { flag: '🇧🇹', code: 'BT', dial: '+975' },
  { flag: '🇧🇴', code: 'BO', dial: '+591' },
  { flag: '🇧🇦', code: 'BA', dial: '+387' },
  { flag: '🇧🇼', code: 'BW', dial: '+267' },
  { flag: '🇧🇷', code: 'BR', dial: '+55' },
  { flag: '🇧🇳', code: 'BN', dial: '+673' },
  { flag: '🇧🇬', code: 'BG', dial: '+359' },
  { flag: '🇧🇫', code: 'BF', dial: '+226' },
  { flag: '🇧🇮', code: 'BI', dial: '+257' },
  { flag: '🇰🇭', code: 'KH', dial: '+855' },
  { flag: '🇨🇲', code: 'CM', dial: '+237' },
  { flag: '🇨🇦', code: 'CA', dial: '+1' },
  { flag: '🇨🇻', code: 'CV', dial: '+238' },
  { flag: '🇰🇾', code: 'KY', dial: '+1345' },
  { flag: '🇨🇫', code: 'CF', dial: '+236' },
  { flag: '🇹🇩', code: 'TD', dial: '+235' },
  { flag: '🇨🇱', code: 'CL', dial: '+56' },
  { flag: '🇨🇳', code: 'CN', dial: '+86' },
  { flag: '🇨🇴', code: 'CO', dial: '+57' },
  { flag: '🇰🇲', code: 'KM', dial: '+269' },
  { flag: '🇨🇬', code: 'CG', dial: '+242' },
  { flag: '🇨🇩', code: 'CD', dial: '+243' },
  { flag: '🇨🇷', code: 'CR', dial: '+506' },
  { flag: '🇨🇮', code: 'CI', dial: '+225' },
  { flag: '🇭🇷', code: 'HR', dial: '+385' },
  { flag: '🇨🇺', code: 'CU', dial: '+53' },
  { flag: '🇨🇾', code: 'CY', dial: '+357' },
  { flag: '🇨🇿', code: 'CZ', dial: '+420' },
  { flag: '🇩🇰', code: 'DK', dial: '+45' },
  { flag: '🇩🇯', code: 'DJ', dial: '+253' },
  { flag: '🇩🇲', code: 'DM', dial: '+1767' },
  { flag: '🇩🇴', code: 'DO', dial: '+1809' },
  { flag: '🇪🇨', code: 'EC', dial: '+593' },
  { flag: '🇪🇬', code: 'EG', dial: '+20' },
  { flag: '🇸🇻', code: 'SV', dial: '+503' },
  { flag: '🇬🇶', code: 'GQ', dial: '+240' },
  { flag: '🇪🇷', code: 'ER', dial: '+291' },
  { flag: '🇪🇪', code: 'EE', dial: '+372' },
  { flag: '🇸🇿', code: 'SZ', dial: '+268' },
  { flag: '🇪🇹', code: 'ET', dial: '+251' },
  { flag: '🇫🇯', code: 'FJ', dial: '+679' },
  { flag: '🇫🇮', code: 'FI', dial: '+358' },
  { flag: '🇫🇷', code: 'FR', dial: '+33' },
  { flag: '🇬🇦', code: 'GA', dial: '+241' },
  { flag: '🇬🇲', code: 'GM', dial: '+220' },
  { flag: '🇬🇪', code: 'GE', dial: '+995' },
  { flag: '🇩🇪', code: 'DE', dial: '+49' },
  { flag: '🇬🇭', code: 'GH', dial: '+233' },
  { flag: '🇬🇷', code: 'GR', dial: '+30' },
  { flag: '🇬🇩', code: 'GD', dial: '+1473' },
  { flag: '🇬🇺', code: 'GU', dial: '+1671' },
  { flag: '🇬🇹', code: 'GT', dial: '+502' },
  { flag: '🇬🇳', code: 'GN', dial: '+224' },
  { flag: '🇬🇼', code: 'GW', dial: '+245' },
  { flag: '🇬🇾', code: 'GY', dial: '+592' },
  { flag: '🇭🇹', code: 'HT', dial: '+509' },
  { flag: '🇭🇳', code: 'HN', dial: '+504' },
  { flag: '🇭🇰', code: 'HK', dial: '+852' },
  { flag: '🇭🇺', code: 'HU', dial: '+36' },
  { flag: '🇮🇸', code: 'IS', dial: '+354' },
  { flag: '🇮🇳', code: 'IN', dial: '+91' },
  { flag: '🇮🇩', code: 'ID', dial: '+62' },
  { flag: '🇮🇷', code: 'IR', dial: '+98' },
  { flag: '🇮🇶', code: 'IQ', dial: '+964' },
  { flag: '🇮🇪', code: 'IE', dial: '+353' },
  { flag: '🇮🇱', code: 'IL', dial: '+972' },
  { flag: '🇮🇹', code: 'IT', dial: '+39' },
  { flag: '🇯🇲', code: 'JM', dial: '+1876' },
  { flag: '🇯🇴', code: 'JO', dial: '+962' },
  { flag: '🇰🇿', code: 'KZ', dial: '+7' },
  { flag: '🇰🇪', code: 'KE', dial: '+254' },
  { flag: '🇰🇮', code: 'KI', dial: '+686' },
  { flag: '🇰🇵', code: 'KP', dial: '+850' },
  { flag: '🇰🇷', code: 'KR', dial: '+82' },
  { flag: '🇰🇼', code: 'KW', dial: '+965' },
  { flag: '🇰🇬', code: 'KG', dial: '+996' },
  { flag: '🇱🇦', code: 'LA', dial: '+856' },
  { flag: '🇱🇻', code: 'LV', dial: '+371' },
  { flag: '🇱🇧', code: 'LB', dial: '+961' },
  { flag: '🇱🇸', code: 'LS', dial: '+266' },
  { flag: '🇱🇷', code: 'LR', dial: '+231' },
  { flag: '🇱🇾', code: 'LY', dial: '+218' },
  { flag: '🇱🇮', code: 'LI', dial: '+423' },
  { flag: '🇱🇹', code: 'LT', dial: '+370' },
  { flag: '🇱🇺', code: 'LU', dial: '+352' },
  { flag: '🇲🇴', code: 'MO', dial: '+853' },
  { flag: '🇲🇬', code: 'MG', dial: '+261' },
  { flag: '🇲🇼', code: 'MW', dial: '+265' },
  { flag: '🇲🇾', code: 'MY', dial: '+60' },
  { flag: '🇲🇻', code: 'MV', dial: '+960' },
  { flag: '🇲🇱', code: 'ML', dial: '+223' },
  { flag: '🇲🇹', code: 'MT', dial: '+356' },
  { flag: '🇲🇭', code: 'MH', dial: '+692' },
  { flag: '🇲🇷', code: 'MR', dial: '+222' },
  { flag: '🇲🇺', code: 'MU', dial: '+230' },
  { flag: '🇲🇽', code: 'MX', dial: '+52' },
  { flag: '🇫🇲', code: 'FM', dial: '+691' },
  { flag: '🇲🇩', code: 'MD', dial: '+373' },
  { flag: '🇲🇨', code: 'MC', dial: '+377' },
  { flag: '🇲🇳', code: 'MN', dial: '+976' },
  { flag: '🇲🇪', code: 'ME', dial: '+382' },
  { flag: '🇲🇦', code: 'MA', dial: '+212' },
  { flag: '🇲🇿', code: 'MZ', dial: '+258' },
  { flag: '🇳🇦', code: 'NA', dial: '+264' },
  { flag: '🇳🇷', code: 'NR', dial: '+674' },
  { flag: '🇳🇵', code: 'NP', dial: '+977' },
  { flag: '🇳🇱', code: 'NL', dial: '+31' },
  { flag: '🇳🇿', code: 'NZ', dial: '+64' },
  { flag: '🇳🇮', code: 'NI', dial: '+505' },
  { flag: '🇳🇪', code: 'NE', dial: '+227' },
  { flag: '🇳🇬', code: 'NG', dial: '+234' },
  { flag: '🇲🇰', code: 'MK', dial: '+389' },
  { flag: '🇳🇴', code: 'NO', dial: '+47' },
  { flag: '🇴🇲', code: 'OM', dial: '+968' },
  { flag: '🇵🇰', code: 'PK', dial: '+92' },
  { flag: '🇵🇼', code: 'PW', dial: '+680' },
  { flag: '🇵🇸', code: 'PS', dial: '+970' },
  { flag: '🇵🇦', code: 'PA', dial: '+507' },
  { flag: '🇵🇬', code: 'PG', dial: '+675' },
  { flag: '🇵🇾', code: 'PY', dial: '+595' },
  { flag: '🇵🇪', code: 'PE', dial: '+51' },
  { flag: '🇵🇭', code: 'PH', dial: '+63' },
  { flag: '🇵🇱', code: 'PL', dial: '+48' },
  { flag: '🇵🇹', code: 'PT', dial: '+351' },
  { flag: '🇵🇷', code: 'PR', dial: '+1787' },
  { flag: '🇶🇦', code: 'QA', dial: '+974' },
  { flag: '🇷🇴', code: 'RO', dial: '+40' },
  { flag: '🇷🇺', code: 'RU', dial: '+7' },
  { flag: '🇷🇼', code: 'RW', dial: '+250' },
  { flag: '🇰🇳', code: 'KN', dial: '+1869' },
  { flag: '🇱🇨', code: 'LC', dial: '+1758' },
  { flag: '🇻🇨', code: 'VC', dial: '+1784' },
  { flag: '🇼🇸', code: 'WS', dial: '+685' },
  { flag: '🇸🇲', code: 'SM', dial: '+378' },
  { flag: '🇸🇹', code: 'ST', dial: '+239' },
  { flag: '🇸🇦', code: 'SA', dial: '+966' },
  { flag: '🇸🇳', code: 'SN', dial: '+221' },
  { flag: '🇷🇸', code: 'RS', dial: '+381' },
  { flag: '🇸🇨', code: 'SC', dial: '+248' },
  { flag: '🇸🇱', code: 'SL', dial: '+232' },
  { flag: '🇸🇰', code: 'SK', dial: '+421' },
  { flag: '🇸🇮', code: 'SI', dial: '+386' },
  { flag: '🇸🇧', code: 'SB', dial: '+677' },
  { flag: '🇸🇴', code: 'SO', dial: '+252' },
  { flag: '🇿🇦', code: 'ZA', dial: '+27' },
  { flag: '🇸🇸', code: 'SS', dial: '+211' },
  { flag: '🇪🇸', code: 'ES', dial: '+34' },
  { flag: '🇱🇰', code: 'LK', dial: '+94' },
  { flag: '🇸🇩', code: 'SD', dial: '+249' },
  { flag: '🇸🇷', code: 'SR', dial: '+597' },
  { flag: '🇸🇪', code: 'SE', dial: '+46' },
  { flag: '🇨🇭', code: 'CH', dial: '+41' },
  { flag: '🇸🇾', code: 'SY', dial: '+963' },
  { flag: '🇹🇼', code: 'TW', dial: '+886' },
  { flag: '🇹🇯', code: 'TJ', dial: '+992' },
  { flag: '🇹🇿', code: 'TZ', dial: '+255' },
  { flag: '🇹🇱', code: 'TL', dial: '+670' },
  { flag: '🇹🇬', code: 'TG', dial: '+228' },
  { flag: '🇹🇴', code: 'TO', dial: '+676' },
  { flag: '🇹🇹', code: 'TT', dial: '+1868' },
  { flag: '🇹🇳', code: 'TN', dial: '+216' },
  { flag: '🇹🇷', code: 'TR', dial: '+90' },
  { flag: '🇹🇲', code: 'TM', dial: '+993' },
  { flag: '🇹🇻', code: 'TV', dial: '+688' },
  { flag: '🇺🇬', code: 'UG', dial: '+256' },
  { flag: '🇺🇦', code: 'UA', dial: '+380' },
  { flag: '🇦🇪', code: 'AE', dial: '+971' },
  { flag: '🇬🇧', code: 'GB', dial: '+44' },
  { flag: '🇺🇸', code: 'US', dial: '+1' },
  { flag: '🇺🇾', code: 'UY', dial: '+598' },
  { flag: '🇺🇿', code: 'UZ', dial: '+998' },
  { flag: '🇻🇺', code: 'VU', dial: '+678' },
  { flag: '🇻🇪', code: 'VE', dial: '+58' },
  { flag: '🇻🇳', code: 'VN', dial: '+84' },
  { flag: '🇾🇪', code: 'YE', dial: '+967' },
  { flag: '🇿🇲', code: 'ZM', dial: '+260' },
  { flag: '🇿🇼', code: 'ZW', dial: '+263' },
];

const inputCls =
  'bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm w-full focus:outline-none focus:border-gold-500/50 transition-colors placeholder:text-white/40';

export default function ContactContent() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', countryCode: '+66', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, phone: `${form.countryCode} ${form.phone}`, source: 'contact' }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setForm({ name: '', email: '', countryCode: '+66', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
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

          <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-8 sm:mb-12">
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

              <div className="flex gap-2">
                <select
                  value={form.countryCode}
                  onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-2 py-3 text-white text-sm focus:outline-none focus:border-gold-500/50 transition-colors w-25 shrink-0 appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2394A3B8' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
                >
                  {countryCodes.map((c) => (
                    <option key={c.code + c.dial} value={c.dial} className="bg-navy-900 text-white">
                      {c.flag} {c.dial}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder={t('contact.form.phone')}
                  value={form.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    if (val.length <= 15) setForm({ ...form, phone: val });
                  }}
                  minLength={7}
                  maxLength={15}
                  className={inputCls}
                />
              </div>

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
                <Button variant="primary" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : t('contact.form.submit')}
                </Button>
              </div>

              {status === 'sent' && (
                <p className="text-green-400 text-sm">Your message has been sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm">Failed to send. Please try again.</p>
              )}
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
                <p className="text-white/60 text-sm mt-2 leading-relaxed">
                  {t('contact.bangkok.address')}
                </p>
                <p className="text-white/60 text-sm mt-2">eaelitetradingthailand@gmail.com</p>
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
                  <p className="text-white/50 text-sm mt-2 italic leading-relaxed">
                    {t('contact.japan.address')}
                  </p>
                  <p className="text-white/60 text-sm mt-2">eaelitetradingjapan@gmail.com</p>
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
                  <p className="text-white/60 text-sm mt-2 leading-relaxed">
                    {t('contact.singapore.address')}
                  </p>
                  <p className="text-white/60 text-sm mt-2">eaelitetradingthailand@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
