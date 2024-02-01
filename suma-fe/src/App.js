import './App.scss'
import { CategoryContext } from './components/auth/context/useContext'
import { useState } from 'react'

import NavMenuCategory from './components/data/navmenucategories/NavMenuCategory'
import Routing from './components/common/routing/Routing'
import Footer from './components/common/footer/Footer'

function App () {
  const [passCategory, setPassCategory] = useState(null)

  return (
    <CategoryContext.Provider value={{ passCategory, setPassCategory }}>
      <div className='wrapper app-wrapp'>
        <NavMenuCategory />
        <Routing />
        <Footer />
      </div>
    </CategoryContext.Provider>
  )
}

export default App
