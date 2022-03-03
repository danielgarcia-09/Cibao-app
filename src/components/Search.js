import { Fragment, useContext, useState } from "react";
import InputMask from 'react-input-mask';
import Swal from "sweetalert2";
import CardContext from "../context/Card/CardContext";
import ImgGroup from "./ui/Search/ImgGroup";
import SearchTop from "./ui/Search/SearchTop";

const Search = () => {
  const {  infoByCedula, GetInfoByCedula, ClearCardSearch } = useContext(CardContext);

  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    let result =  await GetInfoByCedula(search);
    
    if(result === false){
      
      ClearCardSearch();
      setSearch('');
      Swal.fire({
        title: "Error",
        text: "Tarjeta no encontrada",
        icon: "error",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }

  return (
    <Fragment>
      <SearchTop />
      <form 
        onSubmit={handleSubmit}
        className="my-5 ms-5" 
        style={{ width: "40%" }}
      >
        <div className="input-group mb-5">
          <InputMask
            value={search}
            mask="999-9999999-9"
            onChange={handleChange}
          >
            <input
            type="text"
            className="form-control"
            placeholder="Cedula"
            aria-label="Cedula"
            aria-describedby="button-addon2"
            required
          />
          </InputMask>
          <button className="btn search-button" type="submit" id="button-addon2">
            Buscar
          </button>
        </div>
      </form>

     {infoByCedula && <ImgGroup info={infoByCedula} />}
    </Fragment>
  );
};

export default Search;
