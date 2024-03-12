import React, { createContext, useState } from 'react'

export const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  const [passCategory, setPassCategory] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [productUuid, setProductUuid] = useState('')
  const [basketItems, setBasketItems] = useState(0)

  return (
    <CategoryContext.Provider
      value={{
        passCategory,
        setPassCategory,
        searchValue,
        setSearchValue,
        setProductUuid,
        productUuid,
        basketItems,
        setBasketItems
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

// useContext został utworzony w useContext.js wraz z useState dla passCategoory
// dzięki temu Nav.js może przekazywać wynik dla setPassCategrory do contextu..
