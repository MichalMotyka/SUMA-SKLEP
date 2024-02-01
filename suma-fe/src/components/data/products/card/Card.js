import Slider from 'react-slick'

function Card ({ product, sliderSettings }) {
  console.log(product) // Check if product data is logged correctly
  const { name, price, description, mainImg, images } = product

  return (
    <div className='card'>
      <Slider {...sliderSettings}>
        {[mainImg, ...images].map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Product ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <div className='card-details'>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Price: {price} zł</p>
      </div>
    </div>
  )
}

export default Card
