import useStore from '../../store/store';
import Opponent from './Opponent';

const Battle: React.FC = () => {
  const { attacker, defender, disconnectedPlayer, changePlayer, setAttacker, setDefender } = useStore();

  if (attacker?.nickname === disconnectedPlayer){
    setAttacker(null);
  }

  if (defender?.nickname === disconnectedPlayer) {
    setDefender(null);
  }

  return (
    <div className='w-10/12 flex justify-around items-center'>
      <Opponent
        player={attacker?.isBetrayer ? defender! : attacker!}
        styles='transform scale-x-[1]'
        styleClass={!defender?.isBetrayer && attacker?.isBetrayer || attacker?.isBetrayer ? `transform scale-x-[1] ${changePlayer && 'animate__fadeOut'} ${!changePlayer && 'animate__fadeIn'}` : 'transform scale-x-[1]'}>
      </Opponent>
      <Opponent
        player={attacker?.isBetrayer ? attacker! : defender!}
        styles='transform scale-x-[1]'
        styleClass={defender?.isBetrayer && !attacker?.isBetrayer || !attacker?.isBetrayer ? `transform scale-x-[-1] ${changePlayer && 'animate__fadeOut'} ${!changePlayer && 'animate__fadeIn'}` : 'transform scale-x-[-1]'}>
      </Opponent>
    </div>
  );
};

export default Battle;