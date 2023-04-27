import Home from "../pages/Home";
import ListRequestOfDepartment from "../pages/Manager/ListRequestOfDepartment";
import StaffOfDepartment from "../pages/Manager/StaffOfDepartment";
import MyRequest from "../pages/Staff/MyRequest";
import Profile from "../pages/Staff/Profile";
import Request from "../pages/Staff/Request";

export const staffRouter = [
  {
    component: Home,
    path: "/",
  },
  {
    component: Request,
    path: "/request/:id",
  },
  {
    component: MyRequest,
    path: "/myrequest",
  },
  {
    component: Profile,
    path: "/profile/:id",
  },
];

export const managerRouter = [
  {
    component: ListRequestOfDepartment,
    path: "/list/:department",
  },
  {
    component: StaffOfDepartment,
    path: "/staff/:department",
  },
];
