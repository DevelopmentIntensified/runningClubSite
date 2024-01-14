import { About } from './src/About'
import { Router } from './src/Components/Router'
import { Home } from './src/Home'
import { Navbar, Tab } from './src/Navbar'
import './style.css'

customElements.define('nav-bar', Navbar)
customElements.define('custom-tab', Tab)
customElements.define('cool-router', Router);
customElements.define('home-page', Home) 
customElements.define('about-page', About ) 

document.querySelector('#app').innerHTML = `
  <nav-bar></nav-bar>
  <cool-router></cool-router>
`

