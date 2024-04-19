import { CategoryContext } from '../../../auth/context/productContext'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMoreHorizontal } from 'react-icons/fi'

function SearchResults () {
  const { searchValue } = useContext(CategoryContext)
  const [searchResults, setSearchResults] = useState([])
  const { setProductUuid, ipMan } = useContext(CategoryContext)

  useEffect(() => {
    fetch(
      `http://${ipMan}/api/v1/product?search=${searchValue}&page=1&limit=8&sort=NAME&order=DESC`,
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
  }, [searchValue, ipMan])

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
              <Link
                key={product.uuid}
                className='product-link'
                to='/produkt'
                onClick={() => handleProductDetails(product.uuid)}
              >
                <li className='product-box'>
                  <div className='product-info'>
                    <FiMoreHorizontal className='product-info-icon' />
                    <img
                      className='product-img'
                      src={product.mainImg}
                      alt={product.name}
                    />
                  </div>

                  <div className='product-desc'>
                    <span className='product-name'>{product.name}</span>
                  </div>
                  <hr className='hr-line product-line' />
                  <div className='product-buy'>
                    <span className='product-available'>
                      Dostępnych: {product.available}
                    </span>
                    <span className='product-price'>{product.price} zł</span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default SearchResults
