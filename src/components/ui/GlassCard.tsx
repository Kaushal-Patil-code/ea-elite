import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: Props) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      {children}
    </div>
  );
}
