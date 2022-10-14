import { render } from "@testing-library/react";
import { Space, Table, Tag, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BreadCrumb from "../components/Common/BreadCrumb";
import { converTimeStamp } from "../firebase/convertTimeStamp";
import { getMyRequest } from "../firebase/services";
import { userSelector } from "../store/selector";

const MyRequest = () => {
  const [request, setRequest] = useState([])
  const user = useSelector(userSelector)
  console.log(user.uid)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyRequest(user.uid);
        console.log(data)
        setRequest(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Người tạo",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Độ ưu tiên",
      dataIndex: "priority",
      key: "priority",
      render: (_, { priority }) => {
        let color =
          priority === "Medium" ? "blue" : priority === "Low" ? "gray" : "red";
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createAt",
      key: "createAt",
      render: (_, { createAt }) => <>{converTimeStamp(createAt)}</>,
      defaultSortOrder: 'descend',
    sorter: (a, b) => a.createAt - b.createAt,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        let color = status ? "blue" : "red";
        let value = status ? "Đã xác nhận" : "Chưa xác nhận";
        return <Tag color={color}>{value}</Tag>;
      },
    },
  ];
 
  return (
    <div
      style={{ padding: "15px", backgroundColor: "#EFF2F5", height: "100%" }}
    >
      <div style={{ marginBottom: "15px" }}>
        <BreadCrumb value="Yêu cầu của tôi" />
      </div>
      <Typography.Title>Yêu cầu của tôi</Typography.Title>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "25px",
          height: "80vh",
          overflowY: "auto",
        }}
      >
        <Content>
          <Table columns={columns} dataSource={request} />
        </Content>
      </div>
    </div>
  );
};

export default MyRequest;
