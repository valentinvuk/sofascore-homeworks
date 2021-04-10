const Card = ({ coin, marketInfo, data, last24 }) => {
  return (
    <div
      className="rounded-md w-full py-5 px-2 my-2 flex justify-between cursor-pointer transition-all duration-200 ease-in-out items-center bg-black text-white hover:bg-white hover:text-black shadow-lg border hover:border-black"
      key={coin.id}
    >
      <div className="flex">
        <p className="mr-2">{data.rank}.</p>
        <p className="mr-4 text-center font-semibold">
          {coin.name} ({coin.symbol})
        </p>
      </div>
      <div className="flex">
        <h1 className="mr-3 text-center tracking-wide font-semibold">
          {marketInfo.toPrecision(5)}$
        </h1>
        <h1>
          {last24 > 0 ? (
            <span className="text-green-500 font-semibold mr-1">
              {" +" + last24 + "%"}
            </span>
          ) : (
            <span className="text-red-500 font-semibold mr-1">
              {" " + last24 + "%"}
            </span>
          )}
        </h1>
      </div>
    </div>
  );
};

export default Card;
