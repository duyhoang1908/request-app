import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import ListRequest from "./pages/ListRequest";
import Login from "./pages/Login";
import MyRequest from "./pages/MyRequest";
import Register from "./pages/Register";
import Request from "./pages/Request";
import { userSelector } from "./store/selector";

function App() {
  const {role} = useSelector(userSelector)
  return(
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="myrequest" element={<MyRequest />} />
          <Route path="request" element={<Request />} />
          {role === "manager" && <Route path="list" element={<ListRequest />} />}
          <Route path="detail/:id" element={<Detail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>

  )
}

export default App;
