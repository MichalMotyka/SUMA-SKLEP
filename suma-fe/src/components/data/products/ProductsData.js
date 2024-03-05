import ProductsFiltering from '../productsFiltering/ProductsFiltering'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { CategoryContext } from '../../auth/context/productContext'
import ProductPagination from './ProductPagination'
import { FiMoreHorizontal } from 'react-icons/fi'

import './productsdata.scss'

function ProductsData () {
  const [productsList, setProductsList] = useState([])
  const { passCategory } = useContext(CategoryContext)
  const [xTotalCount, setXTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const productLimit = 8

  // price filter
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(500)

  // name filter A-Z

  const [filterType, setFilterType] = useState({
    sortType: 'NAME',
    orderType: 'ASC'
  })

  // product uuid
  const { setProductUuid } = useContext(CategoryContext)

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/v1/product?page=${page}&limit=${productLimit}&sort=${filterType.sortType}&order=${filterType.orderType}&category=${passCategory}&price_min=${priceMin}&price_max=${priceMax}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
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
  }, [passCategory, page, priceMin, priceMax, filterType])

  const handleProductDetails = uuid => {
    setProductUuid(uuid)
  }

  return (
    <section>
      <ProductsFiltering
        data={passCategory}
        props={{ setPriceMin, setPriceMax, filterType, setFilterType }}
      />

      {productsList.length > 0 ? (
        <h2 style={{ textAlign: 'center' }}>
          Kategoria:{' '}
          {productsList[0].category.name.charAt(0).toUpperCase() +
            productsList[0].category.name.slice(1).toLowerCase()}
        </h2>
      ) : null}

      {xTotalCount ? (
        <ProductPagination
          props={{ page, setPage, xTotalCount, productLimit }}
        />
      ) : (
        <p className='products-none'>
          W tej kategorii obecnie nie ma produktów.
        </p>
      )}

      <div className='products-list'>
        <ul className='product-ul'>
          {productsList.map(product => (
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
              </div>
            </li>
          ))}
        </ul>
      </div>

      {xTotalCount > 9 ? (
        <ProductPagination
          props={{ page, setPage, xTotalCount, productLimit }}
        />
      ) : null}
    </section>
  )
}

export default ProductsData
