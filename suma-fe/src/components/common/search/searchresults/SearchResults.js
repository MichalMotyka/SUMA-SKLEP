import { CategoryContext } from '../../../auth/context/useContext'
import { useContext, useEffect, useState } from 'react'
import './searchresults.scss'

function SearchResults () {
  const { searchValue } = useContext(CategoryContext)
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    fetch(
      `http://localhost:8080/api/v1/product?search=${searchValue}&page=1&limit=10&sort=NAME&order=DESC`
    )
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.log(error))
  }, [searchValue])

  console.log(searchResults)

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>
        Wyniki wyszukiwania dla {searchValue}
      </h2>

      <section>
        <div className='products-list'>
          <ul className='product-ul'>
            {searchResults.map(product => (
              <li key={product.uuid} className='product-box'>
                <img
                  className='product-main-img'
                  src={product.mainImg}
                  alt={product.name}
                  width={350}
                />
                <div className='product-desc'>
                  <span className='product-name'>{product.name}</span>
                  <span className='product-price'>{product.price} zł</span>
                </div>
                <hr></hr>
                <p>{product.description}</p>
                <div className='product-buy'>
                  <p>Dostępność: {product.available}</p>
                  <button className='product-btn'>Dodaj do koszyka</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default SearchResults
