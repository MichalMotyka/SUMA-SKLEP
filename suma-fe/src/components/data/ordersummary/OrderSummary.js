import { useState, useEffect } from 'react'

import './ordersummary.scss'

// Komponent jest re-renderowany i state trafi swój stan
//  dlatego trzeba będzie przechować orderUUID w localstorage

function OrderSummary () {
  const [orderIDSummary, setORderIDSummary] = useState('')

  useEffect(() => {
    const orderUUID = localStorage.getItem('orderUUID')
    setORderIDSummary(orderUUID)
  }, [])

  console.log('gowno?', orderIDSummary)

  return (
    <section>
      <h2>Order Summary</h2>
      <p>Tutaj: {orderIDSummary}</p>
    </section>
  )
}

export default OrderSummary
