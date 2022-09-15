import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <Menu
        mode="inline"
      >
        <Menu.Item defaultChecked><Link to="/request">Yêu cầu</Link></Menu.Item>
        <Menu.Item><Link to="/myrequest">Yêu cầu của tôi</Link></Menu.Item>
        <Menu.Item><Link to="/list">Danh sách</Link></Menu.Item>
        <Menu.Item>Nhân viên</Menu.Item>
      </Menu>
    </>
  );
};

export default SideBar;
