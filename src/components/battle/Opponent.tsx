import useStore from '@/store/store';
import { useEffect, useState } from 'react';
import { Player } from '../../Interfaces/Player';
import { getPhotoByLoyalty } from '../../helpers/getPhotoByLoyalty';
import PercentageBar from './PercentageBar';

interface OpponentProps {
  player: Player;
  styles?: string;
  styleClass: string;
  warriorAnimation: boolean;
}

interface Warrior {
  idle: string;
  attack: string;
}

const Opponent: React.FC<OpponentProps> = ({ player, styles, styleClass, warriorAnimation }) => {
  const [warrior, setWarrior] = useState<Warrior>({idle: '', attack: ''});
  const { finishTurn } = useStore();

  useEffect(() => {    
    if (player) {
      const warrior = getPhotoByLoyalty(player);
      setWarrior(warrior);
    } else {
      setWarrior({idle: '', attack: ''});
    }
  }, [player]);

  const chanceMock = {
    chances: {  
      critical: 30,
      fumble: 20,
      normal: 40,
      failed: 10,
    },
    receivedValue: 0,
  };
  return (
    <div className={`animate__animated ${styleClass} w-[45%] h-[90%] mt-[10%] ${finishTurn ? 'animate__fadeOutLeftBig' : 'animate__fadeInLeftBig'}`}>
      {warrior.idle !== '' ? (
        <>
          <div className='w-full h-[70%] flex justify-center items-center'>
            <div className='relative w-full h-[70%]'>
              <div className='absolute top-[100%]  w-[100%] h-[30%] rounded-[100%] bg-[rgba(0,_0,_0,_0.4)] shadow-[0_0_10px_10px_rgba(0,_0,_0,_0.4)]' />
              <img
                src={warriorAnimation ? warrior.attack : warrior.idle}
                className={`w-full object-cover ${styles}`}
              />
            </div>
            <div className='w-[30%] flex justify-center items-center'>
              <PercentageBar
                receivedValue={chanceMock.receivedValue}
                chances={chanceMock.chances}
                player={player} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};


export default Opponent;