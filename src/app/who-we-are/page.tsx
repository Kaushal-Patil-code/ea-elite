import type { Metadata } from 'next';
import WhoWeAreContent from './content';

export const metadata: Metadata = {
  title: 'Who We Are',
  description:
    'Learn about E.A. Elite Trading Group — our values, leadership, vision, and driving forces.',
};

export default function WhoWeArePage() {
  return <WhoWeAreContent />;
}
