import images from "../../../static/images.json";
import slidercss from "./slider.css?raw"
import sliderhtml from "./slider.html?raw"

export class Slider extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() { 
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const slider = document.createElement('div');
        style.innerHTML = slidercss 
        slider.innerHTML = sliderhtml

        const sliderEl = slider.getElementsByClassName("slider").item(0)
        console.log(sliderEl)
        console.log(images)
        for (let i = 0; i < 1/* images.length */; i++) {
            const image = images[i];
            const imageWrapperEl = document.createElement("div")
            const imageEl = document.createElement("img")

            imageEl.src = image.src
            imageEl.setAttribute("alt",image.alt)
            imageWrapperEl.appendChild(imageEl)
            imageWrapperEl.className = "slide";
            sliderEl.appendChild(imageWrapperEl)
        }


        shadow.appendChild(style);
        shadow.appendChild(slider) 
    }

}
