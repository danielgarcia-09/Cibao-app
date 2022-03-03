import { useReducer } from "react";
import AxiosClient from "../../config/axios";
import CardContext from "./CardContext";
import CardReducer from "./CardReducer";

const CardState = (props) => {
  const initialState = {
      infoCount: null,
      infoRandom: null,
      infoByCedula: null
  };

  const [state, dispatch] = useReducer(CardReducer, initialState);

  // Funcs

  const GetCardInfo = async (id) => {
    try {
      const result = await AxiosClient.get(`Cibao/${id}`);
      dispatch({
        type: "GET_INFO",
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const GetInfoCount = async () => {
    try {
      const result = await AxiosClient.get("Cibao");

      dispatch({
        type: "GET_COUNT",
        payload: result.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  const GetInfoByCedula = async(id) => {
    try {
      const result = await AxiosClient.get(`Cibao/cedula/${id}`);

      dispatch({
        type: "GET_INFO_BY_CEDULA",
        payload: result.data
      })

      return true;
    } catch (error) {
      return false;
    }
  }

  const ClearCardInfo = () => {
      dispatch({
          type: "CLEAR_INFO"
      })
  }

  const ClearCardSearch = () => {
    dispatch({
      type: "CLEAR_INFO_SEARCH"
    });
  }

  return (
    <CardContext.Provider
      value={{
        infoCount: state.infoCount,
        infoRandom: state.infoRandom,
        infoByCedula: state.infoByCedula,
        GetCardInfo,
        GetInfoCount,
        GetInfoByCedula,
        ClearCardInfo,
        ClearCardSearch
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};

export default CardState;
