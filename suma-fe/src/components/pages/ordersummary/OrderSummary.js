import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import './ordersummary.scss'

// Komponent jest re-renderowany i state trafi swój stan
//  dlatego trzeba będzie przechować orderUUID w localstorage

function OrderSummary () {
  const [orderSummary, setOrderSummary] = useState([])

  const { token } = useParams()

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/document/order/info/${token}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setOrderSummary(data))
      .catch(error => console.log(error))
  }, [token])

  return Object.keys(orderSummary).length > 0 ? (
    <section>
      <h2>Podsumowanie zamówienia</h2>
      <div>
        <p>Data zamówienia: {orderSummary.createDate}</p>
        <p>Dostawa: {orderSummary.deliver.type}</p>
        <p>Dostawa img: {orderSummary.deliver.image}</p>
        <p>Dostawa cena: {orderSummary.deliver.price}</p>

        <p>Pełna cena: {orderSummary.fullPrice}</p>

        <p>Ilość przedmiotów: {orderSummary.fullPrice}</p>
      </div>
    </section>
  ) : (
    <p>Oczekiwanie na dane</p>
  )
}

export default OrderSummary
