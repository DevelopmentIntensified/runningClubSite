import { About } from './src/About'
import { Router } from './src/Components/Router'
import { Slider } from './src/Components/Slider'
import { Contact } from './src/Contact'
import { Home } from './src/Home'
import { Navbar, Tab } from './src/Navbar'
import './style.css'

customElements.define("custom-slider", Slider)
customElements.define('nav-bar', Navbar)
customElements.define('custom-tab', Tab)
customElements.define('cool-router', Router);
customElements.define('home-page', Home) 
customElements.define('contact-page', Contact) 
customElements.define('about-page', About ) 

document.querySelector('#app').innerHTML = `
  <nav-bar></nav-bar>
  <cool-router></cool-router>
`

