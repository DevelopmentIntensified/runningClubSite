import contactcss from "./contact.css?raw"
import contacthtml from "./contact.html?raw"

export class Contact extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() { 
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const contactPage = document.createElement('div');
        contactPage.innerHTML = contacthtml 
        style.innerHTML = contactcss

        shadow.appendChild(style);
        shadow.appendChild(contactPage) 
    }

}
