import 'animate.css';
import React, { useState } from 'react';

const KaotikaLegendsLogo: React.FC = () => {
  const [animation, setAnimation] = useState('animate__zoomInDown');

  const handleAnimationEnd = () => {
    setAnimation('animate__pulse');
  };

  return (
    <div
      className={`animate__animated ${animation} h-full w-full flex flex-col justify-center items-center`}
      style={{ wordSpacing: '2rem' }}
      onAnimationEnd={handleAnimationEnd}>
      <div className='text-[2rem]'>
        <h1 style={{ color: 'rgb(205, 168, 130)' }}>LEGENDS</h1>
      </div>
      <div className='text-[1rem]'>
        <h1 style={{ color: 'rgb(205, 168, 130)' }}>of</h1>
      </div>
      <div className='text-[6rem]'>
        <h1>KA<span style={{ color: 'orange' }}>O</span>TIKA</h1>
      </div>
    </div>
  );
};

export default KaotikaLegendsLogo;
