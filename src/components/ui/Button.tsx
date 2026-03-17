import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  href,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
}: Props) {
  const base = 'inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-medium tracking-wide rounded-full transition-all duration-300';
  const variants = {
    primary: 'bg-gold-500 text-navy-900 hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(197,165,90,0.3)]',
    secondary: 'border border-gold-500/30 text-gold-500 hover:bg-gold-500/10 hover:border-gold-500/60',
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
