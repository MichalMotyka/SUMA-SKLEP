import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Search from '../../search/search/Search'
import ShopLogo from '../images/shoplogo.webp'
import { MdAddShoppingCart } from 'react-icons/md'
import { BsTelephoneOutbound } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { CategoryContext } from '../../../auth/context/productContext'

import './topnav.scss'

function TopNav () {
  const { basketItems } = useContext(CategoryContext)

  console.log('topnav:', basketItems)

  return (
    <div className='top-nav app-wrapp'>
      <Link to='/'>
        <img src={ShopLogo} alt='E-wianki logo' width={200} />
      </Link>
      <div className='contact'>
        <span className='contact-tel'>
          <BsTelephoneOutbound className='contact-icon' /> 123 456 789
        </span>
        <span className='contact-email'>
          <AiOutlineMail className='contact-icon' /> sklep@ewianki.pl
        </span>
      </div>
      <Search />
      <Link to='/koszyk' className='cart-btn'>
        <MdAddShoppingCart /> Twój Koszyk ({basketItems})
      </Link>
    </div>
  )
}

export default TopNav
