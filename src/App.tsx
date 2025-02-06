import clsx from 'clsx';
import { useEffect, useState } from 'react';
import './App.css';
import BattleContainer from './components/battle/BattleContainer';
import FinishTurn from './components/battle/finishTurn';
import WaitingBattle from './components/battle/WaitingBattle';
import Hud from './components/footer/Hud';
import HeaderContainer from './components/header/HeaderContainer';
import InitAltScreen from './components/initScreen/initAnimation';
import { useSocketListeners } from './sockets/socketListeners';
import battleImage from '/images/battle_bg.webp';

interface MeteorsProps extends React.HTMLAttributes<HTMLSpanElement> {
  number?: number;
}

function App({ number = 20, ...props }: MeteorsProps) {
  const { startBattle, finishTurn } = useSocketListeners();
  const [animationFinished, setAnimationFinished] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: Math.floor(Math.random() * window.innerHeight) + 'px',
      left: Math.floor(Math.random() * window.innerWidth) + 'px',
      animationDelay: Math.random() * 1 + 0.2 + 's',
      animationDuration: Math.floor(Math.random() * 8 + 2) + 's',
    }));
    setMeteorStyles(styles);
  }, [number]);

  useEffect(() => {
    if (animationFinished) {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setShowMainContent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animationFinished]);

  return (
    <>
      {!showMainContent && (
        <div
          className={`absolute inset-0 z-50 ${fadeOut ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}
        >
          <InitAltScreen setAnimationFinished={setAnimationFinished} />
        </div>
      )}

      <div      
        className={`w-screen h-screen bg-center bg-cover overflow-hidden ${showMainContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
        style={{ backgroundImage: `url(${battleImage})` }}
      >
        
        {[...meteorStyles].map((style, idx) => (
          // Meteor head
          <span
            key={idx}
            className={clsx('pointer-events-none absolute left-1/2 top-1/2 size-2 rotate-[215deg] animate-meteor rounded-full bg-red-500 shadow-[0_0_0_1px_#ffffff10]')}
            style={style}
            {...props}
          >
            {/* Meteor Tail */}
            <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-red-500 to-transparent" />
          </span>
        ))}

        {/* Header Container */}
        {startBattle && <HeaderContainer />}

        {/* Battle Container */}
        {startBattle && <BattleContainer />}
        {!startBattle && <WaitingBattle />}

        {finishTurn && startBattle && <FinishTurn />}

        {/* Footer Container */}
        <Hud />
      </div>
    </>
  );
}

export default App;