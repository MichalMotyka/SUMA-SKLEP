import { Link } from 'react-router-dom'
import Search from '../../search/Search'
import ShopLogo from '../images/shoplogo.webp'
import { MdAddShoppingCart } from 'react-icons/md'

import './topnav.scss'

function TopNav () {
  return (
    <div className='top-nav app-wrapp'>
      <Link to='/'>
        <img src={ShopLogo} alt='E-wianki logo' />
      </Link>
      <Search />
      <Link to='/cart' className='cart-btn'>
        <MdAddShoppingCart /> Twój Koszyk (4)
      </Link>
    </div>
  )
}

export default TopNav
