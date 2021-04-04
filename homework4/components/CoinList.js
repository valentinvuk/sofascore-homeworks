import Coin from "./Coin";

const CoinList = ({ coins, start, end }) => {
  const renderCoins = coins.slice(start, end).map((coin) => {
    return <Coin key={coin.id} coin={coin} />;
  });

  return (
    <div className="w-1/2 flex-col">
      <div className="w-full px-2 flex justify-between items-center text-gray-300">
        <div className="flex w-1/3">
          <p className="mr-2">#</p>
          <p className="mr-4 text-center">Name (Symbol)</p>
        </div>
        <div className="flex  text-center">{end / 10}/515</div>
        <div className="flex w-1/3 justify-end">
          <h1 className="mr-3 text-center">Value</h1>
          <h1>
            <span className="w-1/3">Last 24H</span>
          </h1>
        </div>
      </div>
      {coins ? renderCoins : <h1>LOADING COINS</h1>}
    </div>
  );
};

export default CoinList;
