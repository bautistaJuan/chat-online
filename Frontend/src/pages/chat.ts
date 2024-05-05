import { state } from "../state";

type Message = {
  from: string;
  text: string;
};

class ChatPage extends HTMLElement {
  shadow: ShadowRoot;
  messages: Message[] = [];
  constructor() {
    super();
    // SE AGREGAN LOS ESTILOS A LA PAGE
    this.shadow = this.attachShadow({ mode: "open" });
    var style = document.createElement("style");
    style.textContent = `

    .submit-message{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .input-container{
      width: 100%;
    } 
 
     .input-element{
       display: flex;
       border: 2px solid #000000;
       box-sizing: border-box;
       border-radius: 4px;  
       width: 100%;
       height: 55px;
       font-size: 20px;
       padding: 0px 10px;
       flex-grow: 2;
     }
 
     .input-name-label{
       display:block;
       font-size: 18px;
       font-family: Roboto;
       font-weight: 400;
     }
 
     .input-button{
        display: flex;
        align-items: center;
       color: white;
       background-color: #1c7341;
       max-width: 90px;
       border: none;
       box-sizing: border-box;
       border-radius: 4px;  
       height: 55px;
       font-size: 22px;
       font-family: Roboto;
       font-weight: 500;
       flex-grow: 0;
     }

     .page-container{
      margin: 0 auto;
      height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 716px;
      justify-content: center;
    }

    .chat-container {
      border: black 0.5px solid;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 10px 10px;
      overflow: auto;
      height: 100%;
    }
    
    .chat-container::-webkit-scrollbar {
      width: 12px;
    }
    
    .chat-container::-webkit-scrollbar-track {
      background: #d8d8d8;
    }
    
    .chat-container::-webkit-scrollbar-thumb {
      background-color: #9cbbe9;
      border-radius: 20px;
      border: 3px solid #d8d8d8;
    }
    `;
    this.shadow.appendChild(style);
  }

  connectedCallback() {
    state.subscribe(() => {
      const currentState = state.getState();
      this.messages = currentState.messages;
      this.shadow.lastChild!.remove();
      this.render();
    });
    // SE TRAEN LOS MENSAJES DEL STATE Y SE RENDERIZA CHAT
    const currentState = state.getState();
    this.messages = currentState.messages;
    this.render();
  }
  // Listeners para enviar mensajes al state
  addListeners() {
    const form = this.shadow.querySelector(".submit-message")!;
    form.addEventListener("submit", e => {
      e.preventDefault();
      const target = e.target as any;
      let newMessage = target["new-message"].value;

      if (newMessage.trim() !== "") {
        // SE AGREGAN LOS NUEVOS MENSAJES A LA RTDB
        state.pushNewMessage(newMessage);
      } else {
        alert(
          "Lo siento, pero no puedes enviar mensajes vacíos. Vuelve a intentarlo otra vez."
        );
      }
    });
  }

  render() {
    // HTML Element root de chat-page
    const chatPage = document.createElement("div");
    chatPage.classList.add("page-container");
    chatPage.innerHTML = `
     <custom-title></custom-title>
     <div class="chat"></div>
     <form class="submit-message">
      <input class="input-element" type="text" name="new-message">
      <button class="input-button">Enviar</button>
     </form>
    `;

    // SE HACE UNA REFERENCIA A LA CHAT SECTION Y SE LE DA SU CLASE
    var chatSection = chatPage.querySelector(".chat")!;
    chatSection.classList.add("chat-container");

    // LA FUNCION CREATECHATBUBBLES RECIBE LOS MENSAJES QUE LLEGAN DEL STATE.MESSAGES
    // Y LOS AGREGA AL CHAT CONTAINER
    function createChatBubbles(messages: Message[]) {
      // ITERA LOS MENSAJES QUE ACTUALMENTE ESTAN EN EL STATE
      for (const message of messages) {
        const currentState = state.getState();

        // SE CREAN LOS CONTENEDORES DE LAS BUBBLES
        const bubble = document.createElement("div");

        // PARA LOS MENSAJES PROPIOS
        if (message.from === currentState.nombre) {
          bubble.innerHTML = `
          <user-bubble text="${message.text}" username="${message.from}"></user-bubble>`;
          chatSection.appendChild(bubble);
        }

        //PARA MENSAJES DE OTROS USERS
        if (message.from !== currentState.nombre) {
          bubble.innerHTML = `
          <gray-bubble text="${message.text}" username="${message.from}"></user-bubble>`;
          chatSection.appendChild(bubble);
        }
      }
    }
    // SE CREAN LAS BURBUJAS
    createChatBubbles(this.messages);

    // SE AGREGAN AL SHADOW
    this.shadow.appendChild(chatPage);

    // SE ASIGNA UN SCROLL AUTOMATICO PARA LLEGAR AL ULTIMO MENSAJE
    chatSection.scrollTo({
      top: 1000,
      left: 0,
      behavior: "auto",
    });

    // SE ACTUALIZAN LOS LISTENERS
    this.addListeners();
  }
}
customElements.define("chat-page", ChatPage);
