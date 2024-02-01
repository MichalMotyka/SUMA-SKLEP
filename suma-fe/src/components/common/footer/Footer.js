import React from 'react'
import { Link } from 'react-router-dom'
import './footer.scss'

function Footer () {
  return (
    <footer className='footer'>
      <hr></hr>
      <div className='footer-content'>
        <div className='footer-section'>
          <h2>Linki</h2>
          <ul>
            <li>
              <Link href='/'>Strona główna</Link>
            </li>
            <li>
              <a href='/produkty'>Produkty</a>
            </li>
            <li>
              <a href='/o-nas'>O nas</a>
            </li>
            <li>
              <a href='/kontakt'>Kontakt</a>
            </li>
          </ul>
        </div>
        <div className='footer-section'>
          <h2>Kontakt</h2>
          <p>Adres: ul. Przykładowa 123, 00-000 Warszawa</p>
          <p>Email: kontakt@sklepinternetowy.pl</p>
          <p>Telefon: +48 123 456 789</p>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>
          &copy; 2024 e-wianki | Cooding Raccoons | Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}

export default Footer
