import React, { useEffect } from 'react'

function Inpost () {
  useEffect(() => {
    // Dodajemy skrypt CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://geowidget.inpost.pl/inpost-geowidget.css'
    document.head.appendChild(link)

    // Dodajemy skrypt JS
    const script = document.createElement('script')
    script.src = 'https://geowidget.inpost.pl/inpost-geowidget.js'
    script.defer = true
    script.onload = () => {
      // Definiujemy funkcję afterPointSelected po załadowaniu skryptu
      window.afterPointSelected = function (point) {
        alert('Selected point: ' + point.name)
      }
    }
    document.body.appendChild(script)

    // Usuwamy skrypt i link po odmontowaniu komponentu
    return () => {
      document.body.removeChild(script)
      document.head.removeChild(link)
    }
  }, [])

  return (
    <inpost-geowidget
      token='token-for-geo'
      language='pl'
      config='parcelcollect'
    ></inpost-geowidget>
  )
}

export default Inpost
