import { Form, Input, Select } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Button } from "antd/lib/radio";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { newUserData } from "../ultils/contants";
import { addNewUser } from "../firebase/services";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("IT");

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, {
        displayName: name
      })
      const data = newUserData(email, name, department, auth.currentUser.uid)
      await addNewUser(data)
      console.log(data)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
            <Form.Item label="Email" name="email">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item label="Mật khẩu" name="password">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Tên người dùng" name="name">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Phòng ban">
              <Select
                defaultValue={department}
                onChange={(e) => setDepartment(e)}
              >
                <Select.Option value="IT">IT</Select.Option>
                <Select.Option value="Media">Media</Select.Option>
              </Select>
            </Form.Item>
            <Button type="primary" loading={isLoading} onClick={handleRegister}>
              Đăng ký
            </Button>
          </Form>
        </Content>
      </div>
    </div>
  );
};

export default Register;
