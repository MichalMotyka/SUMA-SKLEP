import { Link } from 'react-router-dom'
import './nav.scss'
import { useState, useEffect, useRef } from 'react'
import TopNav from './topnav/TopNav'
import { MdArrowDownward } from 'react-icons/md'

function Nav (data) {
  const [subCategoryToggles, setSubCategoryToggles] = useState({})
  const dropdownRef = useRef(null)

  function handleSubCategories (uuid) {
    setSubCategoryToggles(prevToggles => {
      const newToggles = { ...prevToggles } // copy previous state

      // if the clicked category is already open, close it
      if (newToggles[uuid]) {
        newToggles[uuid] = false
      } else {
        // close all categories
        Object.keys(newToggles).forEach(key => {
          newToggles[key] = false
        })
        // open the clicked category
        newToggles[uuid] = true
      }

      return newToggles
    })
  }

  // Add this function
  function handleLinkClick () {
    setSubCategoryToggles({})
  }

  useEffect(() => {
    function handleClickOutside (event) {
      // Check if the clicked element is outside the menu
      if (!dropdownRef.current || !dropdownRef.current.contains(event.target)) {
        setSubCategoryToggles({})
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  console.log(data)
  console.log(subCategoryToggles)

  return (
    <nav className='nav ' ref={dropdownRef} onClick={handleLinkClick}>
      <TopNav />

      <div className='nav-menu '>
        {data.data.map(menuItem => (
          <div key={menuItem.uuid} className='navigation '>
            {menuItem.subcategoriesy.length > 0 ? (
              <div className=''>
                <Link
                  className='drop-category'
                  onClick={e => {
                    e.stopPropagation() // prevent the nav onClick from firing
                    handleSubCategories(menuItem.uuid)
                  }}
                >
                  {menuItem.name}
                  <MdArrowDownward />
                </Link>
                <ul className='sub-list'>
                  {menuItem.subcategoriesy.map(subCategory => (
                    <li
                      key={subCategory.uuid}
                      style={
                        subCategoryToggles[menuItem.uuid]
                          ? { display: 'block' }
                          : { display: 'none' }
                      }
                    >
                      <Link
                        to={'/products'}
                        className='sub-category'
                        onClick={e => {
                          e.stopPropagation() // prevent the nav onClick from firing
                          handleLinkClick()
                        }}
                      >
                        {subCategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link to={'/products'} className='main-category'>
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
