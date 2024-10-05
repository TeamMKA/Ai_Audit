// src/utils/uploadDocuments.js
import { db } from "./firebase.js";
import { collection, addDoc } from 'firebase/firestore';

const uploadDocuments = async (documents) => {
  try {
    const promises = documents.map((doc) => addDoc(collection(db, 'transactions'), doc));
    await Promise.all(promises);
    console.log("Documents uploaded successfully!");
  } catch (error) {
    console.error("Error uploading documents: ", error);
  }
};

export default uploadDocuments;
