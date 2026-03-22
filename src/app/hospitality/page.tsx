import type { Metadata } from 'next';
import HospitalityContent from './content';

export const metadata: Metadata = {
  title: 'Hospitality',
  description: 'E.A. Elite hospitality division — budget hotels, coffee shops, and restaurant partnerships.',
};

export default function HospitalityPage() {
  return <HospitalityContent />;
}
