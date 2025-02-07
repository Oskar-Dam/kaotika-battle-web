import PotionContainer from '../Potions/PotionContainer';
import Battle from './Battle';
import DisconnectUser from './DisconnectUser';

const BattleContainer: React.FC = () => {
  return (
    <div className="w-[100%] h-[50%] flex -mt-[5%] justify-around">
      <PotionContainer></PotionContainer>
      <Battle />
      <DisconnectUser/>
    </div>
  );
};

export default BattleContainer;