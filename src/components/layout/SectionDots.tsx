'use client';

import { useNavigation } from '@/context/NavigationContext';

interface Section {
  id: string;
  label: string;
}

interface Props {
  sections: Section[];
}

export default function SectionDots({ sections }: Props) {
  const { activeSection } = useNavigation();

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-3"
            aria-label={section.label}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                isActive
                  ? 'bg-gold-500 border-gold-500 shadow-[0_0_8px_rgba(197,165,90,0.5)]'
                  : 'border-gold-500/40 bg-transparent group-hover:border-gold-500'
              }`}
            />
            <span
              className={`text-[10px] tracking-wider uppercase transition-all duration-300 ${
                isActive
                  ? 'text-gold-500 opacity-100'
                  : 'text-white/0 group-hover:text-white/70 opacity-0 group-hover:opacity-100'
              }`}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
