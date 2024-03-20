import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CategoryContext } from '../../auth/context/productContext'
import './ordersummary.scss'

import { MdOutlineDateRange } from 'react-icons/md'
import { GrStatusUnknown } from 'react-icons/gr'

import { MdOutlineDeliveryDining } from 'react-icons/md'
import { TbNumber } from 'react-icons/tb'
import { ImListNumbered } from 'react-icons/im'
import { IoPricetagsOutline } from 'react-icons/io5'
import { MdOutlineInfo } from 'react-icons/md'
import { MdOutlinePayment } from 'react-icons/md'

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

  function OrderStatus ({ status }) {
    let translation = ''

    switch (status) {
      case 'PROJECT':
        translation = 'Projekt'
        break
      case 'TOPAY':
        translation = 'Do zapłaty'
        break
      case 'CREATED':
        translation = 'Utworzony'
        break
      case 'REALIZATION':
        translation = 'W realizacji'
        break
      case 'COMPLETED':
        translation = 'Zakończony'
        break
      case 'REJECTED':
        translation = 'Odrzucony'
        break
      default:
        translation = 'Nieznany status'
    }

    return <span>{translation}</span>
  }

  return Object.keys(orderSummary).length > 0 ? (
    <section className='summary-section'>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
        Podsumowanie zamówienia
      </h2>
      <div className='summary'>
        <div className='summary-top'>
          <div className='summary-info'>
            <span className='summary-span'>
              <MdOutlineDateRange className='summary-icon' />
              Data zamówienia{' '}
            </span>
            <span>{orderSummary.createDate}</span>
          </div>

          <div className='summary-info'>
            <span className='summary-span'>
              <GrStatusUnknown className='summary-icon' />
              Status zamówienia{' '}
            </span>
            <OrderStatus status={orderSummary.state} />
          </div>

          <div className='summary-info'>
            <span className='summary-span'>
              <MdOutlineDeliveryDining className='summary-icon' />
              Sposób dostawy{' '}
            </span>
            <span>{orderSummary.deliver.type || 'Brak informacji'}</span>
          </div>

          {orderSummary.parcelLocker !== null ? (
            <div className='summary-info'>
              <span className='summary-span'>
                <TbNumber className='summary-icon' />
                Numer paczkomatu{' '}
              </span>
              <span>{orderSummary.parcelLocker || 'Brak informacji'}</span>
            </div>
          ) : null}

          <div className='summary-info'>
            <span className='summary-span'>
              <ImListNumbered className='summary-icon' />
              Ilość przedmiotów{' '}
            </span>
            <span>{orderSummary.fullQuantity}</span>
          </div>

          <div className='summary-info'>
            <span className='summary-span'>
              <IoPricetagsOutline className='summary-icon' />
              Cena z dostawą{' '}
            </span>
            <span>{orderSummary.fullPrice.toFixed(2)} zł</span>
          </div>

          {orderSummary.payuUrl !== null ? (
            <div className='summary-info'>
              <span className='summary-span'>
                <MdOutlinePayment className='summary-icon' />
                Dokończ płatność za zamówienie{' '}
              </span>
              <a
                href={orderSummary.payuUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='summary-a'
              >
                Opłać tutaj
              </a>
            </div>
          ) : null}

          <div className='summary-info summary-message'>
            <span className='summary-span'>
              <MdOutlineInfo className='summary-icon' />
              Wiadomość
            </span>
            <span
              className='summary-msg-span'
              style={{ color: 'green', fontWeight: 'bold' }}
            >
              {orderSummary.message}
            </span>
          </div>
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
