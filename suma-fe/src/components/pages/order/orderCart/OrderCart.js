import { FaSpinner } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import { CategoryContext } from '../../../auth/context/productContext'
import './ordercart.scss'

function OrderCart (props) {
  const [basketSummary, setBasketSummary] = useState([])
  const [priceSummary, setPriceSummary] = useState([])
  const [totalProductCount, setTotalProductCount] = useState(0)
  const { ipMan } = useContext(CategoryContext)

  useEffect(() => {
    fetch(`http://${ipMan}/api/v1/basket`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const totalCount = response.headers.get('x-total-basket-product-count')
        setTotalProductCount(totalCount)
        return response.json()
      })
      .then(data => setBasketSummary(data))
  }, [ipMan])

  useEffect(() => {
    if (props.orderID && props.deliveryID) {
      fetch(`http://${ipMan}/api/v1/document/order/deliver/${props.orderID}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uuid: props.deliveryID })
      })
        .then(response => response.json())
        .then(data => setPriceSummary(data))
        .catch(error => {
          // Tutaj obsłuż błąd
          console.error('Wystąpił błąd:', error)
        })
    }
  }, [props.orderID, props.deliveryID, ipMan])

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
      <div className='summary-price'>
        <span> Wartość produktów ({totalProductCount}) </span>

        <span> {basketSummary.finalPrice.toFixed(2)} zł</span>
      </div>
      <div className='summary-price'>
        <span>Dostawa</span>

        <span>
          {' '}
          {props.deliveryID !== '' && priceSummary && priceSummary.deliver
            ? priceSummary.deliver.price.toFixed(2) + ` zł`
            : '...'}{' '}
        </span>
      </div>
      <hr></hr>

      <div className='summary-price'>
        <span> Do zapłaty </span>

        <span>
          {' '}
          {props.orderID !== '' && priceSummary.fullPrice
            ? priceSummary.fullPrice.toFixed(2) + ` zł`
            : basketSummary.finalPrice.toFixed(2) + ` zł`}{' '}
        </span>
      </div>
    </ul>
  ) : (
    <>
      'Pobieranie danych...'
      <FaSpinner className='spinner-icon' />
    </>
  )
}

export default OrderCart
