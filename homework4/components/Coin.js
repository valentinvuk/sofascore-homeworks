import { useEffect, useState, useRef } from "react";
import api from "./api";
import Popup from "reactjs-popup";
import ModalContent from "./ModalContent";
import Card from "./Card";

const Coin = ({ coin }) => {
  const [data, setData] = useState([]);
  const [marketInfo, setMarketInfo] = useState(0);
  const [openPrice, setOpenPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const ref = useRef();
  const closeModal = () => ref.current.close();

  useEffect(async () => {
    await api
      .get(`coins/${coin.id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(async () => {
    await api
      .get(`coins/${coin.id}/ohlcv/today`)
      .then((res) => {
        setMarketInfo(res.data[0].close);
        setHighPrice(res.data[0].high);
        setLowPrice(res.data[0].low);
        setOpenPrice(res.data[0].open);
      })
      .catch((err) => console.log(err));

    /*pitati kako napraviti*/
    /*  const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval); */
  }, []);

  /*  const fetchData = async () => {
    await api
      .get(`coins/${coin.id}/ohlcv/today`)
      .then((res) => {
        setMarketInfo(res.data[0].close);
      })
      .catch((err) => console.log(err));
  }; */

  const get24h = () =>
    (((marketInfo - openPrice) / openPrice) * 100).toFixed(2);

  return (
    <Popup
      modal
      nested
      ref={ref}
      trigger={
        <div>
          <Card
            coin={coin}
            data={data}
            marketInfo={marketInfo}
            last24={get24h()}
          />
        </div>
      }
    >
      <div className="py-5 flex justify-center fixed top-0 left-0 h-screen w-full bg-black bg-opacity-95">
        <ModalContent
          coin={coin}
          data={data}
          last24={get24h()}
          prices={[openPrice, highPrice, lowPrice, marketInfo]}
        ></ModalContent>
        <div
          onClick={() => closeModal()}
          className="py-1 px-3 cursor-pointer absolute top-5 right-5 text-2xl hover:bg-yellow-300 bg-white text-black rounded-sm"
        >
          X
        </div>
      </div>
    </Popup>
  );
};

export default Coin;
