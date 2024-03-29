import { routes } from "../../../data/routes";
import routercss from "./router.css?raw";

export class Router extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');

        const currentPath = window.location.pathname;
        const route = routes.find(route => route.path === currentPath ||( route.path === '/home' && currentPath === "/" ));

        style.innerHTML = routercss

        console.log(route);

        const currentElement = document.createElement("div");
        currentElement.className = "currentPage";

        currentElement.innerHTML = `
            <${route.component}></${route.component}>
        `

        shadow.appendChild(style);
        shadow.appendChild(currentElement);
    }
}
