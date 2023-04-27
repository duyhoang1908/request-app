export type User = {
  department: string;
  email: string;
  _id: string;
  username: string;
  role: string;
  password: string;
  avatar?: string;
};

export type UserResponse = {
  message: string;
  data: User;
  accessToken: string;
};

export type Request = {
  author: string;
  category: string;
  content: string;
  createAt: number;
  department: string;
  email: string;
  isConfirm: boolean;
  priority: string;
  uid: string;
  __v: number;
  _id: string;
};
