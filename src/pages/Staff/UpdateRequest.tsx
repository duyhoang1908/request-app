import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import { db } from "../../firebase/config";
import MainLayout from "../../Layout/MainLayout";
import { userSelector } from "../../redux/Slice/UserSlice";
import { Request } from "../../types";
import { getRequestById, updateRequest } from "../../utils/connectFirebase";

const initFormRequest = {
  content: "",
  priority: "Low",
  department: "IT",
  category: "Đồ vật",
  comment: [
    {
      author: "",
      role: "",
      content: "",
      createAt: 0,
    },
  ],
  id: "",
  requestID: "",
  createAt: 0,
  isConfirm: false,
};
const UpdateRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(initFormRequest);
  const [comment, setComment] = useState<string>("");

  const user = useSelector(userSelector);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRequestById(id as string);
        setRequest(data);
      } catch (error) {}
    };

    fetchData();
  }, [id]);

  const sendComment = async () => {
    let commnents: any[] = [];
    if (request.comment) {
      commnents = [
        ...request.comment,
        {
          author: user.name,
          role: user.role,
          content: comment,
          createAt: Date.now(),
        },
      ];
    } else {
      commnents = [
        {
          author: user.name,
          role: user.role,
          content: comment,
          createAt: Date.now(),
        },
      ];
    }
    try {
      await updateDoc(doc(db, "Request", request.id), {
        comment: commnents,
      });
      setComment("");
      const newData = () => ({
        ...request,
        comment: [
          ...request.comment,
          {
            author: user.name,
            role: user.role,
            content: comment,
            createAt: Date.now(),
          },
        ],
      });
      setRequest(newData);
    } catch (error) {
      toast("Đã có lỗi xảy ra");
    }
  };

  console.log(request);

  const handleSendRequest = async () => {
    if (request.content.trim()) {
      const data = {
        author: user.name,
        email: user.email,
        uid: user.uid,
        department: request.department,
        category: request.category,
        priority: request.priority,
        content: request.content.trim(),
        isConfirm: request.isConfirm,
        requestID: request.requestID,
        createAt: request.createAt,
        comment: request.comment,
      };

      try {
        await updateRequest(request.id, data);
        navigate("/myrequest");
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
  };

  const handleChange =
    (name: keyof Request) =>
    (
      e:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      setRequest((prev) => ({ ...prev, [name]: e.target.value }));
    };

  console.log(request);

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
          value={request?.content}
          onChange={handleChange("content")}
        />

        <select
          id="countries"
          value={request.priority}
          onChange={handleChange("priority")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          id="countries"
          value={request.category}
          onChange={handleChange("category")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="Đồ vật">Đồ vật</option>
          <option value="Kinh phí">Kinh phí</option>
          <option value="Khác...">Khác...</option>
        </select>

        <select
          id="countries"
          value={request.department}
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

      <div className="mt-10">
        <div>
          {request?.comment?.map((item) => (
            <div className="flex mb-4 text-sm gap-3">
              <div className="font-semibold">{item.author}:</div>{" "}
              <div>{item.content}</div>
            </div>
          ))}
          <div>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Bình luận"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  sendComment();
                }
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UpdateRequest;
