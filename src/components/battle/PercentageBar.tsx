import useStore from '@/store/store';
import { useEffect, useState } from 'react';

interface Props {
    chances: {
        critical: number,
        fumble: number,
        normal: number,
        failed: number,
    }

    receivedValue: number;
}

const PercentageBar: React.FC<Props> = ({chances, receivedValue}) => {
  const {performingBarAnimation, setPerformingBarAnimation} = useStore();
  const [animation, setAnimation] = useState('animate__zoomInDown');
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setPerformingBarAnimation(true);
    console.log('performingBarAnimation', performingBarAnimation);
  }, [performingBarAnimation]);
  useEffect(() => {
    if (performingBarAnimation) {
      let loops = 0;
      const interval = setInterval(() => {
        setValue((prevValue) => {
          if (prevValue === 100) {
            loops++;            
            return 0;
          }
          if (loops === 2) {
            return receivedValue;
          }
          return 100;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [performingBarAnimation, receivedValue]);

  useEffect(() => {
    if (performingBarAnimation) {
      const animations = ['animate__zoomInDown', 'animate__zoomInUp', 'animate__zoomInLeft', 'animate__zoomInRight'];
      const randomIndex = Math.floor(Math.random() * animations.length);
      setAnimation(animations[randomIndex]);
    }
  } , [performingBarAnimation]);

  useEffect(() => {
    if (value === receivedValue) {
      const interval = setInterval(() => {
        setAnimation('animate__zoomOutUp');
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
      {performingBarAnimation ? (
        <>
          <div className={`animate__animated ${animation} w-[10%] h-[33vh] flex flex-col justify-end relative`}>
            <div className='absolute w-full rounded-[100%] bg-[rgba(0,_0,_0,_0.4)] h-[30%] shadow-[0_0_10px_10px_rgba(0,_0,_0,_0.4)]' />
            <div className='w-full h-full flex flex-col'>
              <div className='relative w-full h-full'>
                <div
                  className={'absolute bottom-0 bg-red-500 w-full'}
                  style={{ height: `${chances.critical}%` }}>
                  <p>{receivedValue}</p>
                </div>
                <div
                  className={'absolute bottom-0 bg-blue-500 w-full'}
                  style={{ height: `${chances.normal}%`, bottom: `${chances.critical}%` }}>
                </div>
                <div
                  className={'absolute bottom-0 bg-green-500 w-full'}
                  style={{ height: `${chances.failed}%`, bottom: `${chances.critical + chances.normal}%` }}>
                </div>
                <div
                  className={'absolute bottom-0 bg-yellow-500 w-full'}
                  style={{ height: `${chances.fumble}%`, bottom: `${chances.critical + chances.normal + chances.failed}%` }}>
                </div>
                <div
                  id='triangle'
                  className='mb-[-10px] absolute left-full w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-white'
                  style={{ bottom: `${value}%` }}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};


export default PercentageBar;