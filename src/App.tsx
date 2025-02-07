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

function App() {
  const { startBattle, finishTurn } = useSocketListeners();
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

      <div
        className={`overflow-hidden absolute inset-0 bg-center bg-cover transition-opacity duration-2000 ${animationFinished ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${battleImage})` }}>
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