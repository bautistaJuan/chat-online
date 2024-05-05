class UserMessage extends HTMLElement {
  user: string;
  message: string;
  constructor() {
    super();
    this.render();
  }
  render() {
    var style = document.createElement("style");
    style.textContent = `
      .bubble{
        width: max-content;
        max-width: 250px;
        background-color: #0a626c;
        border: none;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        margin: 0 0 auto auto;
      }
  
      .message-text{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: white;
        text-align: right;
      }
      `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(style);

    const text = this.getAttribute("text");

    const div = document.createElement("div");

    div.innerHTML = `
      <div class="bubble"><span class="message-text">${text}</span></div>
      `;

    shadow.appendChild(div);
  }
}
customElements.define("user-bubble", UserMessage);

class OtherMessage extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    var style = document.createElement("style");
    style.textContent = `
      .bubble{
        width: max-content;
        max-width: 250px;
        background-color: #2b2b2b;
        border: none;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        margin: 0 auto auto 0;
      }
  
      .message-text{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: white;
        text-align: left;
      }
  
      .username{
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      color: #4f504f;
      }
      `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(style);

    const div = document.createElement("div");

    const text = this.getAttribute("text");
    const username = this.getAttribute("username");

    div.innerHTML = `
      <label class="username">${username}</label>
      <div class="bubble"><span class="message-text">${text}</span></div>
      `;

    shadow.appendChild(div);
  }
}
customElements.define("gray-bubble", OtherMessage);
