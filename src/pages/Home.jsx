import { Col, Row } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SideBar from "../components/SideBar/SideBar";

import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
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
