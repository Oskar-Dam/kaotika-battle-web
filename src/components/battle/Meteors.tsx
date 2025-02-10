import { useEffect, useState } from 'react';

type Meteor = {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  size: number;
  progress: number;
  isFromLeft: boolean
};

const Meteors = () => {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  const createMeteor = (): Meteor => {
    const isFromLeft = Math.random() > 0.5;
    const startX = isFromLeft ? -500 : window.innerWidth;
    const startY = Math.random() * 410;
    const endX = isFromLeft ? window.innerWidth + 500 : -500;
    const endY = window.innerHeight + 50;
    const duration = 3000;
    const size = 1 + Math.random() * 4;
    const id = Date.now() + Math.random();

    return {
      id,
      startX,
      startY,
      endX,
      endY,
      duration,
      size,
      progress: 0,
      isFromLeft
    };
  };

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      setMeteors(prev => {
        const filtered = prev.filter(meteor => meteor.progress < 1);
        return [...filtered, createMeteor()];
      });
    },2000);

    const animationInterval = setInterval(() => {
      setMeteors(prev =>
        prev.map(meteor => ({
          ...meteor,
          progress: meteor.progress + (16 / meteor.duration)
        })));
    }, 16);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {meteors.map(meteor => {
        const currentX = meteor.startX + (meteor.endX - meteor.startX) * meteor.progress;

        const rotateValue = meteor.isFromLeft ? 'rotate(220deg)' : 'rotate(50deg)';
        
        const arcHeight = Math.sin(meteor.progress * Math.PI) * 250;
        const currentY = meteor.startY - arcHeight;

        return (
          <div
            key={meteor.id}
            className="absolute"
            style={{
              left: `${currentX}px`,
              top: `${currentY}px`,
              width: `${meteor.size * 20}px`,
              height: `${meteor.size * 20}px`,
              opacity: 1,
              transform: `${rotateValue}`,
              backgroundImage: 'url(/images/meteors.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        );
      })}
    </div>
  );
};

export default Meteors;