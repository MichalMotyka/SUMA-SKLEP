import { useEffect, useContext } from 'react'
import { CategoryContext } from './productContext'

const CreateBasket = () => {
  const { setBasketItems } = useContext(CategoryContext)

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/basket`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setBasketItems(data.basketItem.length))
      .catch(error => console.log(error))
  }, [setBasketItems])

  return null
}

export default CreateBasket
