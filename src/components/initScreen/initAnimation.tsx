import { useEffect, useState } from 'react';
import KaotikaLegendsLogo from './KaotikaLengedsLogo';
import FireAnimation from './fire/initFire';
import { motion } from 'framer-motion';

interface InitScreenInterface {
  // eslint-disable-next-line no-unused-vars
  setAnimationFinished: (value: boolean) => void;
}

const warriorImages = [
  '/images/warrior_1_1.png',
  '/images/warrior_1_2.png',
  '/images/warrior_1_3.png',
  '/images/warrior_1_4.png',
  '/images/warrior_2_1.png',
  '/images/warrior_2_2.png',
  '/images/warrior_2_3.png',
  '/images/warrior_2_4.png',
];

const InitAltScreen: React.FC<InitScreenInterface> = ({setAnimationFinished}) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showMagicEffects, setShowMagicEffects] = useState(true);
  const [showCharacters, setShowCharacters] = useState(true);

  useEffect(() => {
    const magicTimer = setTimeout(() => setShowMagicEffects(true), 3000);
    const fadeInTimer = setTimeout(() => setFadeIn(true), 100);
    const CharactersTimer = setTimeout(() => setShowCharacters(false), 6000);
    const logoTimer = setTimeout(() => setShowLogo(true), 5000);
    const completionTimer = setTimeout(() => {
      setAnimationFinished(true);
    }, 10000);

    return () => {
      clearTimeout(magicTimer);
      clearTimeout(fadeInTimer);
      clearTimeout(CharactersTimer);
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

      {showCharacters && (
        <div className="absolute inset-0 flex items-center justify-center">
          {warriorImages.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              className="absolute object-contain"
              initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.3, 1.8],
                x: Math.random() > 0.5 ? 600 : -600,
                y: Math.random() * 100 - 50
              }}
              transition={{
                duration: 2,
                delay: index * 0.5,
                ease: 'easeInOut'
              }}
            />
          ))}
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
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
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