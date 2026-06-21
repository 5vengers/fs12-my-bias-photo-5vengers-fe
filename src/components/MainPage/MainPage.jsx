'use client';

import HeroSection from './Sections/HeroSection';
import PointSection from './Sections/PointSection';
import NotificationSection from './Sections/NotificationSection';
import RandomBoxSection from './Sections/RandomBoxSection';
import FooterCTASection from './Sections/FooterCTASection';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <PointSection />
      <NotificationSection />
      <RandomBoxSection />
      <FooterCTASection />
    </div>
  );
};

export default MainPage;
