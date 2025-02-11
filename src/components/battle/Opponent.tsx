import useStore from '@/store/store';
import { useEffect, useState } from 'react';
import { Player } from '../../Interfaces/Player';
import { getPhotoByLoyalty } from '../../helpers/getPhotoByLoyalty';
import PercentageBar from './PercentageBar';

interface OpponentProps {
  player: Player;
  styles?: string;
  styleClass: string;
}

const Opponent: React.FC<OpponentProps> = ({ player, styles, styleClass }) => {
  const [warriorPhoto, setWarriorPhoto] = useState<string>('');
  const { finishTurn } = useStore();

  useEffect(() => {
    if (player) {
      const warriorPhoto = getPhotoByLoyalty(player);
      setWarriorPhoto(warriorPhoto);
    } else {
      setWarriorPhoto('');
    }
  }, [player]);

  const chanceMock = {
    chances: {  
      critical: 10,
      fumble: 20,
      normal: 30,
      failed: 40,
    }
  };
  return (
    <div className={`animate__animated ${styleClass} w-[45%] h-[90%] mt-[10%] ${finishTurn && 'animate__fadeOutLeftBig'} ${!finishTurn && 'animate__fadeInLeftBig'}`}>
      {warriorPhoto !== '' ? (
        <>
          <div className='w-full h-[70%] flex justify-center items-center'>
            <div className='relative w-full h-[70%]'>
              <div className='absolute top-[100%]  w-[100%] h-[30%] rounded-[100%] bg-[rgba(0,_0,_0,_0.4)] shadow-[0_0_10px_10px_rgba(0,_0,_0,_0.4)]' />
              <img
                src={warriorPhoto}
                className={`w-full object-cover ${styles}`}
              />
            </div>
            <div className='w-[30%] flex justify-center items-center'>
              <PercentageBar
                receivedValue={27}
                chances={chanceMock.chances} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};


export default Opponent;