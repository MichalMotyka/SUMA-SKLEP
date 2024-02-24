import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { CategoryContext } from '../../auth/context/productContext'
import { FiMoreHorizontal } from 'react-icons/fi'

function LatestProducts () {
  const [latestProducts, setLatestProducts] = useState([])
  const { setProductUuid } = useContext(CategoryContext)

  useEffect(() => {
    fetch(
      'http://localhost:8080/api/v1/product?page=1&limit=9&sort=DATE&order=DESC'
    )
      .then(response => response.json())
      .then(data => setLatestProducts(data))
      .catch(error => console.log(error))
  }, [])

  const handleProductDetails = uuid => {
    setProductUuid(uuid)
  }

  return (
    <section>
      <h2 className='section-title'>Najnowsze produkty</h2>

      <div className='products-list'>
        <ul className='product-ul'>
          {latestProducts.map(product => (
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
  )
}

export default LatestProducts
