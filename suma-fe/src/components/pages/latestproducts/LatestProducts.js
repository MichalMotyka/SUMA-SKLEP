import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './latestproducts.scss'

function LatestProducts () {
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    fetch(
      'http://localhost:8080/api/v1/product?page=1&limit=9&sort=DATE&order=DESC'
    )
      .then(response => response.json())
      .then(data => setLatestProducts(data))
      .catch(error => console.log(error))
  }, [])

  return (
    <section>
      <h2 className='section-title'>Najnowsze produkty</h2>
      <div className='products-list'>
        <ul className='product-ul'>
          {latestProducts.map(product => (
            <li key={product.uuid} className='product-box'>
              <Link className='product-info' to='/produkt'>
                <img
                  className='product-img'
                  src={product.mainImg}
                  alt={product.name}
                />
              </Link>
              <div className='product-desc'>
                <span className='product-name'>{product.name}</span>
                <span className='product-price'>{product.price} zł</span>
              </div>
              <hr className='product-line'></hr>
              <div className='product-buy'>
                <p>Dostępność: {product.available}</p>
                <button className='product-btn'>Dodaj do koszyka</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default LatestProducts
