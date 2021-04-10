import Head from "next/head";
import api from "../components/api";
import { useEffect, useState } from "react";
import CoinList from "../components/CoinList";

export default function Home() {
  const [disabled, setDisabled] = useState(false);
  const [coins, setCoins] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  useEffect(async () => {
    await api
      .get(`coins/`)
      .then((res) => {
        setCoins(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Head>
        <title>reactCoins</title>
      </Head>
      <header>
        <div className="flex justify-center items-end">
          <button
            disabled={disabled}
            onClick={() => {
              if (start > 0) {
                setStart(start + -10);
                setEnd(end - 10);
              }
              setDisabled(true);
              setTimeout(() => setDisabled(false), 1000);
            }}
            className="shadow-xl mr-10 bg-white border rounded-md border-black text-black py-2 px-4 hover:bg-black hover:text-white transition-all duration-on> ease-in-out"
          >
            Back
          </button>
          <h1
            onClick={() => {
              setEnd(10);
              setStart(0);
            }}
            className="cursor-pointer mt-5 text-4xl text-center text-black font-semibold tracking-wide"
          >
            🚀reactCoins📈
          </h1>
          <button
            disabled={disabled}
            onClick={() => {
              setStart(start + 10);
              setEnd(end + 10);
              setDisabled(true);
              setTimeout(() => setDisabled(false), 1000);
            }}
            className="shadow-xl ml-10 bg-white border rounded-md border-black text-black py-2 px-4 hover:bg-black hover:text-white transition-all duration-on> ease-in-out"
          >
            Next
          </button>
        </div>
      </header>
      <main className="flex justify-center my-5">
        <CoinList coins={coins} start={start} end={end} />
      </main>

      <footer></footer>
    </div>
  );
}
