import type { Metadata } from 'next';
import PlantationContent from './content';

export const metadata: Metadata = {
  title: 'Plantation',
  description:
    "Minn's Fresh Farm — premium strawberries, artisanal preserves, and strawberry wine from Myanmar.",
};

export default function PlantationPage() {
  return <PlantationContent />;
}
