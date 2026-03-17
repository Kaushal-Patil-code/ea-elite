import HeroSection from '@/components/home/HeroSection';
import MissionSection from '@/components/home/MissionSection';
import DivisionCarousel from '@/components/home/DivisionCarousel';
import StatsCounter from '@/components/home/StatsCounter';
import JapanCTA from '@/components/home/JapanCTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <DivisionCarousel />
      <StatsCounter />
      <JapanCTA />
    </>
  );
}
