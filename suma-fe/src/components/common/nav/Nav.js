import { Link } from 'react-router-dom'
import './nav.scss'
import { useState, useEffect, useRef } from 'react'
import TopNav from './topnav/TopNav'
import { MdArrowDownward } from 'react-icons/md'
import { useContext } from 'react'
import { CategoryContext } from '../../auth/context/productContext'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'

function Nav (data) {
  const { setPassCategory } = useContext(CategoryContext)

  const [hamburger, setHamburger] = useState(false)

  const [subCategoryToggles, setSubCategoryToggles] = useState({})
  const [activeCategory, setActiveCategory] = useState(null)
  const dropdownRef = useRef(null)

  function handleSubCategories (uuid) {
    setSubCategoryToggles(prevToggles => {
      const newToggles = { ...prevToggles }

      if (newToggles[uuid]) {
        newToggles[uuid] = false
      } else {
        Object.keys(newToggles).forEach(key => {
          newToggles[key] = false
        })

        newToggles[uuid] = true
      }

      return newToggles
    })

    setActiveCategory(uuid)
  }

  useEffect(() => {
    function handleClickOutside (event) {
      if (!dropdownRef.current || !dropdownRef.current.contains(event.target)) {
        setSubCategoryToggles({})
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function handleLinkClick () {
    setSubCategoryToggles({})
  }

  const handlePassCategory = uuid => {
    setPassCategory(uuid)
    setActiveCategory(uuid)
    setHamburger(false)
  }

  const handleHamburger = () => {
    setHamburger(!hamburger)
  }

  return (
    <nav className='nav' ref={dropdownRef} onClick={handleLinkClick}>
      <button
        onClick={handleHamburger}
        className='ham-btn'
        aria-label='hamburger menu button'
      >
        {!hamburger ? <GiHamburgerMenu className='ham-icon' /> : <GrClose />}
      </button>
      <TopNav />

      <div className={`nav-menu ${hamburger === true ? 'hamOn' : 'hamOff'}`}>
        {' '}
        {data.data.map(menuItem => (
          <div key={menuItem.uuid} className='navigation '>
            {menuItem.subcategoriesy.length > 0 ? (
              <div className=''>
                <Link
                  className={`drop-category ${
                    menuItem.uuid === activeCategory ? 'active' : ''
                  }`}
                  onClick={e => {
                    e.stopPropagation()
                    handleSubCategories(menuItem.uuid)
                  }}
                >
                  {menuItem.name}
                  <MdArrowDownward className='nav-down-icon' />
                </Link>
                <ul className='sub-list'>
                  {menuItem.subcategoriesy.map(subCategory => (
                    <li
                      className='sub-cat-item'
                      key={subCategory.uuid}
                      style={
                        subCategoryToggles[menuItem.uuid]
                          ? { display: 'block' }
                          : { display: 'none' }
                      }
                    >
                      <Link
                        to={'/kategoria'}
                        className={`sub-category ${
                          subCategory.uuid === activeCategory ? 'active' : ''
                        }`}
                        onClick={e => {
                          e.stopPropagation()
                          handleLinkClick()
                          handlePassCategory(subCategory.uuid)
                        }}
                      >
                        {subCategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                to={'/kategoria'}
                className={`main-category ${
                  menuItem.uuid === activeCategory ? 'active' : ''
                }`}
                onClick={() => handlePassCategory(menuItem.uuid)}
              >
                {menuItem.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default Nav
