export class About extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() { 
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
const homePage = document.createElement('div');
        homePage.innerHTML = "About"

    shadow.appendChild(style);
       shadow.appendChild(homePage) 
    }

}
