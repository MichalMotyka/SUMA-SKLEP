import { IoSearchSharp } from 'react-icons/io5'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './search.scss'
import { CategoryContext } from '../../../auth/context/useContext'

function Search () {
  const { searchValue, setSearchValue } = useContext(CategoryContext)
  const navigate = useNavigate()

  console.log(searchValue)
  const handleSearch = e => {
    e.preventDefault()
    navigate('/szukaj')
  }

  return (
    <form className='search' onSubmit={handleSearch}>
      <input
        className='search-input'
        type='text'
        placeholder='Szukaj produktu'
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <button
        className='search-btn'
        type='submit'
        disabled={searchValue.length === 0}
      >
        <IoSearchSharp />
        Szukaj
      </button>
    </form>
  )
}

export default Search
