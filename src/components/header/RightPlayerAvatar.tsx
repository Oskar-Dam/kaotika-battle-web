import useStore from '@/store/store';
import { Player } from '../../Interfaces/Player';
import defaultAvatar from '/images/default_avatar.png';

interface RightPlayerAvatarInterface {
  player: Player;
  isAttacker: boolean;
}

const RightPlayerAvatar: React.FC<RightPlayerAvatarInterface> = ({ player, isAttacker }) => {
  const { finishTurn, changeRightPlayerAnimation } = useStore();

  return (
    <div className='flex flex-start h-[55%] w-[7%] mr-[4.5%] justify-center items-center'>
      <img
        src={defaultAvatar}
        alt='Default Avatar'
        className='absolute h-[42%] object-cover z-10 rounded-[100%]' />
      {player && (
        <>
          {isAttacker &&
            <div className={`absolute h-[80%] w-[23%] z-20 bg-[url('/images/selected_player.png')] bg-cover blink ${finishTurn && 'animate__fadeOut'}`} />
          }
          <img
            src={player.avatar}
            alt='Player Avatar'
            className={`h-[80%] w-[80%] object-cover z-10 rounded-[100%] animate__animated ${changeRightPlayerAnimation && !isAttacker && 'animate__fadeOut'} ${finishTurn ? 'animate__fadeOut' : 'animate__fadeIn'}`} />
        </>
      )}
    </div>
  );
};

export default RightPlayerAvatar;