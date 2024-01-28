import aboutStyles from './about.css?raw';
import aboutHtml from './about.html?raw';

export class About extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const homePage = document.createElement('div');
        homePage.innerHTML = aboutHtml
        style.innerHTML = aboutStyles

        shadow.appendChild(style);
        shadow.appendChild(homePage)
    }

}
