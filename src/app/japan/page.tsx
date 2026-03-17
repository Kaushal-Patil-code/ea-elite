import type { Metadata } from 'next';
import JapanContent from './content';

export const metadata: Metadata = {
  title: 'Japan Expansion',
  description:
    'E.A. Elite Japan market expansion — partnerships, investment, and B2B opportunities.',
};

export default function JapanPage() {
  return <JapanContent />;
}
