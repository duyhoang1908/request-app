import { async } from "@firebase/util";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
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

export const addNewRequest = async(data) => {
    try {
        await addDocument("Request",data)
    } catch (error) {
        console.log(error)
    }
}

export const getRequestsByUid = async (uid) => {
    let data = [];
    const q = query(collection(db, "Request"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
};