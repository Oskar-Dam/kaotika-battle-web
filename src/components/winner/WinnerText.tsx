import 'animate.css';
import useStore from '../../store/store';

const WinnerText: React.FC = () => {
  const { winner } = useStore();

  return (
    <div className='flex h-[20%] w-[30%] border justify-center items-center animate__animated animate__fadeInDown animate__slower'>
      <p className='text-6xl w-full'>The winner is {winner} !!!</p>
    </div>
  );
};

export default WinnerText;