import type { Metadata } from 'next';
import TradingContent from './content';

export const metadata: Metadata = {
  title: 'Trading',
  description: 'E.A. Elite Trading — agriculture, seafood, and minerals trading across Asia.',
};

export default function TradingPage() {
  return <TradingContent />;
}
