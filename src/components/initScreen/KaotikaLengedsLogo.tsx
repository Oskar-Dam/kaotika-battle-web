import React, { useState } from 'react';
import 'animate.css';

const KaotikaLegendsLogo: React.FC = () => {
  const [animation, setAnimation] = useState('animate__zoomInDown');

  const handleAnimationEnd = () => {
    setAnimation('animate__pulse');
  };

  return (
    <div
      className={`animate__animated ${animation} text-[8rem] h-full w-full flex justify-center items-center backdrop-blur-xs`}
      style={{ wordSpacing: '2rem', color: 'white' }}
      onAnimationEnd={handleAnimationEnd}>
      LEGENDS OF KA<span style={{ color: 'orange' }}>O</span>TIKA
    </div>
  );
};

export default KaotikaLegendsLogo;
