import useStore from '@/store/store';
import { Player } from '../../Interfaces/Player';
import RightPlayerLifeBar from './RightPlayerLifeBar';

interface RightPlayerAttributesInterface {
  player: Player;
}

const RightPlayerAttributes: React.FC<RightPlayerAttributesInterface> = ({ player }) => {
  const { finishTurn, changeRightPlayerAnimation } = useStore();
  
  return (
    <div className="flex flex-col justify-items-start items-start h-[60%] w-[27%] mr-[2.5%] mt-[1.8%] rounded-md">

      {/* Right Player Life Bar */}
      {player && !finishTurn && !changeRightPlayerAnimation ? (
        <RightPlayerLifeBar
          maxHitpoints={player.base_attributes.hit_points}
          hitpoints={player.attributes.hit_points} />
      ) : <RightPlayerLifeBar
        maxHitpoints={1}
        hitpoints={0} />}

      {player ? (
        <div className={`flex h-full w-[65%] ml-auto rounded-md items-center justify-center text-3xl z-20 pb-[6%] animate__animated ${finishTurn || changeRightPlayerAnimation ? 'animate__fadeOut' : 'animate__zoomIn'}`}>
          {player.nickname}
        </div>
      ) : <div className="flex h-full w-[65%] ml-auto rounded-md items-center justify-center text-3xl z-20 pb-[6%]"></div>}
    </div>
  );
};

export default RightPlayerAttributes;