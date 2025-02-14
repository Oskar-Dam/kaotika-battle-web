import useStore from '@/store/store';
import { Player } from '../../Interfaces/Player';
import LeftPlayerLifeBar from './LeftPlayerLifeBar';

interface LeftPlayerAttributesInterface {
  player: Player;
}

const LeftPlayerAttributes: React.FC<LeftPlayerAttributesInterface> = ({ player }) => {
  const { finishTurn, changeLeftPlayerAnimation } = useStore();

  return (
    <div className="flex flex-col justify-items-start items-start h-[60%] w-[27%] ml-[2.6%] mt-[1.8%] pr-[0.1%] pl-[0.4%]">

      {/* Left Player Life Bar */}
      {player && !finishTurn && !changeLeftPlayerAnimation ? (
        <LeftPlayerLifeBar
          maxHitpoints={player.base_attributes.hit_points}
          hitpoints={player.attributes.hit_points}
          hitpointsToShow={`${player.attributes.hit_points}/${player.base_attributes.hit_points}`} />
      ) : <LeftPlayerLifeBar
        maxHitpoints={1}
        hitpoints={0}
        hitpointsToShow={player ? `${player.attributes.hit_points}/${player.base_attributes.hit_points}` : ''} />}

      {player ? (
        <div className={`flex h-full w-[65%] items-center justify-center text-3xl z-20 pb-[6%] animate__animated ${finishTurn || changeLeftPlayerAnimation ? 'animate__fadeOut' : 'animate__zoomIn'}`}>
          {player.nickname}
        </div>
      ) : <div className="flex h-full w-[65%] items-center justify-center text-3xl z-20 pb-[6%]"></div>}
    </div>
  );
};

export default LeftPlayerAttributes;