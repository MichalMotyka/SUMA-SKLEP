import React from 'react'
import { Link } from 'react-router-dom'
import { BsTelephoneOutbound } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import './footer.scss'

function Footer () {
  return (
    <footer className='footer'>
      <hr></hr>
      <div className='footer-content'>
        <div className='footer-section'>
          <h2 className='footer-title'>Linki</h2>
          <ul>
            <li>
              <Link to='/'>Strona główna</Link>
            </li>
            <li>
              <Link to='/koszyk'>Koszyk</Link>
            </li>
          </ul>
        </div>
        <div className='footer-section'>
          <h2 className='footer-title'>Kontakt:</h2>
          <p className='footer-contact'>
            {' '}
            <AiOutlineMail className='footer-icon' />
            kontakt@sklepinternetowy.pl
          </p>
          <p className='footer-contact'>
            {' '}
            <BsTelephoneOutbound className='footer-icon' />
            +48 123 456 789
          </p>
        </div>
        <div className='footer-section'>
          <h2 className='footer-title'>Dane firmy</h2>
          <p>NIP: 6060093787</p>
          <p>REGON: 302841208</p>
          <p>Email: kontakt@sklepinternetowy.pl</p>
          <p>Telefon: +48 123 456 789</p>
        </div>
      </div>
      <hr></hr>
      <div className='footer-bottom'>
        <p>&copy; 2024 e-wianki | Cooding Raccoons |</p>
      </div>
    </footer>
  )
}

export default Footer
