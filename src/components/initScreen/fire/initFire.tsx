import React from 'react';
import FireRenderer from './fireRender';

interface FireAnimationProps {
  className?: string;
}

const FireAnimation: React.FC<FireAnimationProps> = ({ className }) => {
  return <FireRenderer className={className} />;
};

export default FireAnimation;