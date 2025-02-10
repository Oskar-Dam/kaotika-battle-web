import { Player } from '../../Interfaces/Player';
import defaultAvatar from '/images/default_avatar.png';

interface LeftPlayerAttributesInterface {
  player: Player;
  isAttacker: boolean;
}

const LeftPlayerAvatar: React.FC<LeftPlayerAttributesInterface> = ({ player, isAttacker }) => {
  return (
    <div className='flex flex-start h-[55%] w-[7%] ml-[4.5%] justify-center items-center'>
      {player ? (
        <>
          {isAttacker &&
          <div className="absolute h-[80%] w-[23%] z-20 bg-[url('/images/selected_player.png')] bg-cover blink" />
          }
          <img
            src={player.avatar}
            alt='Player Avatar'
            className='h-full w-full object-cover z-0 rounded-[100%]'
          />
        </>
      ) : <img
        src={defaultAvatar}
        alt='Default Avatar'
        className='h-full w-full object-cover z-0 rounded-[100%]'
      />}
    </div>
  );
};

export default LeftPlayerAvatar;