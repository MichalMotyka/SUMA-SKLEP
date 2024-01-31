import './search.scss'
function Search () {
  return (
    <div>
      <input
        className='search-input'
        type='text'
        placeholder='Szukaj produktu'
      />
      <button className='search-btn'>Szukaj</button>
    </div>
  )
}

export default Search
