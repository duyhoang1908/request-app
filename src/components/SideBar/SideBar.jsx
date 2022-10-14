import { Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSelector } from "../../store/selector";
import { userSlice } from "../../store/slice/userSlice";

const SideBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {role} = useSelector(userSelector)

  const handleLogOut = () => {
    localStorage.removeItem("userID")
    dispatch(userSlice.actions.setUser({}))
    navigate("/login")
  }

  return (
    <>
      <Menu
        mode="inline"
      >
        <Menu.Item defaultChecked={true}><Link to="/request">Yêu cầu</Link></Menu.Item>
        <Menu.Item><Link to="/myrequest">Yêu cầu của tôi</Link></Menu.Item>
        {role === "manager" && <Menu.Item><Link to="/list">Danh sách</Link></Menu.Item>}
        <Menu.Item>Nhân viên</Menu.Item>
        <Menu.Item onClick={handleLogOut}>Đăng xuất</Menu.Item>
      </Menu>
    </>
  );
};

export default SideBar;
