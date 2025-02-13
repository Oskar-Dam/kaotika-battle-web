import React from 'react';
import useStore from '../../store/store';
import PlayerAvatar from './PlayerAvatar';

type AvatarSize = 'small' | 'medium' | 'large';

const calculateGridConfig = (playerCount: number): { gridClass: string; size: AvatarSize } => {
  if (playerCount <= 6) return { gridClass: 'grid-cols-2', size: 'large' };
  if (playerCount <= 12) return { gridClass: 'grid-cols-5', size: 'medium' };
  return { gridClass: 'grid-cols-10', size: 'small' };
};

const Hud: React.FC = () => {
  const { players } = useStore();

  const kaotikaConfig = calculateGridConfig(players?.kaotika.length || 0);
  const dravokarConfig = calculateGridConfig(players?.dravokar.length || 0);

  return (
    <div>
      <div className="fixed overflow-x-hidden bottom-1 left-1/2 transform -translate-x-1/2 w-[102%] h-[25%] bg-[url('/images/hud-background.webp')] bg-cover bg-center shadow-lg p-2 flex items-stretch justify-between">
        {/* Kaotika Team */}
        <div className="flex flex-col items-center justify-start w-[50%]">
          <img
            src="/images/kaotika.webp"
            className="w-48 mb-1"
            alt="Kaotika Team"
          />
          <div className={`grid ${kaotikaConfig.gridClass} gap-1 content-start h-full overflow-y-auto scrollbar-hide`}>
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
        <div className="flex items-center justify-center space-x-1 w-[7%]">
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
        <div className="flex flex-col items-center justify-start w-[50%]">
          <img
            src={'/images/dravokar.webp'}
            className="w-48 mb-1"
            alt="Dravokar Team"
          />
          <div className={`grid ${dravokarConfig.gridClass} gap-1 content-start h-full overflow-y-auto scrollbar-hide`}>
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