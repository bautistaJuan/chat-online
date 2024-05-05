customElements.define(
  "custom-title",
  class Title extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
      const style = document.createElement("style");
      style.textContent = `
        span{
            font-size: 30px;
            font-family: Roboto;
        }
        .custom-title {
            transition: transform 1s ease, opacity 1s ease;
        }
      `;
      this.shadow.appendChild(style);
    }

    render() {
      const titleContainer = document.createElement("span");
      const textInitial = "Todos los mensajes: ";
      titleContainer.textContent = textInitial;
      titleContainer.classList.add("custom-title");
      this.shadow.appendChild(titleContainer);

      // Cambiamos el titulo
      setTimeout(() => {
        titleContainer.textContent = "Por favor, se respetuoso";
        setTimeout(() => {
          titleContainer.innerHTML = `Disfruta de la app, con <span style="color:red"><3</span> Juan`;
          setTimeout(() => {
            titleContainer.textContent = textInitial;
          }, 2000);
        }, 2000);
      }, 1000);
    }
  }
);
