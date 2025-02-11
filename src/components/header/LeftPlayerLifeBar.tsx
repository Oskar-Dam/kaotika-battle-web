import { useEffect, useState } from 'react';
import leftLifeBar from '/images/life_bar_left.gif';
import missingLeftLifeBar from '/images/missing_life_bar_left.png';

interface LeftPlayerLifeBarInterface {
  maxHitpoints: number;
  hitpoints: number;
}

const LeftPlayerLifeBar: React.FC<LeftPlayerLifeBarInterface> = ({ maxHitpoints, hitpoints }) => {

  const [life, setLife] = useState(hitpoints / maxHitpoints * 100);
  const [missingLife, setMissingLife] = useState((maxHitpoints - hitpoints) / maxHitpoints * 100);

  useEffect(() => {
    setLife(hitpoints / maxHitpoints * 100);
    setMissingLife((maxHitpoints - hitpoints) / maxHitpoints * 100);
  }, [hitpoints, maxHitpoints]);

  return (
    <div className="flex inline-row h-[70%] w-full z-10">
      <div
        className={'bg-left bg-cover transition-all duration-1000 transition-slowest ease'}
        style={{ backgroundImage: `url(${leftLifeBar})`, width: `${life}%` }} />
      <div
        className={'bg-left bg-cover transition-all duration-1000 transition-slowest ease'}
        style={{ backgroundImage: `url(${missingLeftLifeBar})`, width: `${missingLife}%` }} />
    </div>
  );
};

export default LeftPlayerLifeBar;