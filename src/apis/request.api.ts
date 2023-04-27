import { Request, User, UserResponse } from "../types";
import http from "../utils/http";
import JWTManager from "../utils/jwt";

//User
export const getAllUser = () => http.get<UserResponse>("/user");
export const getUserById = (id: string) =>
  http.get<Omit<UserResponse, "accessToken">>(`/user/${id}`);

export const registerNewUser = (data: Omit<User, "_id" | "role">) =>
  http.post<UserResponse>("/register", data);

export const loginUser = (data: Pick<User, "email" | "password">) =>
  http.post<UserResponse>("/login", data, {
    withCredentials: true,
  });

export const updateAvatar = (img: any, id: string) => {
  const data = { img };
  return http.post(`/avatar/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
//Request
export const addNewRequest = (
  data: Omit<Request, "_id" | "__v" | "createAt">
) => http.post("/request", data);

export const getRequestDetail = (id: string) =>
  http.get<Request>(`/request/${id}`);

export const getListRequestByUserId = (id: string) =>
  http.get<Request[]>(`/list/${id}`, {
    headers: {
      Authorization: JWTManager.getToken()
        ? `Bearer ${JWTManager.getToken()}`
        : "",
    },
  });

export const getRequestOfDepartment = (department: string) =>
  http.get<Request[]>(`/department/${department}`);

export const getStaffOfDepartment = (department: string) =>
  http.get<User[]>(`/staff/${department}`);

export const updateRequest = (
  data: Pick<
    Request,
    "category" | "department" | "priority" | "content" | "_id"
  >
) => http.patch("/request/update", data);

export const confirmRequest = (id: string) =>
  http.patch(`/request/update/${id}`);
///request/update
