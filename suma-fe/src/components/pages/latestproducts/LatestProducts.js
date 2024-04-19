import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { CategoryContext } from '../../auth/context/productContext'
import { FiMoreHorizontal } from 'react-icons/fi'

function LatestProducts () {
  const [latestProducts, setLatestProducts] = useState([])
  const { setProductUuid, ipMan } = useContext(CategoryContext)
  // const page = 1
  // const limit = 8

  useEffect(() => {
    fetch(
      `http://${ipMan}/api/v1/product?page=1&limit=8&sort=DATE&order=DESC`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => setLatestProducts(data))
      .catch(error => console.log(error))
  }, [ipMan])

  const handleProductDetails = uuid => {
    setProductUuid(uuid)
  }

  return (
    <section>
      <h2 className='section-title'>Najnowsze produkty</h2>

      <div className='products-list'>
        <ul className='product-ul'>
          {latestProducts.map(product => (
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
  )
}

export default LatestProducts
