const ModalContent = ({ coin, data, last24, prices }) => {
  return (
    <div className="p-5 w-5/6 flex h-full bg-white text-black rounded-lg overflow-y-scroll">
      <div className="flex-col w-1/3 justify-center">
        <h1 className="mr-2 pb-5 text-5xl font-bold">{coin.name}</h1>
        <div className="mr-4 p-2 bg-black text-white flex-col text-xl rounded-md">
          <h1 className="my-1">
            <span className="font-semibold">Symbol:</span> {data.symbol}
          </h1>
          <h1 className="my-1">
            <span className="font-semibold">Started:</span>{" "}
            {data.started_at ? data.started_at.slice(0, 10) : "Unknown"}
          </h1>
          <h1 className="my-1">
            <span className="font-semibold">Type:</span>{" "}
            {data.type ? data.type : "Unknown"}
          </h1>
          <h1 className="my-1">
            <span className="font-semibold">Website:</span>{" "}
            {data.links ? (
              <a
                className="border-b hover:border-gray-300"
                href={data.links.website && data.links.website[0]}
                target="_blank"
              >
                {coin.name} Website
              </a>
            ) : (
              "Unknown"
            )}
          </h1>
          <h1 className="my-1">
            <span className="font-semibold">Hash:</span>{" "}
            {data.hash_algorithm ? data.hash_algorithm : "Unknown"}
          </h1>
          <h1 className="my-1">
            <span className="font-semibold">Open Source:</span>{" "}
            {data.open_source ? "✔" : "❌"}
          </h1>
          <h1 className="my-1">
            <span className="font-semibold">Proof Type:</span>{" "}
            {data.proof_type ? data.proof_type : "Unknown"}
          </h1>
        </div>
        <div className="mt-2 mr-4 text-2xl w-full flex-col">
          <p className="text-3xl border-b">24h Data</p>
          <p>Opening Price: {prices[0].toPrecision(5)}$</p>
          <p>Closing Price: {prices[3].toPrecision(5)}$</p>
          <p>
            Change:
            {last24 > 0 ? (
              <span className="text-green-700 font-semibold ml-1">
                {"+" + last24 + "%"}
              </span>
            ) : (
              <span className="text-red-700 font-semibold ml-1">
                {last24 + "%"}
              </span>
            )}
          </p>
          <p>Highest Price: {prices[1].toPrecision(5)}$</p>
          <p>Lowest Price: {prices[2].toPrecision(5)}$</p>
        </div>
      </div>
      <div className="mt-2 pl-4 flex-col w-2/3 border-l px-1">
        <h1 className="pb-2 font-semibold italic text-3xl border-b">
          DESCRIPTION
        </h1>
        <p className="py-2 text-xl">{data.description}</p>
        <h1 className="mt-3 pb-2 font-semibold italic text-3xl border-b">
          USEFUL LINKS
        </h1>
        {data.whitepaper ? (
          <p className="py-2 text-xl">
            📕:{" "}
            <a
              className="font-medium border-b text-gray-700 hover:text-black"
              href={data.whitepaper.link}
            >
              {coin.name} Whitepapers
            </a>
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ModalContent;
