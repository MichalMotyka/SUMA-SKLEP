import { useEffect, useContext } from 'react'
import { CategoryContext } from './productContext'

const CreateBasket = () => {
  const { setBasketItems, ipMan } = useContext(CategoryContext)

  useEffect(() => {
    fetch(`http://${ipMan}/api/v1/basket`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setBasketItems(data.basketItem.length))
      .catch(error => console.log(error))
  }, [setBasketItems, ipMan])

  return null
}

export default CreateBasket
