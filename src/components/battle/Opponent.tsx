import { useEffect, useState } from 'react';
import { Player } from '../../Interfaces/Player';
import { getPhotoByLoyalty } from '../../helpers/getPhotoByLoyalty';

interface OpponentProps {
  player: Player;
  styles?: string;
  styleClass: string;
}

const Opponent: React.FC<OpponentProps> = ({ player, styles, styleClass}) => {
  const [warriorPhoto, setWarriorPhoto] = useState<string>('');

  useEffect(() => {
    if(player !== null){
      const warriorPhoto = getPhotoByLoyalty(player);
      setWarriorPhoto(warriorPhoto);
    }
  }, [player]);

  return (
    <div className={`animate__animated ${styleClass} w-[45%] h-[90%] mr-[5%] mt-[15%]`}>

      {warriorPhoto !== '' ? (
        <img
          src={warriorPhoto}
          className={`h-full w-full object-cover z-0 ${styles}`}
          
        />
      ) : null} 

    </div>
  );
};


export default Opponent;