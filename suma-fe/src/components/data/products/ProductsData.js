import ProductsFiltering from '../productsFiltering/ProductsFiltering'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { CategoryContext } from '../../auth/context/useContext'
import './productsdata.scss'

function ProductsData () {
  const [productsList, setProductsList] = useState([])
  const { passCategory } = useContext(CategoryContext)
  const [xTotalCount, setXTotalCount] = useState(0)

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/v1/product?page=1&limit=9&sort=PRICE&order=DESC&category=${passCategory}`,
      {
        headers: {
          'X-Total-Count': true
        }
      }
    )
      .then(response => {
        const xTotalCountHeader = response.headers.get('X-Total-Count')

        if (xTotalCountHeader) {
          setXTotalCount(parseInt(xTotalCountHeader))
        }

        return response.json()
      })
      .then(data => setProductsList(data))
      .catch(error => console.log(error))
  }, [passCategory])

  console.log(productsList)
  console.log('ile total', xTotalCount)

  return (
    <section>
      <ProductsFiltering data={passCategory} />
      {productsList.length > 0 ? (
        <h2 style={{ textAlign: 'center' }}>{productsList[0].category.name}</h2>
      ) : null}
      <div className='products-list'>
        <ul className='product-ul'>
          {productsList.map(product => (
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
  )
}

export default ProductsData
