import { useState, useEffect } from 'react'

export function OrderUUID () {
  const [orderUUID, setOrderUUID] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
  
  }, []) // Pusta tablica zależności oznacza, że useEffect będzie wywołany tylko raz, po zamontowaniu komponentu.

  if (error) {
    return <div>Error: {error}</div>
  }

  return <div>{orderUUID}</div>
}
