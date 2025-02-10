import 'animate.css';
import useStore from '../../store/store';
import dravokarWinner from '/images/dravokarWinner.png';
import kaotikaWinner from '/images/kaotikaWinner.png';

const WinnerText: React.FC = () => {
  const { winner } = useStore();

  return (
    <div
      className={'flex flex-col overflow-hidden absolute inset-0 bg-center bg-cover justify-center items-center transition-opacity duration-2000 \'opacity-100\' : \'opacity-0\'}'}
      style={{ backgroundImage: `url(${winner === 'Kaotika' ? (kaotikaWinner): dravokarWinner})` }}>
      <div className='flex h-[20%] w-[30%] border justify-center items-center animate__animated animate__fadeInDown animate__slower'>
        <p className='text-6xl w-full'>The winner is {winner} !!!</p>
      </div>
    </div>
  );
};

export default WinnerText;