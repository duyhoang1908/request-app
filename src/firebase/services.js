import { async } from "@firebase/util";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./config";

export const addDocument = async (collectionName, data) => {
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

export const addNewUser = async (data) => {
  try {
    await addDocument("User", data);
  } catch (error) {
    console.log(error);
  }
};

export const addNewRequest = async (data) => {
  try {
    await addDocument("Request", data);
  } catch (error) {
    console.log(error);
  }
};

export const getRequestsByUid = async (uid) => {
  let data = [];
  const q = query(collection(db, "Request"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const getUserByUid = async (uid) => {
  let data = {};
  const q = query(collection(db, "User"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = { ...doc.data(), id: doc.id };
  });
  return data;
};

export const getRequestById = async (id) => {
  let data = {};
  const q = query(collection(db, "Request"), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = { ...doc.data(), id: doc.id };
  });
  return data;
};

export const getAllRequests = async () => {
  let data = [];
  const q = collection(db, "Request");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const getMyRequest = async (uid) => {
  let data = [];
  const q = query(collection(db, "Request"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const handleChangeConfirmRequest = async (id) => {
    const requestRef = doc(db,"Request",id)
    await updateDoc(requestRef, {
      isConfirm: true
    })
}
