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

  useEffect(() => {
    if (player !== null) {
      const warriorPhoto = getPhotoByLoyalty(player);
      setWarriorPhoto(warriorPhoto);
    }
  }, [player]);

  return (
    <div className={`animate__animated ${styleClass} w-[45%] h-[90%] mt-[10%]`}>

      {warriorPhoto !== '' ? (
        <>
          <div className='absolute bottom-[5%] w-full rounded-[100%] bg-[rgba(0,_0,_0,_0.4)] h-[30%] shadow-[0_0_10px_10px_rgba(0,_0,_0,_0.4)]' />
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