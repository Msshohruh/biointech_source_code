import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
const firebaseConfig = {
  // Your firebase Api
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export const months = {
  "01": "Yan",
  "02": "Fev",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Iyn",
  "07": "Iyl",
  "08": "Avg",
  "09": "Sen",
  10: "Okt",
  11: "Noy",
  12: "Dek",
  Yan: "01",
  Fev: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Iyn: "06",
  Iyl: "07",
  Avg: "08",
  Sen: "09",
  Okt: "10",
  Noy: "11",
  Dek: "12",
};

export function toFormat(item) {
  const timeFormat = `${item.slice(7)}-${
    months[`${item.slice(3, 6)}`]
  }-${item.slice(0, 2)}`;
  return timeFormat;
}
