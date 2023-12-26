import { Navbar, Tab } from './src/Navbar'
import './style.css'

customElements.define('nav-bar', Navbar)
customElements.define('custom-tab', Tab)

document.querySelector('#app').innerHTML = `
  <nav-bar></nav-bar>
`

