import { useState, useEffect } from 'react'

import Nav from '../../common/nav/Nav'

// lista katerorii z api do wstawienia do menu
function MenuCategory () {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:8080/api/v1/category?type=CATEGORY&bySupercategory=false`

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'X-Total-Count': 'true'
          }
        })

        if (response.ok) {
          const jsonData = await response.json()
          setData(jsonData)
        } else {
          const errorText = await response.text()
          console.error('Error fetching data:', errorText)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Nav data={data} />
    </>
  )
}

export default MenuCategory
