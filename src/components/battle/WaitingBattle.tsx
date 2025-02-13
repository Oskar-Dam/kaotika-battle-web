import React from 'react';

const WaitingBattle: React.FC = () => {
  return (
    <div className='text-[6rem] absolute h-full w-full z-50 flex justify-center items-center'>
      <div className="bg-[url('/images/border.webp')] bg-no-repeat bg-[length:100%] p-[3%] bg-center animate-pulse">
        <p>Waiting Mortimer to start the battle!</p>
      </div>
    </div>
  );
};

export default WaitingBattle;