import { Form, Input } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Button } from "antd/lib/radio";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../firebase/config";
import { userSlice } from "../store/slice/userSlice";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    if (account.trim() && password.trim()) {
      try {
        await signInWithEmailAndPassword(auth, account, password)
        localStorage.setItem("userID", JSON.stringify(auth.currentUser.uid))
        setIsLoading(false);
        navigate("/")
      } catch (error) {
        toast("Đăng nhập thất bại!");
        setIsLoading(false);
      }
    } else {
      toast("Vui lòng nhập đủ thông tin!");
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <ToastContainer />
      <div
        style={{
          margin: "auto",
          backgroundColor: "#fff",
          padding: "40px 25px",
          borderRadius: "15px",
          minWidth: "600px",
        }}
      >
        <Content>
          <Form layout="vertical">
            <Form.Item label="Tên đăng nhập" name="account">
              <Input
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Mật khẩu" name="password">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
            <Button style={{marginRight:"20px"}} type="primary" onClick={handleLogin} loading={isLoading}>
              Đăng nhập
            </Button>
            <Button>
              <Link to="/register">Đăng ký</Link>
            </Button>
            </Form.Item>
          </Form>
        </Content>
      </div>
    </div>
  );
};

export default Login;
