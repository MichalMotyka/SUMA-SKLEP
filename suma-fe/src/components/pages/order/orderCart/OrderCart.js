import { useEffect, useState } from 'react'
import './ordercart.scss'

function OrderCart () {
  const [basketSummary, setBasketSummary] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/basket', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setBasketSummary(data))
  }, [])

  return Object.keys(basketSummary).length > 0 ? (
    <ul className='basket-summary'>
      <p className='order-summary'>Podsumowanie zamówienia</p>
      {basketSummary.basketItem.map(basketItem => (
        <li key={basketItem.uuid} className='summary-item'>
          <p className='summary-product-name'> {basketItem.product.name} </p>
          <div className='summary-data'>
            <img
              className='summary-img'
              src={basketItem.product.mainImg}
              alt='basket item'
            />
            <span>Ilość: {basketItem.quantity}</span>
            <span>Cena: {basketItem.price} zł</span>
          </div>
        </li>
      ))}
      <p className='summary-price'>
        Suma: {basketSummary.finalPrice.toFixed(2)} zł
      </p>
    </ul>
  ) : (
    'Data pending...'
  )
}

export default OrderCart
