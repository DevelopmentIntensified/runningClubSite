import { routes } from "../../data/routes";

export class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const headerElement = document.createElement('header');
    const nav = document.createElement('nav');
    const linkList = document.createElement('ul');
    const style = document.createElement('style');

    routes.forEach((route) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = route.name;
      a.href = route.path;
      li.appendChild(a);
      linkList.appendChild(li);
    })

    nav.appendChild(linkList);
    nav.classList.add('not-mobile');

    style.textContent = `
      nav {
        background-color: #941b1b;
        color: white;
height: 2.5em;
      }
      header {
        display:block;
        width: 100%;
      }
      a {
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
height: 100%;
padding: 0px 1rem;
      }
      a:hover {
        background-color: #bd2828;
      }
     ul {
       display: flex;
       list-style: none;
       margin: 0;
       justify-content: center;
       flex-direction: row;
     }`

    shadow.appendChild(style);
    shadow.appendChild(headerElement);
    headerElement.appendChild(nav);
    console.log(style.isConnected);
  }
}

