import { Button, Form, Select, Tag, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";

import BreadCrumb from "../components/Common/BreadCrumb";

import TextArea from "antd/lib/input/TextArea";

import { addNewRequest } from "../firebase/services";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { userSelector } from "../store/selector";
import { auth } from "../firebase/config";

const Request = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Đồ vật");
  const [department, setDepartment] = useState("IT");
  const [priority, setPriority] = useState("Low");
  const user = useSelector(userSelector)

  const handleSendRequest = async () => {
    
    setIsLoading(true);
    if (content.trim()) {
      const data = {
        author:user.name,
        email: user.email,
        uid: user.uid,
        department,
        category,
        priority,
        content: content.trim(),
        isConfirm: false
      };
      console.log(data)
      try {
        await addNewRequest(data);
        toast("Gửi yêu cầu thành công!");
        setContent("");
        setIsLoading(false);
      } catch (error) {
        toast("Gửi yêu cầu thất bại!");
        setIsLoading(false);
      }
    } else {
      toast("Vui lòng điền đầy đủ thông tin!");
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ padding: "15px", backgroundColor: "#EFF2F5", height: "100%" }}
    >
      <Content>
        <div style={{ marginBottom: "15px" }}>
          <BreadCrumb value="Yêu cầu" />
        </div>
        <Typography.Title>Yêu cầu</Typography.Title>
        <div style={{ backgroundColor: "#ffffff", padding: "25px" }}>
          <Content>
            <Form
              onSubmitCapture={handleSendRequest}
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="vertical"
            >
              <Form.Item label="Chi tiết yêu cầu">
                <TextArea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Độ ưu tiên">
                <Select
                  defaultValue={priority}
                  onChange={(e) => setPriority(e)}
                >
                  <Select.Option value="Low" lable="Low">
                    <Tag color="gray">Low</Tag>
                  </Select.Option>
                  <Select.Option value="Medium" lable="Medium">
                    <Tag color="blue">Medium</Tag>
                  </Select.Option>
                  <Select.Option value="High" lable="High">
                    <Tag color="red">High</Tag>
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Danh mục">
                <Select
                  defaultValue={category}
                  onChange={(e) => setCategory(e)}
                >
                  <Select.Option value="Đồ vật">Đồ vật</Select.Option>
                  <Select.Option value="Kinh phí">Kinh phí</Select.Option>
                  <Select.Option value="Khác...">Khác...</Select.Option>
                </Select>
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
              <Button htmlType="submit" loading={isLoading}>
                Gửi yêu cầu
              </Button>
            </Form>
          </Content>
        </div>
      </Content>
    </div>
  );
};

export default Request;
