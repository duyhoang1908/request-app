import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { Request, User } from "../types";

export const addDocument = async (collectionName: any, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createAt: Date.now(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addNewUser = async (data: Omit<User, "id">) => {
  try {
    await addDocument("User", data);
  } catch (error) {
    console.log(error);
  }
};

export const addNewRequest = async (data: Omit<Request, "id">) => {
  try {
    await addDocument("Request", data);
  } catch (error) {
    console.log(error);
  }
};

export const getRequestsByUid = async (uid: string) => {
  let data: any[] = [];
  const q = query(collection(db, "Request"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id as string });
  });
  return data;
};

export const getUserByUid = async (uid: string) => {
  let data: any;
  const q = query(collection(db, "User"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = { ...doc.data(), id: doc.id as string };
  });
  return data;
};

export const getRequestById = async (id: string) => {
  let data: any;
  const q = query(collection(db, "Request"), where("requestID", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = { ...doc.data(), id: doc.id };
  });
  return data;
};

export const getAllRequests = async () => {
  let data: any[] = [];
  const q = collection(db, "Request");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const getAllDepartment = async () => {
  let data: any[] = [];
  const q = collection(db, "Department");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const getRequestsByRole = async (role: string) => {
  let data: any[] = [];
  const q = query(collection(db, "Request"), where("department", "==", role));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const getMyRequest = async (uid: string) => {
  let data: any[] = [];
  const q = query(collection(db, "Request"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const getUserOfDepartment = async (name: string) => {
  let data: any[] = [];
  const q = query(collection(db, "User"), where("department", "==", name));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const handleChangeConfirmRequest = async (id: string) => {
  const requestRef = doc(db, "Request", id);
  await updateDoc(requestRef, {
    isConfirm: true,
  });
};

export const updateRequest = async (id: string, data: Request) => {
  const requestRef = doc(db, "Request", id);
  await updateDoc(requestRef, data);
};

export const deleteRequestById = async (id: string) => {
  await deleteDoc(doc(db, "Request", id));
};

export const getAllUser = async () => {
  let data: any[] = [];
  const q = collection(db, "User");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};
