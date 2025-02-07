import 'animate.css';
import React, { useEffect, useState } from 'react';
import useStore from '../../store/store';

const DisconnectUser: React.FC = () => {
  const { disconnectedPlayer } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disconnectedPlayer) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [disconnectedPlayer]);

  return (
    isVisible ? (
      <div
        key={disconnectedPlayer}
        className='flex flex-col absolute top-[30%] h-[5%] w-[40%] bg-[#00000050] justify-center animate__animated animate__backOutUp animate__delay-2s rounded-md'
        style={{ animationDuration: '2s', textShadow:'3px 3px 3px black', boxShadow: '0 0 60px black' }}
      >
        <p className='text-5xl text-red-600'>{disconnectedPlayer} <span className='text-6xl'>has been disconnected!</span></p>
      </div>
    ) : null
  );
};

export default DisconnectUser;