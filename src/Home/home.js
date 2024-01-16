import homecss from "./home.css?raw"
import homehtml from "./home.html?raw"

export class Home extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() { 
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const homePage = document.createElement('div');
        homePage.innerHTML = homehtml 
        style.innerHTML = homecss

        shadow.appendChild(style);
        shadow.appendChild(homePage) 
    }

}
