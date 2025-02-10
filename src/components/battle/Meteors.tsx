import { meteorValue } from '@/constants/meteorsContants';
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
    const startX = isFromLeft ? -meteorValue.SCREEN_PADDING : window.innerWidth;
    const startY = Math.random() * meteorValue.START_Y;
    const endX = isFromLeft ? window.innerWidth + meteorValue.END_X : -meteorValue.END_X;
    const endY = window.innerHeight + meteorValue.END_Y;
    const duration = meteorValue.DURATION;
    const size = (meteorValue.MIN_SIZE + Math.random() * meteorValue.MAX_SIZE);
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
    }, meteorValue.SPAWN_INTERVAL);

    const animationInterval = setInterval(() => {
      setMeteors(prev =>
        prev.map(meteor => ({
          ...meteor,
          progress: meteor.progress + (meteorValue.ANIMATION_FRAME_INTERVAL / meteor.duration)
        })));
    }, meteorValue.ANIMATION_FRAME_INTERVAL);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {meteors.map(meteor => {
        const currentX = meteor.startX + (meteor.endX - meteor.startX) * meteor.progress;

        const rotateValue = meteor.isFromLeft ? `rotate(${meteorValue.LEFT_METEOR}deg)` : `rotate(${meteorValue.RIGHT_METEOR}deg)`;

        const arcHeight = Math.sin(meteor.progress * Math.PI) * meteorValue.MAX_ARC_HEIGHT;
        const currentY = meteor.startY - arcHeight;

        return (
          <div
            key={meteor.id}
            className="absolute"
            style={{
              left: `${currentX}px`,
              top: `${currentY}px`,
              width: `${meteor.size}px`,
              height: `${meteor.size}px`,
              opacity: meteorValue.OPACITY,
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