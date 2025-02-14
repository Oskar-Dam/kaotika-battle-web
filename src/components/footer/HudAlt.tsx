import React from 'react';
import useStore from '../../store/store';
import PlayerAvatar from './PlayerAvatar';

type AvatarSize = 'small' | 'medium' | 'large';

const calculateGridConfig = (playerCount: number): { gridClass: string; size: AvatarSize } => {
  if (playerCount <= 6) return { gridClass: 'grid-cols-3', size: 'large' };
  if (playerCount <= 48) return { gridClass: 'grid-cols-16', size: 'medium' };
  return { gridClass: 'grid-cols-30', size: 'small' };
};

const Hud: React.FC = () => {
  const { players } = useStore();

  const kaotikaConfig = calculateGridConfig(players?.kaotika.length || 0);
  const dravokarConfig = calculateGridConfig(players?.dravokar.length || 0);

  return (
    <div>
      <div className="fixed overflow-x-hidden bottom-1 left-1/2 transform -translate-x-1/2 w-[102%] h-[25%] bg-[url('/images/hud-background.webp')] bg-cover bg-center shadow-lg p-2 flex items-stretch justify-between">
        {/* Kaotika Team */}
        <div className="flex flex-col items-center justify-start w-[50%] relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48">
            <img
              src="/images/kaotika.webp"
              className="w-full"
              alt="Kaotika Team"
            />
          </div>
          <div className={`grid ${kaotikaConfig.gridClass} gap-[4px] content-start h-full w-full mt-12`}>
            {players?.kaotika.map((player, index) => (
              <div
                key={index}
                className="flex items-center justify-center">
                <PlayerAvatar
                  player={player}
                  size={kaotikaConfig.size} />
              </div>
            ))}
          </div>
        </div>

        {/* Center Section */}
        <div className="flex items-center justify-center w-[5%] border">
          <img
            src={'/images/left_separator.webp'}
            className="h-36"
            alt="Left Separator" />
          <img
            src={'/images/vs.webp'}
            className="w-11"
            alt="VS" />
          <img
            src={'/images/right_separator.webp'}
            className="h-36"
            alt="Right Separator" />
        </div>

        {/* Dravokar Team */}
        <div className="flex flex-col items-center justify-start w-[50%] relative border">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 border">
            <img
              src={'/images/dravokar.webp'}
              className="w-full"
              alt="Dravokar Team"
            />
          </div>
          <div className={`grid ${dravokarConfig.gridClass} gap-[4px] content-start h-[100%] w-[98%] mt-13 border`}>
            {players?.dravokar.map((player, index) => (
              <div
                key={index}
                className="flex items-center justify-center">
                <PlayerAvatar
                  player={player}
                  size={dravokarConfig.size} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hud;