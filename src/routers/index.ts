import Home from "../pages/Home";
import ListRequestOfDepartment from "../pages/Manager/ListRequestOfDepartment";
import StaffOfDepartment from "../pages/Manager/StaffOfDepartment";
import MyRequest from "../pages/Staff/MyRequest";
import Request from "../pages/Staff/Request";
import UpdateRequest from "../pages/Staff/UpdateRequest";

export const staffRouter = [
  {
    component: Request,
    path: "/request",
  },
  {
    component: Home,
    path: "/",
  },
  {
    component: MyRequest,
    path: "/myrequest",
  },
  {
    component: UpdateRequest,
    path: "/update/:id",
  },
];

export const managerRouter = [
  ...staffRouter,
  {
    component: ListRequestOfDepartment,
    path: "/list/:department",
  },
  {
    component: StaffOfDepartment,
    path: "/staff/:department",
  },
];
