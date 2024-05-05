import { Router } from "@vaadin/router";
import { state } from "../state";

class Home extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    var style = document.createElement("style");
    style.textContent = `
    .page-container {
     display: flex;
     flex-direction: column;
     gap: 20px;
     max-width: 500px;
     align-items: center;
     justify-content: center;
     min-height: 95vh;
     margin: 0 auto;
    }
    .form{
      display: flex;
      flex-direction: column;      
    } 
   .input-element,.select-element{
      border: 2px solid #000000;
      box-sizing: border-box;
      border-radius: 4px;  
      width: 100%;
      max-width: 353px;
      height: 55px;
      font-size: 20px;
      padding: 0px 8px;
      margin-bottom: 25px;
    }
    .input-title{
     display:block;
     font-size: 18px;
     font-family: Roboto;
     font-weight: 400;
    }
    .input-button{
      cursor: pointer;
     margin-top: 20px;
     background-color: #258a60;
     width: 100%;
     max-width: 353px;
     border: none;
     box-sizing: border-box;
     border-radius: 4px;  
     height: 55px;
     font-size: 22px;
     font-family: Roboto;
     font-weight: 500;
     color: white;
    }`;
    this.shadow.appendChild(style);
  }

  addListeners() {
    const form = this.shadow.querySelector(".form")!;
    form.addEventListener("submit", (e: any) => {
      e.preventDefault();

      const name: string = e.target.nombre.value;
      const email: string = e.target.email.value;
      if (!email && !name) return null;
      state.setNombre(name);
      state.setEmail(email);
      Router.go("/chat");
    });
  }

  connectedCallback() {
    this.render();
  }
  render() {
    const pageDiv = document.createElement("div");
    pageDiv.classList.add("page-container");

    pageDiv.innerHTML = `
    <h1>Bienvenidx</h1>
    <form class="form">
      <span class="input-title">Tu Nombre</span>
      <input class="input-element" type="text" name="nombre" autocomplete="given-name">
      <span class="input-title">Email</span>
      <input class="input-element" type="email" name="email" autocomplete="off">
      <button class="input-button">Comenzar</button>
    </form>
    `;

    this.shadow.appendChild(pageDiv);
    this.addListeners();
  }
}
customElements.define("home-page", Home);
