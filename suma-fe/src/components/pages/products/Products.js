
import ProductsData from '../../data/products/ProductsData'
import './products.scss'

const Products = data => {

  return (
    <section className='products'>

      <ProductsData data={data} />
    </section>
  )
}

export default Products
