import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import MainLayout from "../../Layout/MainLayout";
import { User } from "../../types";

import { getStaffOfDepartment } from "../../apis/request.api";

const StaffOfDepartment = () => {
  const { department } = useParams();

  const { data } = useQuery({
    queryKey: [`staff${department}`, department],
    queryFn: () => getStaffOfDepartment(department as string),
    enabled: department !== undefined,
    onError: () => {
      toast("Đã có lỗi xảy ra.");
    },
  });

  return (
    <MainLayout>
      <Title
        name={`Nhân viên phòng ${department}`}
        title={`Nhân viên phòng ${department}`}
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tên người dùng
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Email</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Phòng ban</div>
              </th>

              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Chức vụ</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((user) => (
              <TableRow key={user._id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default StaffOfDepartment;

const TableRow = ({ user }: { user: User }) => {
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {user.username}
      </th>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {user.email}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {user.department}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {user.role === "staff"
          ? "Nhân viên"
          : user.role === "manager"
          ? "Quản lý"
          : "Admin"}
      </td>
    </tr>
  );
};
