import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import MainLayout from "../../Layout/MainLayout";
import { Request } from "../../types";
import { converTimeStamp } from "../../utils/func";
import { confirmRequest, getRequestOfDepartment } from "../../apis/request.api";
import { useAuthContext } from "../../context/AuthContext";

const ListRequestOfDepartment = () => {
  const { user } = useAuthContext();
  const { department } = useParams();

  const { data } = useQuery({
    queryKey: [`request${department}`, department],
    queryFn: () => getRequestOfDepartment(department as string),
    enabled: department !== undefined,
    onError: (error: any) => toast(error.response.data.message),
  });

  return (
    <MainLayout>
      <Title
        name={`Yêu cầu phòng ${user?.department}`}
        title={`Yêu cầu phòng ${user?.department}`}
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Người tạo
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Phòng ban</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Danh mục</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Nội dung</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Độ ưu tiên</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Trạng thái</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Thời gian tạo
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data
              .sort((a: Request, b: Request) => b.createAt - a.createAt)
              .map((request) => (
                <TableRow key={request._id} request={request} />
              ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default ListRequestOfDepartment;

type Props = {
  request: Request;
};

const TableRow = ({ request }: Props) => {
  const [isConfirm, setIsConfirm] = useState<boolean>(request.isConfirm);
  const changeConfirm = useMutation({
    mutationFn: () => confirmRequest(request._id),
    onSuccess: () => {
      setIsConfirm(true);
      toast("Thay đổi thành công");
    },
    onError: () => {
      toast("Thay đổi thất bại");
    },
  });

  const handleChangeConfirm = () => {
    if (!isConfirm) changeConfirm.mutate();
  };

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {request.author}
      </th>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {request.department}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {request.category}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {request.content}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        <div
          className={`px-2 py-1 text-center text-white text-xs rounded-md ${
            request.priority.toLocaleLowerCase() === "low"
              ? "bg-gray-500"
              : request.priority.toLocaleLowerCase() === "medium"
              ? "bg-blue-600"
              : "bg-red-500"
          }`}
        >
          {request.priority}
        </div>
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        <div
          className={`px-2 py-1 text-center text-white text-xs rounded-md ${
            isConfirm
              ? "bg-blue-600 hover:cursor-not-allowed "
              : "bg-red-500 hover:cursor-pointer"
          }`}
          onClick={handleChangeConfirm}
        >
          {isConfirm ? "Đã xác nhận" : "Chưa xác nhận"}
        </div>
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {converTimeStamp(request.createAt)}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        <Link to={`/update/${request._id}`}>Sửa</Link>
      </td>
    </tr>
  );
};
