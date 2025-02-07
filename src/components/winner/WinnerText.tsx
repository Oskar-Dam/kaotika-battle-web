import useStore from '../../store/store';

const WinnerText: React.FC = () => {
  const { winner } = useStore();

  return (
    <div className='h-[50%] w-[50%] border justify-center'>
      <p className='text-6xl'>The winner is {winner} !!!</p>
    </div>
  );
};

export default WinnerText;