import React, { useState, useEffect } from 'react';
import HomeMobile from './HomeMobile';
import HomeDesktop from './HomeDesktop';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <HomeMobile /> : <HomeDesktop />;
}