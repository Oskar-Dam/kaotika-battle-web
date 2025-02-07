import useStore from '../../store/store';
import Opponent from './Opponent';

const Battle: React.FC = () => {
  const { attacker, defender } = useStore();

  return (
    <div className='w-full flex justify-around items-center'>
      <Opponent
        player={attacker?.isBetrayer ? defender! : attacker!}
        styles='transform scale-x-[1]'
        styleClass={'animate__backInUp'}>
      </Opponent>
      <Opponent
        player={attacker?.isBetrayer ? attacker! : defender!}
        styles='transform scale-x-[1]'
        styleClass={'animate__backInUp transform scale-x-[-1]'}>
      </Opponent>
    </div>
  );
};

export default Battle;