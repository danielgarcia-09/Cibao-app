import { Fragment, useContext, useEffect, useState } from "react";
import CardContext from "../context/Card/CardContext";
import ImgGroup from "./ui/Search/ImgGroup";
import SearchTop from "./ui/Search/SearchTop";

const RandomSearch = () => {
  
  const { infoCount, infoRandom, GetCardInfo, GetInfoCount, ClearCardInfo } =
    useContext(CardContext);

  const [randomArr, setRandomArr] = useState([0]);
  const [count, setCount] = useState(0);

  let randomIdx = () => {
    let rnd = Math.floor(Math.random() * infoCount);

    if (randomArr.includes(rnd) ) {
      return null;
    }

    setRandomArr([...randomArr, rnd]);
    return rnd;
  };


  const prevRandom = () => {
    setCount((count) => --count);
  };

  const nextRandom = () => {
    if (randomArr[count + 1]) {
      setCount((count) => ++count);
      
    
    } else {

      let rnd = randomIdx();
      
      if(rnd == null){
        nextRandom();
        return;
      }
      setCount((count) => ++count);
      
    }
  };

  useEffect(()=> {
    if(infoRandom) {
      GetCardInfo(randomArr[count])
    }
  }, [count])

  const startRandomSearch = () => {
    GetInfoCount();
    randomIdx();
    GetCardInfo(randomArr[count]);  
  };

  const endRandomSearch = () => {
    setRandomArr([0]);
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
          disabled={infoRandom == null || count === infoCount - 1}
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
