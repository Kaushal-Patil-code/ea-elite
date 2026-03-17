import type { Metadata } from 'next';
import GroupContent from './content';

export const metadata: Metadata = {
  title: 'Our Group',
  description:
    'Explore the E.A. Elite Trading Group companies across Thailand, Japan, Singapore, and beyond.',
};

export default function GroupPage() {
  return <GroupContent />;
}
