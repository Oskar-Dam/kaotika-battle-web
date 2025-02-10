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
    
  const [animation, setAnimation] = useState('animate__zoomInDown');
  const [value, setValue] = useState<number>(0);
  const [perfomingAnimation, setPerforminAnimation] = useState<boolean>(true);
  useEffect(() => {
    if (perfomingAnimation) {
      let loopCount = 0;
      const interval = setInterval(() => {
        setValue((prevValue) => {
          if (prevValue === 100) {
            loopCount++;
            if (loopCount >= 3) {
              setPerforminAnimation(false);
              clearInterval(interval);
              return receivedValue;
            }
            return 0;
          }
          return prevValue + 1;
        });
      }, 10); // Adjust the interval time as needed
      return () => clearInterval(interval);
    }
  }, [perfomingAnimation, receivedValue]);

  useEffect(() => {
    setAnimation('animate__pulse');
  }, []);

  useEffect(() => {
    const triangle = document.getElementById('triangle');
    if (triangle) {
      triangle.style.transition = 'bottom 2s ease-in-out';
      triangle.style.bottom = `${receivedValue}%`;
    }
  }, [receivedValue]);

  return (
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
  );
};


export default PercentageBar;