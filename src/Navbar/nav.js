export class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const headerElement = document.createElement('header');
    const nav = document.createElement('nav');

    nav.innerHTML = `
      <ul>

      <ul>
    `
    const style = document.createElement('style');

    style.textContent = `
      nav {
        align-items: center;
        justify-content: space-between;
        background-color: #941b1b;
        color: white;
      }
      header {
        display:block;
        width: 100%;
      }
      a {
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
        padding: 1rem;
      }`
    shadow.appendChild(style);
    shadow.appendChild(headerElement);
    headerElement.appendChild(nav);
    console.log(style.isConnected);
  }
}

