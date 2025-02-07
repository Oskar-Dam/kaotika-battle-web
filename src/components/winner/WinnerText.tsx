import useStore from '../../store/store';

const WinnerText: React.FC = () => {
  const { winner } = useStore();

  return (
    <div className='h-[50%] w-[50%] border'>
      {winner}
    </div>
  );
};

export default WinnerText;