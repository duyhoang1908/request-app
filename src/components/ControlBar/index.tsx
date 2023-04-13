import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaAngleLeft } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";

type Props = {
  isShowBar: boolean;
  setIsShowBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const ControlBar = ({ isShowBar, setIsShowBar }: Props) => {
  const navigate = useNavigate();

  const { clearToken, setUser } = useAuthContext();

  const { user } = useAuthContext();

  const handleLogOut = () => {
    clearToken();
    setUser(null);
    navigate("/login");
  };

  const toggleShowBar = () => {
    setIsShowBar(!isShowBar);
  };

  return (
    <div className="relative h-full bg-slate-700 pt-10 lg:pt-0">
      <div
        onClick={toggleShowBar}
        className="p-3 text-white text-lg lg:hidden absolute top-0 right-[5px] hover:cursor-pointer"
      >
        {isShowBar ? <FaAngleLeft /> : <FaBars />}
      </div>
      <div
        className={`flex flex-col px-4 py-5 gap-2 ${
          isShowBar ? "" : "hidden lg:block"
        }`}
      >
        <NavLink
          to="/request/add"
          className={({ isActive }) =>
            `block px-2 py-1 hover:text-black hover:bg-gray-100 hover:border-r-4 border-blue-600 hover:cursor-pointer duration-75 ${
              isActive ? "text-black bg-gray-100 border-r-4" : "text-white"
            }`
          }
        >
          Yêu cầu
        </NavLink>
        <NavLink
          to="/myrequest"
          className={({ isActive }) =>
            `block px-2 py-1 hover:text-black hover:bg-gray-100 hover:border-r-4 border-blue-600 hover:cursor-pointer duration-75 ${
              isActive ? "text-black bg-gray-100 border-r-4" : "text-white"
            }`
          }
        >
          Yêu cầu của tôi
        </NavLink>

        {user?.role === "manager" && (
          <>
            <NavLink
              to={`/list/${user?.department}`}
              className={({ isActive }) =>
                `block px-2 py-1 hover:text-black hover:bg-gray-100 hover:border-r-4 border-blue-600 hover:cursor-pointer duration-75 ${
                  isActive ? "text-black bg-gray-100 border-r-4" : "text-white"
                }`
              }
            >
              {`Yêu cầu phòng ${user?.department}`}
            </NavLink>

            <NavLink
              to={`/staff/${user?.department}`}
              className={({ isActive }) =>
                `block px-2 py-1 hover:text-black hover:bg-gray-100 hover:border-r-4 border-blue-600 hover:cursor-pointer duration-75 ${
                  isActive ? "text-black bg-gray-100 border-r-4" : "text-white"
                }`
              }
            >
              {`Nhân viên phòng ${user?.department}`}
            </NavLink>
          </>
        )}
        <div
          onClick={handleLogOut}
          className="block px-2 py-1 text-white hover:text-black hover:bg-gray-100 hover:border-r-4 border-blue-600 hover:cursor-pointer duration-75"
        >
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
