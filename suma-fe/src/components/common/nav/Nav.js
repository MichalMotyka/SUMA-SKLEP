import { Link } from 'react-router-dom'
import './nav.scss'
import { useState, useEffect, useRef } from 'react'
import TopNav from './topnav/TopNav'
import { MdArrowDownward } from 'react-icons/md'
import { useContext } from 'react'
import { CategoryContext } from '../../auth/context/useContext'

function Nav (data) {
  // state jest lifted up bo usecontexty skad wysylane sa dane i pobierane.
  const { setPassCategory } = useContext(CategoryContext)

  const [subCategoryToggles, setSubCategoryToggles] = useState({})
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
  }

  return (
    <nav className='nav' ref={dropdownRef} onClick={handleLinkClick}>
      <TopNav />

      <div className='nav-menu '>
        {data.data.map(menuItem => (
          <div key={menuItem.uuid} className='navigation '>
            {menuItem.subcategoriesy.length > 0 ? (
              <div className=''>
                <Link
                  className='drop-category'
                  onClick={e => {
                    e.stopPropagation()
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
                        to={'/produkty'}
                        className='sub-category'
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
                to={'/produkty'}
                className='main-category'
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
