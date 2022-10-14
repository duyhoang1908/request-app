import { Breadcrumb } from "antd";
import React from "react";

const BreadCrumb = ({value}) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
      <Breadcrumb.Item>{value}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadCrumb;
