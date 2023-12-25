let self;

export class Tab extends HTMLLIElement {

  constructor() {
    self = super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    const tabElement = document.createElement('li');
    tabElement.innerText = this.innerText;

    shadow.appendChild(style);
    shadow.appendChild(tabElement);

  }
}
