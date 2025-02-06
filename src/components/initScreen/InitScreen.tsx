import 'animate.css';
import { useEffect, useState } from 'react';
import InitCharacter from './InitCharacter';
import KaotikaLegendsLogo from './KaotikaLengedsLogo';
import warrior from '/images/warrior_1_1.png';

interface InitScreenInterface {
  // eslint-disable-next-line no-unused-vars
  setAnimationFinished: (value: boolean) => void;
}

const InitScreen: React.FC<InitScreenInterface> = ({setAnimationFinished}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      
      setAnimationFinished(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const animations : string[] = [
    'animate__backInLeft',
    'animate__backInLeft transform scale-x-[-1]',
  ];

  const styles : string[] = [
    '',
    'transform scale-x-[-1]'
  ];

  return (
    <div className="w-screen h-screen bg-[url('/images/battle_bg.webp')] bg-no-repeat bg-cover overflow-hidden max-h-full">
      {loaded ? null : (
        <div className='absolute top-50 overflow-hidden'>
          <div className='flex w-[100%] p-10 items-center h-full justify-center'>
            {
              animations.map((animation, i)=> (
                <InitCharacter
                  key={i}
                  character={warrior}
                  styleClass={styles[i]}
                  animate={animation}
                  setLoaded={setLoaded}
                />
              ))
            }
          </div>
        </div>
      )}
    
      {loaded ? (
        <KaotikaLegendsLogo/>
      ) : null}
    </div>
  );
};

export default InitScreen;