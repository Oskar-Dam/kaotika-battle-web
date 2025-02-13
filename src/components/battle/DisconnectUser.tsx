import { timeConstant } from '@/constants/TimeConstants';
import 'animate.css';
import React, { useEffect, useState } from 'react';
import useStore from '../../store/store';

const DisconnectUser: React.FC = () => {
  const { disconnectedPlayer } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disconnectedPlayer) {
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, timeConstant.DISCONNECTED_PLAYER);
    }
  }, [disconnectedPlayer]);

  return (
    isVisible ? (
      <div
        key={disconnectedPlayer}
        className='absolute top-[30%] h-[5%] w-[60%] bg-[rgba(0,_0,_0,_0.4)] animate__animated animate__backOutUp animate__delay-2s rounded-md shadow-[0_0_30px_30px_rgba(0,_0,_0,_0.4)]'
        style={{ animationDuration: '2s' }}
      >
        <p className='text-5xl text-red-600'>{disconnectedPlayer} <span className='text-6xl'>has been disconnected!</span></p>
      </div>
    ) : null
  );
};

export default DisconnectUser;