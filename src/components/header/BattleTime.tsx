import useStore from '../../store/store';

const BattleTime = () => {
  const { timer } = useStore();

  return (
    <div className="flex w-full rounded-md text-5xl justify-center items-center pt-[45%]">
      {timer !== -1 ? timer : null}
    </div>
  );
};

export default BattleTime;