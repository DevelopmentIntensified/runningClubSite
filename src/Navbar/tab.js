export class Tab extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const tabElement = document.createElement('div');


  }
}
