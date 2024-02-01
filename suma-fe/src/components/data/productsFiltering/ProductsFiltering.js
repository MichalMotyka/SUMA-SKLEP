import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './productsfiltering.scss'

const ProductsFiltering = () => {
  const [range, setRange] = useState([50, 250])

  const [filtering, setFiltering] = useState('')

  const handleRangeChange = value => {
    setRange(value)
  }

  const handleFilterChange = e => {
    setFiltering(e.target.value)
  }

  return (
    <section className='products'>
      <div className='filtering'>
        <div className='filtering-box'>
          <div className='slider'>
            <label htmlFor='priceRange'>Zakres cenowy:</label>
            <Slider
              min={0}
              max={1000}
              value={range}
              onChange={handleRangeChange}
              range
            />
            <div className='slider-info'>
              <span>
                {range[0]} PLN - {range[1]} PLN
              </span>
            </div>
          </div>
          <button className='slider-btn'>Filtruj produkty</button>
        </div>

        <div className='filter-container'>
          <label htmlFor='filterSelect' className='filter-label'>
            Sortowanie:
          </label>
          <select
            id='filterSelect'
            value={filtering}
            onChange={handleFilterChange}
            className='filter-select'
          >
            <option value='NameAsc'>Nazwa, A do Z</option>
            <option value='NameDesc'>Nazwa, Z do A</option>
            <option value='PriceDesc'>Cena, malejąco</option>
            <option value='PriceAsc'>Cena, rosnąco</option>
          </select>
        </div>
      </div>
    </section>
  )
}

export default ProductsFiltering
