import React from 'react';
import useStore from '../../store/store';
import PlayerAvatar from './PlayerAvatar';

const Hud: React.FC = () => {
  const { players } = useStore();

  return (
    <div>
      <div className="fixed overflow-x-hidden bottom-1 left-1/2 transform -translate-x-1/2 w-[102%] h-[23%] bg-[url('/images/hud-background.webp')] bg-cover bg-center shadow-lg p-2 flex items-stretch justify-between">
        
        {/* Kaotika Team */}
        <div className="flex flex-col items-center justify-start w-[50%]">
          <img
            src={'/images/kaotika.webp'}
            className="w-48 mb-1" />
          <div className="flex flex-wrap justify-center content-start h-full overflow-y-auto scrollbar-hide">
            {players?.kaotika.map((player, index) => (
              <div
                key={index}
                className="m-0.5">
                <PlayerAvatar player={player} />
              </div>
            ))}
          </div>
        </div>

        {/* Divider Image */}
        <div className="flex items-center justify-center w-[2%]">
          <img
            src={'/images/left_separator.webp'}
            className="h-36"
            alt="Separator" />
        </div>

        {/* VS Section */}
        <div className="flex items-center justify-center w-[3%]">
          <img
            src={'/images/vs.webp'}
            className="w-11" />
        </div>

        {/* Divider Image */}
        <div className="flex items-center justify-center w-[2%]">
          <img
            src={'/images/right_separator.webp'}
            className="h-36"
            alt="Separator" />
        </div>

        {/* Dravocar Team */}
        <div className="flex flex-col items-center justify-start w-[50%] p-1">
          <img
            src={'/images/dravocar.webp'}
            className="w-48 mb-1" />
          <div className="flex flex-wrap justify-center content-start h-full overflow-y-auto scrollbar-hide">
            {players?.dravocar.map((player, index) => (
              <div
                key={index}
                className="m-0.5">
                <PlayerAvatar player={player} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hud;