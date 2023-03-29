import { Routes, useNavigate, Outlet, Navigate, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userSlice } from "./redux/Slice/UserSlice";
import { getUserByUid } from "./utils/connectFirebase";
import { User } from "./types";
import { managerRouter, staffRouter } from "./routers";
import Request from "./pages/Staff/Request";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route element={<CheckRoute role="staff" />}>
          {staffRouter.map((route) => {
            const Page = route.component;
            return (
              <Route path={route.path} key={route.path} element={<Page />} />
            );
          })}
        </Route>

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

type Props = {
  role: string;
};

const CheckRoute = ({ role }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const value = localStorage.getItem("userID");

  useEffect(() => {
    const fetchData = async (uid: string) => {
      const userData = await getUserByUid(uid);
      console.log(userData);
      if (userData.role !== role) {
        navigate("/");
      }
      dispatch(userSlice.actions.setUser(userData));
    };

    if (typeof value === "string") {
      const uid = JSON.parse(value);
      fetchData(uid);
    }
  }, [value]);

  return typeof value === "string" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
