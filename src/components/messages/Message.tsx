import { outAnimations } from '@/constants/animations';
import { randomAnimation } from '@/helpers/randomAnimation';
import useStore from '@/store/store';
import 'animate.css';
import React, { useEffect, useState } from 'react';

const Message: React.FC = () => {
  
  const { message } = useStore();
  const [animation, setAnimation] = useState(randomAnimation(outAnimations));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('Message: ', message);
    console.log('Animation: ', animation);
  }, [message, animation]);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setAnimation(randomAnimation(outAnimations));
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
  
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  return (
    isVisible ? (
      <div
        key={message}
        className={`absolute top-[30%] h-[5%] w-[100%] bg-[rgba(0,_0,_0,_0.4)] animate__animated ${animation} animate__delay-2s rounded-md shadow-[0_0_30px_30px_rgba(0,_0,_0,_0.4)]`}
        style={{ animationDuration: '2s' }}
      >
        <p className='text-6xl text-blue-600'>{message}</p>
      </div>
    ) : null
  );
};

export default Message;