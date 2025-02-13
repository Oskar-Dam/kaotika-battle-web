import { inAnimations } from '@/constants/animations';
import { randomAnimation } from '@/helpers/randomAnimation';
import { Player } from '@/Interfaces/Player';
import useStore from '@/store/store';
import { useEffect, useState } from 'react';
import RollMessage from '../messages/RollMessage';

interface Props {
    chances: {
        critical: number,
        fumble: number,
        normal: number,
        failed: number,
    }

    receivedValue: number;
    player: Player;
}

const PercentageBar: React.FC<Props> = ({chances, receivedValue, player}) => {
  const {setRollMessage, performingBarAnimation, setPerformingBarAnimation, attacker} = useStore();

  const [animation, setAnimation] = useState(randomAnimation(inAnimations));
  const [value, setValue] = useState<number>(-1);

  useEffect(() => {
    setPerformingBarAnimation(true);
  }, [performingBarAnimation]);

  useEffect(() => {
    if (performingBarAnimation) {
      let loops = 0;
      const interval = setInterval(() => {
        setValue((prevValue) => {
          if (prevValue === 101) {
            loops++;            
            return 0;
          }
          if (loops === 2) {
            return receivedValue;
          }
          return 101;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [performingBarAnimation, receivedValue]);

  useEffect(() => {
    if (value === receivedValue) {
      setRollMessage('Test your luck...');
      setAnimation('animate__pulse');
      const interval = setInterval(() => {
        setAnimation('animate__zoomOutUp');
        setRollMessage(`${attacker?.nickname} rolled a ${value}!`);
      } , 3000);
      return () => clearInterval(interval);
    }
  } , [value]);
  
  useEffect(() => {
    const triangle = document.getElementById('triangle');
    if (triangle) {
      triangle.style.transition = 'bottom 0.5s ease-in-out';
      triangle.style.bottom = `${value}%`;
    }
  }, [value]);

  return (
    <>
      {performingBarAnimation && player._id === attacker?._id ? (
        <>
          <div className={`animate__animated ${animation} w-[10%] h-[33vh] flex flex-col justify-end relative`}>
            <div className='absolute w-full bg-[rgba(0,_0,_0,_0.4)] h-[100%] shadow-[0_0_10px_10px_rgba(0,_0,_0,_0.4)]' />
            <div className='w-[150%] h-[99%] flex flex-col justify-end mx-auto'>
              <div className='relative w-full h-full'>
                <div
                  className={'absolute bottom-0 bg-[#8B0000] w-full'} 
                  style={{ height: `${chances.fumble}%` }}>
                </div>
                <div
                  className={'absolute bottom-0 bg-[#4B0082] w-full'}  
                  style={{ height: `${chances.failed}%`, bottom: `${chances.fumble}%` }}>
                </div>
                <div
                  className={'absolute bottom-0 bg-[#556B2F] w-full'} 
                  style={{ height: `${chances.normal}%`, bottom: `${chances.fumble + chances.failed}%` }}>
                </div>
                <div
                  className={'absolute bottom-0 bg-[#FFD700] w-full'} 
                  style={{ height: `${chances.critical}%`, bottom: `${chances.fumble + chances.failed + chances.normal}%` }}>
                </div>
                <div
                  id='triangle'
                  className=' w-[100%] h-[30px] absolute bottom-0 mb-[-15px] ml-[100%] rotate-90 z-10 '
                  style={{ bottom: `${value}%` }}
                >
                  <img 
                    src={'/images/skull_pointer.webp'}
                    className="w-full h-full object-cover"
                    alt="frame"
                  />
                  <div className='ml-[50%] border-l-[5px] border-l-black border-b-[20px] border-b-transparent '/>
                </div>
              </div>
            </div>
            <div className="absolute w-[60px] h-[110%] mb-[-160%] ml-[-100%]">
              <img 
                src={'/images/percentage_bar_frame.webp'}
                className="w-full h-full object-cover"
                alt="frame"
              />
            </div>
          </div>
          <RollMessage />
        </>
      ) : null}
    </>
  );
};


export default PercentageBar;