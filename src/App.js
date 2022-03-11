import { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Sidebar from "./components/ui/Sidebar";
import TokenAuth from "./config/token";
import AuthContext from "./context/Auth/AuthContext";

const token = localStorage.getItem("token");
if (token) TokenAuth(token);

const ProtectedRoute = ({ isAllowed, redirectPath = "/", children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <ProtectedRoute isAllowed={!!user} redirectPath={"/login"}>
            <Sidebar />
          </ProtectedRoute>
        }
      />

      <Route element={<ProtectedRoute isAllowed={!user} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

    </Routes>
  );
}

export default App;
