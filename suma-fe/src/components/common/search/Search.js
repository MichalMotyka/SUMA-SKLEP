import { IoSearchSharp } from 'react-icons/io5'

import './search.scss'
function Search () {
  return (
    <div className='search'>
      <input
        className='search-input'
        type='text'
        placeholder='Szukaj produktu'
      />
      <button className='search-btn'>
        <IoSearchSharp />
        Szukaj
      </button>
    </div>
  )
}

export default Search
