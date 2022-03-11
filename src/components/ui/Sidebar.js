import {
  faHouse,
  faPowerOff,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useContext, useState } from "react";
import useCurrentPath from "../../hooks/useCurrentPath";
import SideNav, {
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";

import { Route, Routes, useNavigate } from "react-router-dom";
import Search from "../Search";
import RandomSearch from "../RandomSearch";
import AuthContext from "../../context/Auth/AuthContext";

const Sidebar = () => {
  const { user, signOut } = useContext(AuthContext);

  const [mainStyle, setMainStyle] = useState({
    paddingLeft: "",
  });

  const [logoStyle, setLogoStyle] = useState({
    height: "0",
    width: "0",
  });

  const currentPath = useCurrentPath();
  let navigate = useNavigate();

  const handleToggle = (isToggle) => {
    if (isToggle) {
      setMainStyle({ paddingLeft: "18rem" });
      setLogoStyle({ height: "100px", width: "80%" });
    } else {
      setMainStyle({ paddingLeft: "5rem" });
      setLogoStyle({ height: "0", width: "0" });
    }
  };

  const logOut = () => {
    window.location.reload();
    signOut();
  };

  return (
    <Fragment>
      <SideNav
        onSelect={(selected) => {
          navigate(selected);
        }}
        onToggle={(toggle) => {
          handleToggle(toggle);
        }}
      >
        <SideNav.Toggle />
        <Nav defaultSelected={currentPath}>
          <img
            className="logo"
            style={logoStyle}
            src="https://lidaapi.org.do/wp-content/uploads/sites/3/2020/03/lidaapi-logo-acap.png"
            alt="logo"
          />

          <div
            style={{
              display: logoStyle.width < 1 ? "none" : "block",
            }}
            className="containerInputSearch"
          >
            <input className="inputSearch" type={"text"} placeholder="Buscar" />
            <FontAwesomeIcon className="searchIcon" icon={faSearch} />
          </div>

          {user && (
            <NavItem>
              <NavText>{user.name}</NavText>
              <NavIcon>
                <FontAwesomeIcon icon={faUser} />
              </NavIcon>
            </NavItem>
          )}
          <NavItem eventKey="/">
            <NavText>Inicio</NavText>
            <NavIcon>
              <FontAwesomeIcon icon={faHouse} />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="/search">
            <NavIcon>
              <FontAwesomeIcon icon={faSearch} />
            </NavIcon>
            <NavText>Búsqueda</NavText>
            <NavItem eventKey="/search">
              <NavText>Por Cedula</NavText>
            </NavItem>
            <NavItem eventKey="/search/random">
              <NavText>Aleatoria</NavText>
            </NavItem>
          </NavItem>

          {user && (
            <NavItem onClick={() => logOut()}>
              <NavText>Cerrar Sesion</NavText>
              <NavIcon>
                <FontAwesomeIcon icon={faPowerOff} />
              </NavIcon>
            </NavItem>
          )}
        </Nav>
      </SideNav>
      <main style={mainStyle}>
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/search/random" element={<RandomSearch />} />
        </Routes>
      </main>
    </Fragment>
  );
};

export default Sidebar;
