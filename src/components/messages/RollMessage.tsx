import { outAnimations } from '@/constants/animations';
import { randomAnimation } from '@/helpers/randomAnimation';
import useStore from '@/store/store';
import 'animate.css';
import React, { useEffect, useState } from 'react';

const RollMessage: React.FC = () => {
  
  const { rollMessage, attacker } = useStore();
  const [animation, setAnimation] = useState(randomAnimation(outAnimations));
  const [isVisible, setIsVisible] = useState(false);
  const [transform, setTransform] = useState('transform scale-x-[1]');

  useEffect(() => {
    if (rollMessage) {
      setIsVisible(true);
      setAnimation(randomAnimation(outAnimations));
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
  
      return () => clearTimeout(timer);
    }
  }, [rollMessage]);
  
  useEffect(() => {
    if (attacker?.isBetrayer) {
      setTransform('transform scale-x-[-1]');
    } else {
      setTransform('transform scale-x-[1]');
    }
  }, [attacker]);

  return (
    isVisible ? (
      <div
        key={rollMessage}
        className={`${transform} absolute border ml-[20%] top-[35%] w-[20%] bg-[rgba(0,_0,_0,_0.4)] animate__animated ${animation} animate__delay-2s rounded-md shadow-[0_0_30px_30px_rgba(0,_0,_0,_0.4)]`}
        style={{ animationDuration: '2s' }}
      >
        <p className='text-4xl text-blue-600'>{rollMessage}</p>
      </div>
    ) : null
  );
};

export default RollMessage;