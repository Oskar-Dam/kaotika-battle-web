import { useEffect, useState } from 'react';
import './App.css';
import BattleContainer from './components/battle/BattleContainer';
import FinishTurn from './components/battle/finishTurn';
import WaitingBattle from './components/battle/WaitingBattle';
import Hud from './components/footer/HudAlt';
import HeaderContainer from './components/header/HeaderContainer';
import InitAltScreen from './components/initScreen/initAnimation';
import WinnerText from './components/winner/WinnerText';
import { useSocketListeners } from './sockets/socketListeners';
import battleVideo from '/videos/battle_bg.mp4';

function App() {
  const { startBattle, finishTurn, finishGame } = useSocketListeners();
  const [animationFinished, setAnimationFinished] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

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

      {!finishGame ? (
        <div
          className={`overflow-hidden absolute inset-0 bg-center bg-cover transition-opacity duration-2000 ${animationFinished ? 'opacity-100' : 'opacity-0'}`}>

          {/* Background video */}
          <video
            className='w-full'
            loop
            autoPlay
            muted>
            <source src={battleVideo}></source>
          </video>

          {/* Header Container */}
          {startBattle && <HeaderContainer />}

          {/* Battle Container */}
          {startBattle && <BattleContainer />}
          {!startBattle && <WaitingBattle />}

          {finishTurn && startBattle && <FinishTurn />}

          {/* Footer Container */}
          <Hud />
        </div >
      ) :
        // Winner Component
        <WinnerText />
      }
    </>
  );
}

export default App;