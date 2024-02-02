import { Link } from 'react-router-dom'
import Search from '../../search/search/Search'
import ShopLogo from '../images/shoplogo.webp'
import { MdAddShoppingCart } from 'react-icons/md'
import { BsTelephoneOutbound } from 'react-icons/bs'
import { TfiEmail } from 'react-icons/tfi'

import './topnav.scss'

function TopNav () {
  return (
    <div className='top-nav app-wrapp'>
      <Link to='/'>
        <img src={ShopLogo} alt='E-wianki logo' width={200} />
      </Link>
      <div className='contact'>
        <span>
          <BsTelephoneOutbound /> 123 456 789
        </span>{' '}
        <span>
          <TfiEmail /> sklep@ewianki.pl
        </span>
      </div>
      <Search />
      <Link to='/koszyk' className='cart-btn'>
        <MdAddShoppingCart /> Twój Koszyk (4)
      </Link>
    </div>
  )
}

export default TopNav
