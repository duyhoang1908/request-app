import { render } from "@testing-library/react";
import { Space, Table, Tag, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import BreadCrumb from "../components/Common/BreadCrumb";
import { converTimeStamp } from "../firebase/convertTimeStamp";
import { getAllRequests, handleChangeConfirmRequest } from "../firebase/services";


const ListRequest = () => {
  const [request, setRequest] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRequests();
        setRequest(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const changeConfirm = async(id) => {
    try {
      await handleChangeConfirmRequest(id)
      toast('Thay đổi thành công!')
    } catch (error) {
      toast('Đã có lỗi xảy ra!')
    }
  }

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
      render: (_, { isConfirm, id }) => {
        let color = isConfirm ? "blue" : "red";
        let value = isConfirm ? "Đã xác nhận" : "Chưa xác nhận";
        return <Tag onClick={() => changeConfirm(id)} color={color}>{value}</Tag>;
      },
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
      render: (_, { id }) => {
        return <Link to={`/detail/${id}`}>Xem chi tiết</Link>;
      },
    }
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

export default ListRequest;
