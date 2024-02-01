import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/home/Home'
import Cart from '../../pages/cart/Cart'
import ProductsData from '../../pages/products/Products'

function Routing () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsData />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  )
}

export default Routing
