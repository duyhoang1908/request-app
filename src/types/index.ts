export type User = {
  createAt: number;
  department: string;
  email: string;
  id: string;
  name: string;
  role: string;
  uid: string;
};

export type Request = {
  author: string;
  category: string;
  content: string;
  createAt: number;
  department: string;
  email: string;
  id: string;
  isConfirm: boolean;
  priority: string;
  requestID: string;
  uid: string;
  comment?: object;
};

export type Comment = {
  author: string;
  role: string;
  content: string;
  createAt: number;
};
