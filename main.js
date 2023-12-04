import { Navbar } from './src/Navbar'
import './style.css'

customElements.define('nav-bar', Navbar)

document.querySelector('#app').innerHTML = `
  <nav-bar></nav-bar>
`

