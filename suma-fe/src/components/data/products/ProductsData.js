import ProductsFiltering from '../productsFiltering/ProductsFiltering'

import './productsdata.scss'

import { useEffect, useState } from 'react'

import { useContext } from 'react'
import { CategoryContext } from '../../auth/context/useContext'

function ProductsData () {
  const { passCategory } = useContext(CategoryContext)
  const [productsList, setProductsList] = useState([])

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/v1/product?page=1&limit=9&sort=PRICE&order=DESC&category=${passCategory}`
    )
      .then(response => response.json())
      .then(data => setProductsList(data))
  }, [passCategory])

  return (
    <section>
      <ProductsFiltering />
      {productsList.length > 0 ? (
        <h2 style={{ textAlign: 'center' }}>{productsList[0].category.name}</h2>
      ) : null}
      <div className='products-list'>
        <ul className='product-ul'>
          {productsList.map(product => (
            <li className='product-box'>
              <img
                className='product-main-img'
                src={product.mainImg}
                alt={product.name}
                width={350}
              />
              <div className='product-desc'>
                <span>{product.name}</span>

                <span>{product.price} zł</span>
              </div>
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
  )
}

export default ProductsData
