import { CategoryContext } from '../../../auth/context/useContext'
import { useContext, useEffect } from 'react'
import './card.scss'

function Card () {
  const { productUuid } = useContext(CategoryContext)
  const [mainImg, setMainImg] = useState('')

  console.log(productUuid)

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/product/${productUuid}`)
  }, [productUuid])

  return (
    <>
      <h2>Produkt details</h2>
    </>
  )
}

export default Card
