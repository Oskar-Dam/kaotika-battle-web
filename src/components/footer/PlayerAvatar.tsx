import React, { useState, useEffect } from 'react';
import { Player } from '../../Interfaces/Player';

interface PlayerProps {
  player: Player;
}

const PlayerAvatar: React.FC<PlayerProps> = ({ player }) => {
  const [currentHp, setCurrentHp] = useState(player.attributes.hit_points);
  const [borderStyle, setBorderStyle] = useState({});

  const calculateBorderStyle = (isBetrayer: boolean, maxHitpoints: number, hitpoints: number) => {
    const fixedDegreesStart = 0;
    const fixedDegreesEnd = 180;
    const totalDegrees = 360;

    const lifeTotalDegrees = totalDegrees - (fixedDegreesEnd - fixedDegreesStart);

    const life = Math.min(Math.max(hitpoints, 0), maxHitpoints);

    const lifeDegrees = (life / maxHitpoints) * lifeTotalDegrees;

    const bottomColor = isBetrayer ? 'black' : 'orange';
    
    return {

      background: `conic-gradient(
        from 90deg,
        ${bottomColor} ${fixedDegreesStart}deg,
        ${bottomColor}  ${fixedDegreesEnd}deg,
        red ${fixedDegreesEnd}deg ${fixedDegreesEnd + lifeDegrees}deg,
        gray ${fixedDegreesEnd + lifeDegrees}deg ${totalDegrees}deg
      )`,
    };
  };

  useEffect(() => {
    if (currentHp !== player.attributes.hit_points) {
      setCurrentHp(player.attributes.hit_points);
    }
  }, [player.attributes.hit_points]);

  useEffect(() => {
    const newStyle = calculateBorderStyle(player.isBetrayer,
      player.base_attributes.hit_points,
      currentHp);
    setBorderStyle(newStyle);
  }, [currentHp, player.isBetrayer, player.base_attributes.hit_points]);

  return (
    <>
      {player &&
        <div className="relative w-[71px] h-[71px] flex items-center justify-center">
          {/* HP Border Layer */}
          <div
            className="absolute rounded-full p-[2px] w-[59px] h-[57px] transition-all duration-500"
            style={borderStyle}
          />

          {/* Player Avatar */}
          <img
            loading='lazy'
            src={player.avatar}
            alt={player.name}
            className="relative w-[49px] h-[49px] rounded-full object-cover"
          />

          {/* Frame Image Layer */}
          <img
            src={player.isBetrayer
              ? '/images/dravocar_frame.webp'
              : '/images/kaotika_frame.webp'}
            alt="Avatar Frame"
            className="absolute w-[91px] h-[91px] rounded-full object-cover"
          />
        </div>
      }
    </>
  );
};

export default PlayerAvatar;
