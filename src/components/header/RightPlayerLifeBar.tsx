import { useEffect, useState } from 'react';
import rightLifeBar from '/images/life_bar_right.gif';
import missingRightLifeBar from '/images/missing_life_bar_right.png';

interface RightPlayerLifeBarInterface {
  maxHitpoints: number,
  hitpoints: number,
}

const RightPlayerLifeBar: React.FC<RightPlayerLifeBarInterface> = ({ maxHitpoints, hitpoints }) => {

  const [life, setLife] = useState(hitpoints / maxHitpoints * 100);
  const [missingLife, setMissingLife] = useState((maxHitpoints - hitpoints) / maxHitpoints * 100);

  useEffect(() => {
    setLife(hitpoints / maxHitpoints * 100);
    setMissingLife((maxHitpoints - hitpoints) / maxHitpoints * 100);
  }, [hitpoints, maxHitpoints]);

  return (
    <div className="flex inline-row h-[70%] w-full z-10">
      <div
        className={'bg-right bg-cover transition-all duration-300 transition-slowest ease'}
        style={{ backgroundImage: `url(${missingRightLifeBar})`, width: `${missingLife}%` }} />
      <div
        className={'bg-right bg-cover transition-all duration-300 transition-slowest ease'}
        style={{ backgroundImage: `url(${rightLifeBar})`, width: `${life}%` }} />
    </div>
  );
};

export default RightPlayerLifeBar;