import { CategoryContext } from '../../../auth/context/useContext'
import { useContext, useEffect, useState } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import { BsZoomIn } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { TbArrowBackUp } from 'react-icons/tb'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { MdOutlineArrowBackIos } from 'react-icons/md'

import './card.scss'

function Card () {
  const { productUuid } = useContext(CategoryContext)
  const { setPassCategory } = useContext(CategoryContext)

  const [mainImg, setMainImg] = useState('')
  const [productDetails, setProductDetails] = useState([])
  const [productCounter, setProductCounter] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0) // Added state to track current image index

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
            <h2 className='prod-name'>{productDetails.name}</h2>
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
              <span>Dostępnych: {productDetails.available}</span>
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

        <figure>
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

        <div className='prod-carusel'>
          {productDetails.images.map((image, index) => (
            <img
              key={index}
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
