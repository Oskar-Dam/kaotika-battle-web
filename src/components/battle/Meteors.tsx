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
};

const Meteors = () => {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  const createMeteor = (): Meteor => {
    const startX = Math.random() * window.innerWidth;
    const startY = -20;
    const endX = startX - 500;
    const endY = window.innerHeight + 20;
    const duration = 1000 + Math.random() * 2000;
    const size = 2 + Math.random() * 4;
    const id = Date.now() + Math.random();

    return {
      id,
      startX,
      startY,
      endX,
      endY,
      duration,
      size,
      progress: 0
    };
  };

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      setMeteors(prev => {
        const filtered = prev.filter(meteor => meteor.progress < 1);
        return [...filtered, createMeteor()];
      });
    }, 300);

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
        const currentY = meteor.startY + (meteor.endY - meteor.startY) * meteor.progress;

        return (
          <div
            key={meteor.id}
            className="absolute"
            style={{
              left: `${currentX}px`,
              top: `${currentY}px`,
              width: `${meteor.size * 20}px`,
              height: `${meteor.size * 20}px`,
              opacity: 1 - meteor.progress,
              transform: 'rotate(-15deg)',
              backgroundImage: 'url(/images/meteor.png)',
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
