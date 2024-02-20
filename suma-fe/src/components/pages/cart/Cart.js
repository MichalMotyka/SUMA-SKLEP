import { useEffect, useState } from 'react'
import './cart.scss'

function Cart () {
  const [basketData, setBasketData] = useState([])
  const [productAmount, setProductAmount] = useState(1)
  // const [xTotalCount, setXTotalCount] = useState(0)

  // Pobieranie danych z koszyka

  const handleProduct = productUUID => {
    console.log('clicked')
    const requestedBasketData = {
      product: {
        uuid: productUUID
      },
      quantity: 0
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
        // 'x-total-basket-product-count': true
      }
    })
      .then(response => {
        // const xTotalCountHeader = response.headers.get(
        //   'x-total-basket-product-count'
        // )

        // setXTotalCount(parseInt(xTotalCountHeader))

        return response.json()
      })
      .then(data => setBasketData(data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchBasketData()
  }, [])

  return Object.keys(basketData).length > 0 ? (
    <section>
      <h2 className=''>Koszyk </h2>
      <h3>Przedmioty: {basketData.basketItem.length}</h3>

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
                    <label htmlFor='products'>Zmień ilość</label>
                    <select
                      name='products'
                      value={productAmount}
                      onChange={e => setProductAmount(e.target.value)}
                    >
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='product-right'>
                <p>{product.price} zł</p>
                <button
                  className='product-btn'
                  onClick={() => handleProduct(product.product.uuid)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className='summary-lirt'>
          <p>Cena:</p>
          <p>Ilość przedmiotów</p>
        </div>
      </div>
    </section>
  ) : (
    'Data pending'
  )
}

export default Cart
