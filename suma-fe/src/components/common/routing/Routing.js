import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/home/Home'
import Cart from '../../pages/cart/Cart'
import Products from '../../pages/products/Products'

function Routing () {
  // tu zaimpoirtuj

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  )
}

export default Routing
