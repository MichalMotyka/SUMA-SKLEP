import { CategoryContext } from '../../../auth/context/useContext'
import { useContext, useEffect, useState } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import { BsZoomIn } from 'react-icons/bs'

import './card.scss'

function Card () {
  const { productUuid } = useContext(CategoryContext)
  const [mainImg, setMainImg] = useState('')
  const [productDetails, setProductDetails] = useState([])
  const [productCounter, setProductCounter] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  console.log(productDetails)

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/product/${productUuid}`)
      .then(response => response.json())
      .then(data => {
        setProductDetails(data)
        setMainImg(data.mainImg) // set mainImg when data is fetched
      })
      .catch(error => console.log(error))
  }, [productUuid])

  const handleProductAmountMinus = () => {
    setProductCounter(prevValue => prevValue - 1)
  }
  const handleProductAmountPlus = () => {
    setProductCounter(prevValue => prevValue + 1)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return Object.keys(productDetails).length > 0 ? (
    <section>
      <div className='prod-box'>
        <div className='prod-info'>
          <div>
            <h2 className='prod-name'>{productDetails.name}</h2>
          </div>
          {/* <p>{productDetails.description}</p> */}
          <hr className='hr-line' />
          <p>{productDetails.description}</p>
          <hr className='hr-line' />
          <div className='prod-cta'>
            <div>
              <p className='prod-price'>{productDetails.price} zł</p>
              <span>Dostępnych: {productDetails.available}</span>
            </div>
            <div className='prod-btns'>
              {' '}
              <button
                disabled={productCounter <= 1}
                className='prod-btn'
                onClick={handleProductAmountMinus}
              >
                -
              </button>
              <span>{productCounter}</span>
              <button
                disabled={productCounter === productDetails.available}
                className='prod-btn'
                onClick={handleProductAmountPlus}
              >
                +
              </button>
              <button className='prod-btn'>
                <MdAddShoppingCart className='prod-shop-icon' />
                Dodaj do koszyka
              </button>
            </div>
          </div>
        </div>

        {/* 
        <div>
       
          <img
            className='prod-main-img'
            src={mainImg}
            alt='main product'
            onClick={openModal}
            style={{ cursor: 'zoom-in' }}
          />
        </div> */}

        <figure>
          <img
            className='prod-main-img'
            src={mainImg}
            alt='main product'
            onClick={openModal}
            style={{ cursor: 'zoom-in' }}
          />
          <figcaption className='img-caption'>
            Kliknij aby powiększyć
            <BsZoomIn style={{ marginLeft: '5px' }} />
          </figcaption>
        </figure>

        <div className='prod-carusel'>
          {productDetails.images.map(images => (
            <img
              className='prod-side-img'
              src={images}
              alt='product'
              width={125}
              onClick={() => setMainImg(images)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className='modal' onClick={closeModal}>
          <div className='modal-content' onClick={e => e.stopPropagation()}>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <img
              src={mainImg}
              alt='modal'
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </section>
  ) : (
    'Brak danych'
  )
}

export default Card
