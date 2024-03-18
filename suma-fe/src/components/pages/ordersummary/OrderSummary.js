import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CategoryContext } from '../../auth/context/productContext'
import './ordersummary.scss'

function OrderSummary () {
  const { ipMan } = useContext(CategoryContext)
  const [orderSummary, setOrderSummary] = useState([])

  const { token } = useParams()

  useEffect(() => {
    fetch(`http://${ipMan}/api/v1/document/order/info/${token}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setOrderSummary(data))
      .catch(error => console.log(error))
  }, [token, ipMan])

  console.log(orderSummary)

  return Object.keys(orderSummary).length > 0 ? (
    <section className='summary-section'>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
        Podsumowanie zamówienia
        {/* - dodaj , 
      .message
      payuUrl
      .parcellocker */}
      </h2>
      <div className='summary'>
        <div className='summary-top'>
          <div className='summary-info'>
            <span>Data zamówienia </span>
            <span>{orderSummary.createDate}</span>
          </div>

          <div className='summary-info'>
            <span>Sposób dostawy </span>
            <span>{orderSummary.deliver.type}</span>
          </div>

          {orderSummary.parcelLocker !== '' ? (
            <div className='summary-info'>
              <span>Numer paczkomatu </span>
              <span>{orderSummary.parcelLocker}</span>
            </div>
          ) : null}

          <div className='summary-info'>
            <span>Ilość przedmiotów </span>
            <span>{orderSummary.fullQuantity}</span>
          </div>

          <div className='summary-info'>
            <span>Cena z dostawą </span>
            <span>{orderSummary.fullPrice} zł</span>
          </div>

          <div className='summary-info'>
            <span>Status</span>
            <span>{orderSummary.message}</span>
          </div>

          {console.log(orderSummary.payUrl)}

          {orderSummary.payUrl !== null  ? (
            <div className='summary-info'>
              <span>Dokończ płatność za zamówienie </span>
              <a
                href={orderSummary.payuUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='summary-a'
              >
                opłać tutaj
              </a>
            </div>
          ) : null}
        </div>
        <div className='summary-bot'>
          <ul className='summary-ul'>
            {orderSummary.details.map(product => (
              <li className='summary-info'>
                <img
                  width={100}
                  height={110}
                  src={product.product.mainImg}
                  alt={product.product.name}
                  style={{ paddingRight: '5px' }}
                />
                <div className='summary-info-bot'>
                  <p style={{ fontWeight: 'bold' }}>{product.product.name}</p>
                  <p>Ilość: {product.quantity}</p>
                  <p>Cena: {product.price.toFixed(2)} zł</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  ) : (
    <p>Oczekiwanie na dane</p>
  )
}

export default OrderSummary
