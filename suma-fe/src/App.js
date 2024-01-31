import './App.scss'

import NavMenuCategory from './components/data/navmenucategories/NavMenuCategory'
import Routing from './components/common/routing/Routing'
import Footer from './components/common/footer/Footer'

function App () {
  return (
    <div className='wrapper app-wrapp'>
      <NavMenuCategory />
      <Routing />
      <Footer />
    </div>
  )
}

export default App
