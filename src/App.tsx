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
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const introVideos = [
    '/videos/istvan.mp4',
    '/videos/mortimer.mp4',
    '/videos/villain.mp4',
    '/videos/jonas.mp4',
    '/videos/aivan.mp4',
    '/videos/isaac.mp4',
    '/videos/ignatius.mp4',
    '/videos/merchant.mp4',
    '/videos/poluctus.mp4',
    '/videos/angelo.mp4',
  ];

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === introVideos.length - 1 ? 0 : prevIndex + 1);
  };

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
          {startBattle ? (
            <>
              <video
                className="w-full absolute"
                loop
                autoPlay
                muted>
                <source src={battleVideo} />
              </video>
              {/* Header Container */}
              <HeaderContainer />
              {/* Battle Container */}
              <BattleContainer />
              {finishTurn && <FinishTurn />}
            </>
          ) : (
            <div className="relative w-full h-full bg-black">
              <video
                className="w-full h-full object-cover absolute"
                autoPlay
                muted
                onEnded={handleVideoEnd}
                src={introVideos[currentVideoIndex]}
              />
              <WaitingBattle />
            </div>
          )}

          {/* Footer Container */}
          <Hud />
        </div>
      ) : (
        <WinnerText />
      )}
    </>
  );
}

export default App;