import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './productsfiltering.scss'

const ProductsFiltering = props => {
  const [range, setRange] = useState([0, 250])

  const setPriceMin = props.props.setPriceMin
  const setPriceMax = props.props.setPriceMax
  const setFilterType = props.props.setFilterType
  const filterType = props.props.filterType

  const handleRangeChange = value => {
    setRange(value)
  }

  const handleSetFiltering = () => {
    setPriceMin(range[0])
    setPriceMax(range[1])
  }

  const handleFilterChange = e => {
    const [sortType, orderType] = e.target.value.split(' ')

    setFilterType({
      sortType: sortType,
      orderType: orderType
    })
  }

  const handleFilterReset = () => {
    setRange([0, 250])
    setPriceMin(0)
    setPriceMax(250)
    setFilterType({
      sortType: 'NAME',
      orderType: 'ASC'
    })
  }

  return (
    <section className='products'>
      <div className='filtering'>
        <div className='filtering-box'>
          <div className='slider'>
            <label htmlFor='priceRange'>Zakres cenowy:</label>
            <Slider
              min={0}
              max={500}
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
          <button className='slider-btn' onClick={handleSetFiltering}>
            Filtruj produkty
          </button>
          <button className='filtering-reset-btn' onClick={handleFilterReset}>
            Resetuj filtrowanie
          </button>
        </div>

        <div className='filter-container'>
          <label htmlFor='filterSelect' className='filter-label'>
            Sortowanie:
          </label>
          <select
            id='filterSelect'
            value={`${filterType.sortType} ${filterType.orderType}`}
            onChange={handleFilterChange}
            className='filter-select'
          >
            <option value='NAME ASC'>Nazwa, A do Z</option>
            <option value='NAME DESC'>Nazwa, Z do A</option>
            <option value='PRICE DESC'>Cena, malejąco</option>
            <option value='PRICE ASC'>Cena, rosnąco</option>
          </select>
        </div>
      </div>
    </section>
  )
}

export default ProductsFiltering
