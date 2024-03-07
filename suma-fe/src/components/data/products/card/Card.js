import { CategoryContext } from '../../../auth/context/productContext'
import { useContext, useEffect, useState } from 'react'
import { BsZoomIn } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { TbArrowBackUp } from 'react-icons/tb'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { BsCartCheck } from 'react-icons/bs'

import './card.scss'

function Card () {
  const { productUuid } = useContext(CategoryContext)
  const { setPassCategory } = useContext(CategoryContext)
  const [mainImg, setMainImg] = useState('')
  const [productDetails, setProductDetails] = useState([])
  const [productCounter, setProductCounter] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  // Products data
  const [productAddedStatus, setProductAddedStatus] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/product/${productUuid}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setProductDetails(data)
        setMainImg(data.mainImg)
      })
      .catch(error => console.log(error))
  }, [productUuid])

  const handleProductAmountMinus = () => {
    setProductCounter(prevValue => prevValue - 1)
    setProductAddedStatus(false)
  }
  const handleProductAmountPlus = () => {
    setProductCounter(prevValue => prevValue + 1)
    setProductAddedStatus(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleGoBack = uuid => {
    setPassCategory(uuid)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? productDetails.images.length - 1 : prevIndex - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === productDetails.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handleProductBuy = () => {
    const requestedBasketData = {
      product: {
        uuid: productUuid
      },
      quantity: productCounter
    }

    fetch('http://localhost:8080/api/v1/basket', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestedBasketData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Produkt nie został dodany do koszyka.')
        }
        setProductAddedStatus(true)
        return response.json()
      })
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

  return Object.keys(productDetails).length > 0 ? (
    <section>
      <Link
        className='go-back-btn'
        to='/kategoria'
        onClick={() => handleGoBack(productDetails.category.uuid)}
      >
        <TbArrowBackUp />
        <span className='go-back-span'>Wstecz</span>
      </Link>
      <div className='prod-box'>
        <div className='prod-info'>
          <div className='prod-top'>
            <h2 className='prod-name mobile-hide'>{productDetails.name}</h2>
          </div>
          <hr className='hr-line' />
          <p>{productDetails.description}</p>
          <ul className='product-properties'>
            {productDetails.properties.map(properties => (
              <li className='product-properties-item'>
                <span className='product-prop-span'>
                  {' '}
                  {properties.name.charAt(0).toUpperCase() +
                    properties.name.slice(1)}
                </span>{' '}
                - <span> {properties.value}</span>
              </li>
            ))}
          </ul>

          <div className='prod-cta'>
            <div>
              <p className='prod-price'>{productDetails.price} zł</p>
              <span
                style={
                  productDetails.available === 0
                    ? { color: 'tomato', fontWeight: 'bold' }
                    : null
                }
              >
                Dostępnych: {productDetails.available}
              </span>
            </div>
            <div className='prod-btns'>
              <button
                disabled={productCounter <= 1}
                className='prod-btn'
                onClick={handleProductAmountMinus}
              >
                -
              </button>
              <span>{productCounter}</span>
              <button
                disabled={
                  productCounter === productDetails.available ||
                  productDetails.available === 0
                }
                className='prod-btn'
                onClick={handleProductAmountPlus}
              >
                +
              </button>
              <button
                onClick={handleProductBuy}
                className='prod-btn'
                disabled={productDetails.available === 0}
              >
                <BsCartCheck className='prod-shop-icon' />
                Dodaj do koszyka
              </button>
            </div>
            {productAddedStatus && (
              <>
                <span className='msg-success span-basket'>
                  Produkt został dodany.{' '}
                  <Link to='/koszyk' className='span-basket-btn'>
                    Przejdź do koszyka <BsCartCheck />
                  </Link>
                </span>
              </>
            )}
          </div>
        </div>

        <div className='prod-top mobile-order'>
          <h2 className='prod-name desktop-show'>{productDetails.name}</h2>
        </div>

        <figure className='mobile-order'>
          <img
            className='prod-main-img'
            src={mainImg}
            alt='main product'
            onClick={openModal}
            style={{ cursor: 'zoom-in' }}
          />
          <figcaption className='img-caption' onClick={openModal}>
            Kliknij aby powiększyć
            <BsZoomIn style={{ marginLeft: '5px' }} />
          </figcaption>
        </figure>

        <div className='prod-carusel mobile-order'>
          {productDetails.images.map((image, index) => (
            <img
              key={image}
              className='prod-side-img'
              src={image}
              alt='product'
              onClick={() => {
                setMainImg(image)
                setCurrentImageIndex(index)
              }}
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
            <div className='modal-image-container'>
              <button className='prev-button' onClick={handlePrevImage}>
                <MdOutlineArrowBackIos />
              </button>
              <img
                src={productDetails.images[currentImageIndex]}
                alt='modal zoomed in product'
              />
              <button className='next-button' onClick={handleNextImage}>
                <MdOutlineArrowForwardIos />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  ) : (
    'Brak danych'
  )
}

export default Card
