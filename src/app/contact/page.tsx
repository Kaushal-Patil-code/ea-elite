import type { Metadata } from 'next';
import ContactContent from './content';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact E.A. Elite Trading Group — Bangkok headquarters, Japan and Singapore offices.',
};

export default function ContactPage() {
  return <ContactContent />;
}
