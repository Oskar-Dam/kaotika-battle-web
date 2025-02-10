import useStore from '@/store/store';
import { useEffect, useState } from 'react';
import { Player } from '../../Interfaces/Player';
import { getPhotoByLoyalty } from '../../helpers/getPhotoByLoyalty';

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

  return (
    <div className={`animate__animated ${styleClass} w-[45%] h-[90%] mt-[10%] ${finishTurn && 'animate__fadeOutLeftBig'} ${!finishTurn && 'animate__fadeInLeftBig'}`}>

      {warriorPhoto !== '' ? (
        <>
          <div className='absolute bottom-[15%] w-full rounded-[100%] bg-[rgba(0,_0,_0,_0.4)] h-[30%] shadow-[0_0_10px_10px_rgba(0,_0,_0,_0.4)]' />
          <img
            src={warriorPhoto}
            className={`w-full object-cover ${styles}`}
          />
        </>
      ) : null}

    </div>
  );
};


export default Opponent;