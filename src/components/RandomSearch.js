import { Fragment, useContext, useEffect, useState } from "react";
import CardContext from "../context/Card/CardContext";
import ImgGroup from "./ui/Search/ImgGroup";
import SearchTop from "./ui/Search/SearchTop";

const RandomSearch = () => {
  const { infoRandom, GetCardInfo, ClearCardInfo } = useContext(CardContext);

  const [count, setCount] = useState(0);

  const prevRandom = () => {
    setCount((count) => --count);
  };

  const nextRandom = () => {
    setCount((count) => ++count);
  };

  useEffect(() => {
    if (count >= randomArr.length) {
      GetCardInfo();
    }
  }, [count]);

  const startRandomSearch = () => {
    GetCardInfo();
  };

  const endRandomSearch = () => {
    setCount(0);
    ClearCardInfo();
  };
  return (
    <Fragment>
      <SearchTop />
      <div
        id="search-button-group"
        className="d-flex justify-content-md-between justify-content-center flex-wrap my-5"
      >
        <button
          onClick={() => startRandomSearch()}
          className="btn start-button my-3 mx-3"
          disabled={infoRandom != null}
        >
          Iniciar
        </button>
        <button
          onClick={() => prevRandom()}
          disabled={count === 0}
          className="btn prev-button my-3 mx-3"
        >
          Anterior
        </button>
        <button
          onClick={() => nextRandom()}
          disabled={infoRandom === null}
          className="btn next-button my-3 mx-3"
        >
          Proximo
        </button>
        <button
          className="btn end-button my-3 mx-3"
          onClick={() => endRandomSearch()}
          disabled={infoRandom === null}
        >
          Finalizar
        </button>
      </div>

      {infoRandom && <ImgGroup info={infoRandom} />}
    </Fragment>
  );
};

export default RandomSearch;
