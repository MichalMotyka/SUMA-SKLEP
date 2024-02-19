import { useEffect, useState } from 'react'

function Cart () {
  const [basketData, setBasketData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/basket`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setBasketData(data))
      .catch(error => console.log(error))
  }, [])

  console.log('co w Cart.js', basketData)

  return (
    <section>
      <h2>"Kup coś więcej qrwo jebana." ~Krynio</h2>
    </section>
  )
}

export default Cart
