import { routes } from "../../data/routes";
import navcss from "./nav.css?raw"
import logoSrc from "./logo.png"
/** dependencies
  * routes: array of { name: string, path: string, component: string }
  * this is a very long sentence
*/

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
    const logo = document.createElement('img');
    const logoLink = document.createElement('a');

    logo.src = logoSrc
    logoLink.href = "https:\\www.liberty.edu"
    logoLink.className = "logoLink"
    style.innerHTML = navcss

    routes.forEach((route) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = route.name;
      a.href = route.path;
      a.className = "tab"
      a.onclick = function(e) {
        history.pushState(route.path,"")
      }
      li.appendChild(a);
      linkList.appendChild(li);
    })

    logoLink.appendChild(logo)
    nav.appendChild(logoLink);
    nav.appendChild(linkList);
    nav.classList.add('not-mobile');

    shadow.appendChild(style);
    shadow.appendChild(headerElement);
    headerElement.appendChild(nav);
    console.log(style.isConnected);
  }
}

