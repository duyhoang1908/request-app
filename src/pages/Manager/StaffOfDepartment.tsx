import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../../components/Title";
import MainLayout from "../../Layout/MainLayout";
import { User } from "../../types";
import { getUserOfDepartment } from "../../utils/connectFirebase";

const StaffOfDepartment = () => {
  const { department } = useParams();

  const [list, setList] = useState<User[] | any[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserOfDepartment(department as string);
        setList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [department]);

  console.log(list);
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
            {list?.map((user) => (
              <TableRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default StaffOfDepartment;

type Props = {
  user: User;
};

const TableRow = ({ user }: Props) => {
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {user.name}
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