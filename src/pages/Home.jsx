import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SideBar from "../components/SideBar/SideBar";

import 'react-toastify/dist/ReactToastify.css';
import { getUserByUid } from "../firebase/services";
import { useDispatch } from "react-redux";
import { userSlice } from "../store/slice/userSlice";
import { auth } from "../firebase/config";

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem("userID"))
    if(userID) {
      const fetchData = async () => {
        try {
          const userInfo = await getUserByUid(userID)
          dispatch(userSlice.actions.setUser(userInfo))
          navigate("/request")
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }
    else{
      navigate("/login")
    }
  },[])

  return (
    <div>
        <ToastContainer />
      <Row style={{ width: "100%", height: "100vh" }}>
        <Col span={4}>
          <SideBar />
        </Col>
        <Col span={20}>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
