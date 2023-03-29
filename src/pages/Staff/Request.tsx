import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userSelector } from "../../redux/Slice/UserSlice";
import { addNewRequest } from "../../utils/connectFirebase";

import Title from "../../components/Title";
import MainLayout from "../../Layout/MainLayout";

const initFormRequest = {
  content: "",
  priority: "Low",
  department: "IT",
  category: "Đồ vật",
};

const Request = () => {
  const [requestForm, setRequestForm] = useState(initFormRequest);
  const user = useSelector(userSelector);

  const handleSendRequest = async () => {
    if (requestForm.content.trim()) {
      const data = {
        author: user.name,
        email: user.email,
        uid: user.uid,
        department: requestForm.department,
        category: requestForm.category,
        priority: requestForm.priority,
        content: requestForm.content.trim(),
        isConfirm: false,
        requestID: nanoid(),
        createAt: Date.now(),
      };
      try {
        await addNewRequest(data);
        toast("Gửi yêu cầu thành công!");
      } catch (error) {
        toast("Gửi yêu cầu thất bại!");
      }
    } else {
      toast("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendRequest();
    setRequestForm(initFormRequest);
  };

  const handleChange =
    (name: "content" | "priority" | "department" | "category") =>
    (
      e:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      setRequestForm((prev) => ({ ...prev, [name]: e.target.value }));
    };

  return (
    <MainLayout>
      <Title name="yêu cầu" title="Tạo yêu cầu" />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-10 flex flex-col gap-5"
      >
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Chi tiết yêu cầu"
          value={requestForm.content}
          onChange={handleChange("content")}
        />

        <select
          id="countries"
          value={requestForm.priority}
          onChange={handleChange("priority")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          id="countries"
          value={requestForm.category}
          onChange={handleChange("category")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="Đồ vật">Đồ vật</option>
          <option value="Kinh phí">Kinh phí</option>
          <option value="Khác...">Khác...</option>
        </select>

        <select
          id="countries"
          value={requestForm.department}
          onChange={handleChange("department")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="IT">IT</option>
          <option value="Media">Media</option>
        </select>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Gửi
        </button>
      </form>
    </MainLayout>
  );
};

export default Request;
