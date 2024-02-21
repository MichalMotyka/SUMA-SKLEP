import { useEffect, useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'

import './cart.scss'

function Cart () {
  const [basketData, setBasketData] = useState([])
  const [productAmounts, setProductAmounts] = useState({})

  // Usuwanie danych w koszyku
  const handleDeleteProduct = (productUUID, zero) => {
    const requestedBasketData = {
      product: {
        uuid: productUUID
      },
      quantity: zero
    }

    fetch('http://localhost:8080/api/v1/basket', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestedBasketData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Produkt nie został dodany do koszyka.')
        }
        // Aktualizacja koszyka po usunięciu produktu
        fetchBasketData()
        return response.json()
      })
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

  // Pobieranie danych z koszyka
  const fetchBasketData = () => {
    fetch(`http://localhost:8080/api/v1/basket`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setBasketData(data)
        // Ustawienie początkowej ilości produktów
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchBasketData()
  }, [])

  // Obsługa zmiany ilości produktu
  const handleProductAmountChange = (event, productUUID) => {
    const { value } = event.target
    setProductAmounts({ uuid: productUUID, amount: parseInt(value) })
  }

  // API change product amount:

  useEffect(() => {
    const requestedBasketData = {
      product: {
        uuid: productAmounts.uuid
      },
      quantity: productAmounts.amount
    }

    fetch('http://localhost:8080/api/v1/basket', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestedBasketData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Produkt nie został dodany do koszyka.')
        }
        // Aktualizacja koszyka po usunięciu produktu
        fetchBasketData()
        return response.json()
      })
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }, [productAmounts])

  return Object.keys(basketData).length > 0 ? (
    <section>
      <h2 className='section-title'>
        Przedmioty w koszyku: {basketData.basketItem.length}
      </h2>
      <div className='cart'>
        <ul className='cart-list'>
          {basketData.basketItem.map(product => (
            <li key={product.product.uuid} className='cart-item'>
              <div className='cart-left-info'>
                <div className='cart-info'>
                  <img
                    src={product.product.mainImg}
                    className='product-img'
                    alt='product miniature'
                  />
                  <div className='product-info'>
                    <p>{product.product.name}</p>
                    <p>Ilość: {product.quantity}</p>
                    <span>
                      Pozostało dostępnych: {product.product.available}
                    </span>
                    <div>
                      <select
                        name='products'
                        value={productAmounts[product.product.uuid] || ''}
                        onChange={e =>
                          handleProductAmountChange(e, product.product.uuid)
                        }
                      >
                        <option value=''>Zmień ilość</option>
                        {[...Array(product.product.available).keys()].map(
                          (_, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='product-right'>
                <p className='product-price'> {product.price} zł</p>
                <button
                  className='product-btn'
                  onClick={() => handleDeleteProduct(product.product.uuid, 0)}
                >
                  <FaRegTrashCan className='btn-icon' />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className='summary-list'>
          <p className='summary-desc'>Cena: </p>
          <p className='summary-desc'>Ilość przedmiotów: {basketData.basketItem.length}</p>
          <button className='summary-btn' disabled={ basketData.basketItem.length <= 0}>

            {basketData.basketItem.length <= 0 ? <p>Koszyk jest pusty</p> : <p>Przejdź do zamówienia</p>}

          </button>
        </div>
      </div>
    </section>
  ) : (
    'Data pending'
  )
}

export default Cart
