import { useEffect, useState, useRef } from 'react';
import FireRenderer from './fire/fireRender';
import KaotikaLegendsLogo from './KaotikaLengedsLogo';

interface InitScreenInterface {
  // eslint-disable-next-line no-unused-vars
  setAnimationFinished: (value: boolean) => void;
}

const InitAltScreen: React.FC<InitScreenInterface> = ({ setAnimationFinished }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showFinalBackground, setShowFinalBackground] = useState(false);
  const [backgroundBlur, setBackgroundBlur] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null, null]);

  const videos = [
    '/videos/swamp.webm',
    '/videos/dravokar.webm',
    '/videos/acolytes_marching.webm',
    '/videos/final_battle.mp4'
  ];

  useEffect(() => {
    const fadeInTimer = setTimeout(() => setFadeIn(true), 100);
    
    let totalTime = 0;
    
    const phaseTimers = [
      setTimeout(() => setCurrentPhase(1), totalTime += 600),  
      setTimeout(() => setCurrentPhase(2), totalTime += 4500),
      setTimeout(() => setCurrentPhase(3), totalTime += 5500),
      setTimeout(() => {
        setCurrentPhase(4);
      }, totalTime += 2000)
    ];

    const finalBackgroundTimer = setTimeout(() => {
      setShowFinalBackground(true);
    }, totalTime += 2000);

    const logoTimer = setTimeout(() => {
      setShowLogo(true);
      setBackgroundBlur(true);
    }, totalTime + 500);

    const completionTimer = setTimeout(() => {
      setAnimationFinished(true);
    }, totalTime + 4000);

    return () => {
      clearTimeout(fadeInTimer);
      phaseTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(finalBackgroundTimer);
      clearTimeout(logoTimer);
      clearTimeout(completionTimer);
    };
  }, [setAnimationFinished]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 z-50 ${
          fadeIn ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {videos.map((video, index) => (
        <div
          key={video}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentPhase === index + 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <video
            ref={el => videoRefs.current[index] = el}
            className="w-full h-full object-cover"
            src={video}
            autoPlay
            muted
            playsInline
            loop
          />
        </div>
      ))}

      <div 
        className={`absolute inset-0 bg-[url('/load_bg.webp')] bg-cover bg-center transition-all duration-1000 ${
          showFinalBackground ? 'opacity-100' : 'opacity-0'
        } ${backgroundBlur ? 'blur-sm' : ''}`}
      />


      <div className="absolute top-0 w-full h-[15vh] bg-black z-10" />
      <div className="absolute bottom-0 w-full h-[15vh] bg-black z-10" />

      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity backdrop-blur-lg duration-2000 z-20 ${
          showLogo ? 'opacity-100' : 'opacity-0'
        }`}>
        <FireRenderer />
        <KaotikaLegendsLogo />
      </div>

    </div>
  );
};

export default InitAltScreen;