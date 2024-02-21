import './App.scss'
import { CategoryProvider } from './components/auth/context/productContext'

import NavMenuCategory from './components/data/navmenucategories/NavMenuCategory'
import Routing from './components/common/routing/Routing'
import Footer from './components/common/footer/Footer'

import CreateBasket from './components/auth/context/createBasket'

function App () {
  return (
    <CategoryProvider>
      <div className='wrapper app-wrapp'>
        <CreateBasket />
        <NavMenuCategory />
        <Routing />
      </div>
      <Footer />
    </CategoryProvider>
  )
}

export default App
