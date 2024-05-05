// import {
//   QuerySnapshot,
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "../db";
import { rtdb } from "../db";
import { push, ref } from "firebase/database";

// Donde se van a almacenar los datos del usuario
// const collectionUsers = collection(db, "users");

export class chatModel {
  // static async singUp({ email, name }) {
  //   console.log("name: ", name);

  //   if (!email) {
  //     console.log("Error: Email es obligatorio");
  //     return null;
  //   }
  //   const doC = query(collectionUsers, where("email", "==", email));
  //   // const docRef = doc(collectionUsers, "DMx63fHKHi5KTApvGzDh");
  //   const data = await getDocs(doC);
  //   data.forEach(snap => {
  //     const user = snap.data();
  //     console.log(user.email);
  //   });

  //   // const docRef = doc(collectionUsers, "DMx63fHKHi5KTApvGzDh");
  //   // const dataOne = await getDoc(docRef);

  //   // console.log(dataOne.data());
  // }

  static async sendMessage({ from, text }) {
    const chatRef = ref(rtdb, "/rooms/messages");
    push(chatRef, {
      from,
      text,
    });
  }
}
