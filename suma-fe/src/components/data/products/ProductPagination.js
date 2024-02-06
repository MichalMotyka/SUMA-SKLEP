import { HiArrowSmallLeft } from 'react-icons/hi2'

import { HiArrowSmallRight } from 'react-icons/hi2'

function ProductPagination (props) {
  const setPage = props.props.setPage
  const page = props.props.page
  const totalProducts = props.props.xTotalCount
  const productLimit = props.props.productLimit
  const howManyPages = Math.ceil(totalProducts / productLimit)

  function handlePrevPage () {
    setPage(prev => prev - 1)
  }

  function handleNextPage () {
    setPage(prev => prev + 1)
  }

  return (
    <>
      <div className='product-pagination'>
        <button
          className='pagination-btn'
          disabled={page === 1}
          onClick={handlePrevPage}
        >
          {' '}
          <HiArrowSmallLeft className='pagination-icon' />
          Poprzednia strona
        </button>
        <span style={{ fontWeight: 'bold' }}>
          Strona: {page}/ {howManyPages}
        </span>
        <button
          className='pagination-btn'
          onClick={handleNextPage}
          disabled={
            page === Math.ceil(totalProducts / productLimit) ||
            howManyPages === 0
          }
        >
          Następna strona
          <HiArrowSmallRight className='pagination-icon' />
        </button>
      </div>
    </>
  )
}

export default ProductPagination
