import './App.scss'
import { CategoryProvider } from './components/auth/context/useContext'

import NavMenuCategory from './components/data/navmenucategories/NavMenuCategory'
import Routing from './components/common/routing/Routing'
import Footer from './components/common/footer/Footer'

function App () {
  return (
    <CategoryProvider>
      <div className='wrapper app-wrapp'>
        <NavMenuCategory />
        <Routing />
      </div>
      <Footer />
    </CategoryProvider>
  )
}

export default App
