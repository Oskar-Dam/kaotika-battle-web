import React from 'react';
import useStore from '../../store/store';
import potion from '/images/potion.png';
import potion_disabled from '/images/potion_disabled.png';

const PotionContainer: React.FC = () => {
  const { attacker, finishTurn } = useStore();
  const betrayer = attacker?.isBetrayer;
  const attackerPotions = Object.entries(attacker!.equipment).filter(([key]) => key != 'weapon');

  if (attacker) {
    return (
      <div className={`flex h-full w-1/12 justify-center items-center ${betrayer ? 'ml-auto' : 'mr-auto'}`}>
        <div className='flex flex-col'>
          {attackerPotions.map((_, i) => (
            <div
              key={i}
              className='relative flex flex-col items-center'>
              <img
                className={`w-full p-[3%_15%] animate__animated ${betrayer ? 'animate__backInRight' : 'animate__backInLeft'} ${betrayer && finishTurn && 'animate__zoomOutRight'} ${!betrayer && finishTurn && 'animate__zoomOutLeft'}`}
                src={attackerPotions[i][1] != null ? potion : potion_disabled}
                draggable='false' />
            </div>
          ))}
        </div>
      </div >
    );
  }
};

export default PotionContainer;