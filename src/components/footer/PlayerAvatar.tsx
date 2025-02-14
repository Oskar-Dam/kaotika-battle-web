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
  skull: string;
}> = {
  small: {
    container: 'w-8 h-8',
    border: 'w-[82%] h-[82%]',
    avatar: 'w-[68%] h-[68%]',
    frame: 'w-[127%] h-[127%]',
    skull: 'w-[50%] h-[50%]'
  },
  medium: {
    container: 'w-14 h-14',
    border: 'w-[87%] h-[87%]',
    avatar: 'w-[73%] h-[73%]',
    frame: 'w-[131%] h-[131%]',
    skull: 'w-[55%] h-[55%]'
  },
  large: {
    container: 'w-20 h-20',
    border: 'w-[89%] h-[89%]',
    avatar: 'w-[75%] h-[75%]',
    frame: 'w-[134%] h-[134%]',
    skull: 'w-[60%] h-[60%]'
  }
};

const PlayerAvatar: React.FC<PlayerProps> = ({ player, size = 'medium' }) => {
  const [currentHp, setCurrentHp] = useState(player.attributes.hit_points);
  const [isDead, setIsDead] = useState(player.attributes.hit_points <= 0);
  const [borderStyle, setBorderStyle] = useState({});

  const calculateBorderStyle = (maxHitpoints: number, hitpoints: number) => {
    const life = Math.min(Math.max(hitpoints, 0), maxHitpoints);
    const healthPercentage = (life / maxHitpoints) * 360;

    return {

      background: `conic-gradient(
        from 90deg,
        red 0deg ${healthPercentage}deg,
        gray ${healthPercentage}deg 360deg
      )`,
    };
  };

  useEffect(() => {
    if (currentHp !== player.attributes.hit_points) {
      setCurrentHp(player.attributes.hit_points);
      setIsDead(player.attributes.hit_points <= 0);
    }
  }, [player.attributes.hit_points]);

  useEffect(() => {
    const newStyle = calculateBorderStyle(player.base_attributes.hit_points,
      currentHp);
    setBorderStyle(newStyle);
  }, [currentHp, player.base_attributes.hit_points]);

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
            className={`relative rounded-full object-cover transition-all duration-300 ${sizeClasses.avatar} ${isDead ? 'grayscale brightness-50' : ''}`}
          />

          {/* Frame Image Layer */}
          <img
            src={player.isBetrayer
              ? '/images/dravokar_frame.webp'
              : '/images/kaotika_frame.webp'}
            alt="Avatar Frame"
            className={`absolute rounded-full object-cover ${sizeClasses.frame}`}
          />

          {/* Skull Overlay */}
          {isDead && (
            <img
              src="/images/skull_pointer.webp"
              alt="Death Marker"
              className={`absolute z-10 object-contain ${sizeClasses.skull}`}
            />
          )}
        </div>
      }
    </>
  );
};

export default PlayerAvatar;
