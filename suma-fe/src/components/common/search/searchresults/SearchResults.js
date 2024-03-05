import { CategoryContext } from '../../../auth/context/productContext'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMoreHorizontal } from 'react-icons/fi'

function SearchResults () {
  const { searchValue } = useContext(CategoryContext)
  const [searchResults, setSearchResults] = useState([])
  const { setProductUuid } = useContext(CategoryContext)

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/v1/product?search=${searchValue}&page=1&limit=10&sort=NAME&order=DESC`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.log(error))
  }, [searchValue])

  const handleProductDetails = uuid => {
    setProductUuid(uuid)
  }

  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: '10px' }}>
        Wyniki wyszukiwania dla: {searchValue}
      </h2>

      <section>
        <div className='products-list'>
          <ul className='product-ul'>
            {searchResults.map(product => (
              <li key={product.uuid} className='product-box'>
                <Link
                  className='product-info'
                  to='/produkt'
                  onClick={() => handleProductDetails(product.uuid)}
                >
                  <FiMoreHorizontal className='product-info-icon' />
                  <img
                    className='product-img'
                    src={product.mainImg}
                    alt={product.name}
                  />
                </Link>

                <div className='product-desc'>
                  <span className='product-name'>{product.name}</span>
                </div>
                <hr className='hr-line product-line'></hr>
                <div className='product-buy'>
                  <span className='product-available'>
                    Dostępnych: {product.available}
                  </span>
                  <span className='product-price'>{product.price} zł</span>
                  {/* <button className='product-btn'>Dodaj do koszyka</button> */}
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
