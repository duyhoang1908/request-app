import { Routes, useNavigate, Outlet, Navigate, Route } from "react-router-dom";
import { useEffect } from "react";
import { managerRouter, staffRouter } from "./routers";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import { useAuthContext } from "./context/AuthContext";
import JWTManager from "./utils/jwt";
import jwtDecode from "jwt-decode";
import { AccessToken } from "./types/token.type";
import { getUserById } from "./apis/request.api";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const { checkAuth, isAuthenticated, setUser, setIsAuthenticated } =
    useAuthContext();

  useEffect(() => {
    const authenticate = async () => {
      try {
        //Kiem tra refesh token con han ? lay du lieu nguoi dung : dieu huong ve login
        const success = await checkAuth();
        if (success) {
          setIsAuthenticated(true);
          const { id } = jwtDecode<AccessToken>(
            JWTManager.getToken() as string
          );
          const user = await getUserById(id);
          setUser(user.data.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log("error", error);
        navigate("/login");
      }
    };
    authenticate();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        {staffRouter.map((route) => {
          const Page = route.component;
          return (
            <Route path={route.path} key={route.path} element={<Page />} />
          );
        })}

        <Route element={<CheckRoute role="manager" />}>
          {managerRouter.map((route) => {
            const Page = route.component;
            return (
              <Route path={route.path} key={route.path} element={<Page />} />
            );
          })}
        </Route>

        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </div>
  );
}

export default App;

const CheckRoute = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.role !== role) navigate("/");
  }, [user, role]);
  return <Outlet />;
};
