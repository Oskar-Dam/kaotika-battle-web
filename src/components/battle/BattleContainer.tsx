import useStore from '@/store/store';
import PotionContainer from '../Potions/PotionContainer';
import Battle from './Battle';
import DisconnectUser from './DisconnectUser';

const BattleContainer: React.FC = () => {
  const { attacker } = useStore();

  return (
    <div className='w-full h-[55%] flex justify-center'>
      {attacker &&
        <>
          {!attacker?.isBetrayer
            ?
            <PotionContainer />
            :
            <div className='w-1/12' />
          }
          <Battle />
          {attacker?.isBetrayer
            ?
            <PotionContainer />
            :
            <div className='w-1/12' />
          }
        </>
      }
      <DisconnectUser />
    </div>
  );
};

export default BattleContainer;