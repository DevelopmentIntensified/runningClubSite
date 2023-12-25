/** dependencies
  * routes: array of { name: string, path: string, component: string }
  * this is a very long sentence
*/

export class Navbar extends HTMLElement {
  static observedAttributes = ['routes'];
  
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const headerElement = document.createElement('header');
    const nav = document.createElement('nav');
    const routes = this.getAttribute('routes');
    const activeTab = this.getAttribute('active-tab');
    const style = document.createElement('style');

    routes.forEach(route => {
      const tab = document.createElement('li', { is: 'custom-tab' });
      tab.innerText = route.name;
      nav.appendChild(tab);
    })

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

