import { matchRoutes, useLocation } from "react-router-dom";

const routes = [
    { path: "*" },
    { path: "/" },
    { path: "/search" },
    { path: "/search/random" },
];

const useCurrentPath = () => {
  const location = useLocation();
  const [{ route }] = matchRoutes(routes, location);

  return route.path;
};

export default useCurrentPath;
