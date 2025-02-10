import React from 'react';
import { Player } from '../../Interfaces/Player';

interface PlayerProps {
  player: Player;
}

const PlayerAvatar: React.FC<PlayerProps> = ({ player }) => {

  {/* Player Attributes wheel */}
  const getBorderStyle = (isBetrayer: boolean, maxHitpoints: number, hitpoints: number) => {

    const fixedDegreesStart = 0;
    const fixedDegreesEnd = 180;
    const totalDegrees = 360;

    const lifeTotalDegrees = totalDegrees - (fixedDegreesEnd - fixedDegreesStart);

    const life = Math.min(Math.max(hitpoints, 0), maxHitpoints);

    const lifeDegrees = (life / maxHitpoints) * lifeTotalDegrees;

    const bottomColor = isBetrayer ? 'black' : 'orange';
    return {

      background: `conic-gradient(
            from 90deg, /* Inicia el gradiente en 90 grados */
            ${bottomColor} ${fixedDegreesStart}deg,
            ${bottomColor}  ${fixedDegreesEnd}deg,
            red ${fixedDegreesEnd}deg ${fixedDegreesEnd + lifeDegrees}deg,
            gray ${fixedDegreesEnd + lifeDegrees}deg ${totalDegrees}deg
          )`,
    };
  };

  const frameSrc = player.isBetrayer
    ? '/images/dravocar_frame.webp'
    : '/images/kaotika_frame.webp';

  return (
    <div className="relative w-[60px] h-[60px] flex items-center justify-center">
      {/* HP Border Layer */}
      <div
        className="absolute rounded-full p-[2px] w-[50px] h-[48px] transition-all duration-500"
        style={getBorderStyle(player.isBetrayer, player.base_attributes.hit_points, player.attributes.hit_points)}
      />

      {/* Player Avatar */}
      <img
        src={player.avatar}
        alt={player.name}
        className="relative w-[40px] h-[40px] rounded-full object-cover"
      />

      {/* Frame Image Layer */}
      <img
        src={frameSrc}
        alt="Avatar Frame"
        className="absolute w-[80px] h-[80px] rounded-full object-cover"
      />
    </div>
  );
};

export default PlayerAvatar;
