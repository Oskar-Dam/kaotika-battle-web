import { useEffect } from 'react';
import useStore from '../../store/store';
import Opponent from './Opponent';

const Battle: React.FC = () => {
  const { attacker, defender, disconnectedPlayer, changeRightPlayerAnimation, changeLeftPlayerAnimation, setAttacker, setDefender, attackRightPlayerAnimation, attackLeftPlayerAnimation } = useStore();

  useEffect(() => {
    if (attacker?.nickname === disconnectedPlayer){
      setAttacker(null);
    }
    if (defender?.nickname === disconnectedPlayer) {
      setDefender(null);
    }
  },[disconnectedPlayer]);

  return (
    <div className='w-10/12 flex justify-around items-center'>
      <Opponent
        player={attacker?.isBetrayer ? defender! : attacker!}
        styles='transform scale-x-[1]'
        styleClass={!attackLeftPlayerAnimation && attacker?.isBetrayer ? `transform scale-x-[1] ${changeLeftPlayerAnimation ? 'animate__fadeOut' : 'animate__fadeIn'}` : 'transform scale-x-[1]'}
        warriorAnimation={attackLeftPlayerAnimation}>
      </Opponent>
      <Opponent
        player={attacker?.isBetrayer ? attacker! : defender!}
        styles='transform scale-x-[1]'
        styleClass={!attackRightPlayerAnimation && !attacker?.isBetrayer ? `transform scale-x-[-1] ${changeRightPlayerAnimation ? 'animate__fadeOut' : 'animate__fadeIn'}` : 'transform scale-x-[-1]'}
        warriorAnimation={attackRightPlayerAnimation}>
      </Opponent>
    </div>
  );
};

export default Battle;