import { useEffect } from 'react';
import useStore from '../../store/store';
import LeftPlayerAttributes from './LeftPlayerAttributes';
import LeftPlayerAvatar from './LeftPlayerAvatar';
import RightPlayerAttributes from './RightPlayerAttributes';
import RightPlayerAvatar from './RightPlayerAvatar';
import RoundContainer from './RoundContainer';
import borderImage from '/images/header_border.png';

const HeaderContainer: React.FC = () => {
  const { attacker, defender } = useStore();
  
  useEffect(() => {
    console.log('attacker');
    console.log(attacker);
  }, [attacker]);

  useEffect(() => {
    console.log('defender');
    console.log(defender);
  }, [defender]);

  return (
    <div className="relative flex flex-row w-full h-[25%] justify-between rounded-md pt-[0.9%]">

      {/* Border Image */}
      <img
        src={borderImage}
        alt="Border Image"
        className="absolute top-0 left-0 z-20 w-full"
      />

      {/* Left Player Avatar */}
      <LeftPlayerAvatar
        player={attacker?.isBetrayer ? defender! : attacker!}
        isAttacker={attacker?.isBetrayer ? false! : true!}
      />

      {/* Left Player Attributes */}
      <LeftPlayerAttributes
        player={attacker?.isBetrayer ? defender! : attacker!}
      />

      {/* Round Container */}
      <RoundContainer />

      {/* Right Player Attributes */}
      <RightPlayerAttributes
        player={attacker?.isBetrayer ? attacker! : defender!}
      />

      {/* Right Player Avatar */}
      <RightPlayerAvatar
        player={attacker?.isBetrayer ? attacker! : defender!}
        isAttacker={attacker?.isBetrayer ? true! : false!}
      />

    </div>
  );
};

export default HeaderContainer;