import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/home/Home'
import Cart from '../../pages/cart/Cart'
import ProductsData from '../../pages/products/Products'
import SearchResults from '../search/searchresults/SearchResults'

function Routing () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/produkty' element={<ProductsData />} />
        <Route path='/szukaj' element={<SearchResults />} />
        <Route path='/koszyk' element={<Cart />} />
      </Routes>
    </>
  )
}

export default Routing
