'use client';

import { useLanguage } from '@/context/LanguageContext';

interface Props {
  labelKey: string;
}

export default function SectionTag({ labelKey }: Props) {
  const { t } = useLanguage();

  return (
    <div className="section-tag">
      <span>{t(labelKey)}</span>
    </div>
  );
}
