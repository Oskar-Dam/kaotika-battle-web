import { useEffect, useState } from 'react';
import KaotikaLegendsLogo from './KaotikaLengedsLogo';
import FireAnimation from './fire/initFire';

interface InitScreenInterface {
  // eslint-disable-next-line no-unused-vars
  setAnimationFinished: (value: boolean) => void;
}

const InitAltScreen: React.FC<InitScreenInterface> = ({setAnimationFinished}) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showMagicEffects, setShowMagicEffects] = useState(true);

  useEffect(() => {
    const magicTimer = setTimeout(() => setShowMagicEffects(true), 3000);
    const fadeInTimer = setTimeout(() => setFadeIn(true), 100);
    const logoTimer = setTimeout(() => setShowLogo(true), 5000);
    const completionTimer = setTimeout(() => {
      setAnimationFinished(true);
    }, 10000);

    return () => {
      clearTimeout(magicTimer);
      clearTimeout(fadeInTimer);
      clearTimeout(logoTimer);
      clearTimeout(completionTimer);
    };
  }, [setAnimationFinished]);


  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {showMagicEffects && (
        <div className="absolute inset-0">
          {
            <FireAnimation/>
          }
        </div>
      )}

      <div
        className={`absolute inset-0 bg-black transition-opacity duration-[3000ms] ${
          fadeIn ? 'opacity-0' : 'opacity-100'
        }`}
      />
        
      <div 
        className={`absolute inset-0 bg-[url('/images/load_bg.webp')] bg-cover bg-center transition-opacity duration-[3000ms] ${
          fadeIn ? 'opacity-50' : 'opacity-0'
        }`}
      >


        
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity backdrop-blur-lg duration-1000 ${
            showLogo ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <KaotikaLegendsLogo/>
        </div>
      </div>
    </div>
  );
};

export default InitAltScreen;