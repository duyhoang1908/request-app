import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ListRequest from "./pages/ListRequest";
import Login from "./pages/Login";
import MyRequest from "./pages/MyRequest";
import Request from "./pages/Request";

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="myrequest" element={<MyRequest />} />
          <Route path="request" element={<Request />} />
          <Route path="list" element={<ListRequest />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>

  )
}

export default App;
