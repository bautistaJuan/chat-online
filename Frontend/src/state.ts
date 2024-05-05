import { onValue, ref } from "firebase/database";
import { db } from "../db";
import { Router } from "@vaadin/router";
import { map } from "lodash";
const API_BASE_URL = "http://localhost:8080";

const state = {
  data: {
    nombre: null,
    email: null,
    messages: [],
  },
  listeners: [],

  init() {
    const currentState = this.getState();

    const { nombre, email } = JSON.parse(localStorage.getItem("userData")!);
    if (nombre && email) {
      currentState.nombre = nombre;
      currentState.email = email;
    }

    const messagesFromFB = ref(db, "/rooms/messages");
    const messages = onValue(messagesFromFB, snapshot => {
      const messagesSnap = snapshot.val();
      const lodashMessages = map(messagesSnap);
      currentState.messages = lodashMessages;
      this.setState(currentState);
    });
    return messages;
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    const { nombre, email } = this.getState();
    const saveOnLocal = { nombre, email };
    if (nombre && email) {
      localStorage.setItem("userData", JSON.stringify(saveOnLocal));
    }

    console.log("El nuevo estado es:", newState);
    for (const callback of this.listeners) {
      callback();
    }
  },
  setNombre(nombre: string) {
    const currentState = this.getState();
    currentState.nombre = nombre;
    this.setState(currentState);
  },

  setEmail(email: string) {
    const currentState = this.getState();
    currentState.email = email;
    this.setState(currentState);
  },

  pushNewMessage(message: string) {
    const nameFromState = this.data.nombre;

    fetch(API_BASE_URL + "/rooms/messages", {
      headers: { "content-type": "application/json" },
      method: "post",
      body: JSON.stringify({
        from: nameFromState,
        text: message,
      }),
    });
  },
};

export { state };
