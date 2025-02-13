import React, { useState, useEffect } from 'react';
import { Player } from '../../Interfaces/Player';

type AvatarSize = 'small' | 'medium' | 'large';

interface PlayerProps {
  player: Player;
  size: AvatarSize;
}

const SIZES: Record<AvatarSize, {
  container: string;
  border: string;
  avatar: string;
  frame: string;
}> = {
  small: {
    container: 'w-[51px] h-[51px]',
    border: 'w-[42px] h-[42px]',
    avatar: 'w-[35px] h-[35px]',
    frame: 'w-[65px] h-[65px]'
  },
  medium: {
    container: 'w-[71px] h-[71px]',
    border: 'w-[59px] h-[57px]',
    avatar: 'w-[49px] h-[49px]',
    frame: 'w-[91px] h-[91px]'
  },
  large: {
    container: 'w-[91px] h-[91px]',
    border: 'w-[76px] h-[74px]',
    avatar: 'w-[63px] h-[63px]',
    frame: 'w-[117px] h-[117px]'
  }
};

const PlayerAvatar: React.FC<PlayerProps> = ({ player, size = 'medium' }) => {
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

  const sizeClasses = SIZES[size];

  return (
    <>
      {player && 
        <div className={`relative flex items-center justify-center ${sizeClasses.container}`}>
          {/* HP Border Layer */}
          <div
            className={`absolute rounded-full p-[2px] transition-all duration-500 ${sizeClasses.border}`}
            style={borderStyle}
          />

          {/* Player Avatar */}
          <img
            loading='lazy'
            src={player.avatar}
            alt={player.name}
            className={`relative rounded-full object-cover ${sizeClasses.avatar}`}
          />

          {/* Frame Image Layer */}
          <img
            src={player.isBetrayer
              ? '/images/dravokar_frame.webp'
              : '/images/kaotika_frame.webp'}
            alt="Avatar Frame"
            className={`absolute rounded-full object-cover ${sizeClasses.frame}`}
          />
        </div>
      }
    </>
  );
};

export default PlayerAvatar;
