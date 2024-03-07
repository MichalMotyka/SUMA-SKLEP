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
    style={{ width: '800px', height: '600px' }} // Dodajemy style CSS

      token='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkVzROZW9TeXk0OHpCOHg4emdZX2t5dFNiWHY3blZ0eFVGVFpzWV9TUFA4In0.eyJleHAiOjIwMjUxODE5OTcsImlhdCI6MTcwOTgyMTk5NywianRpIjoiZWJiNTM0NjAtNjJjZC00YjdhLWFlOTUtNjJlZDc2YTRmZDY4IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWxvZ2luLmlucG9zdC5wbC9hdXRoL3JlYWxtcy9leHRlcm5hbCIsInN1YiI6ImY6N2ZiZjQxYmEtYTEzZC00MGQzLTk1ZjYtOThhMmIxYmFlNjdiOjFOUldkeU5EcWRwV1RIeDFDdXNnb2VjOTl3ck9OVXpRTl9YS2tuQlBiZTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaGlweCIsInNlc3Npb25fc3RhdGUiOiJkNzNjNjVlMy04MDZhLTRiMDMtYTc2OS0wNjYzYTZjMmFjYmUiLCJzY29wZSI6Im9wZW5pZCBhcGk6YXBpcG9pbnRzIiwic2lkIjoiZDczYzY1ZTMtODA2YS00YjAzLWE3NjktMDY2M2E2YzJhY2JlIiwiYWxsb3dlZF9yZWZlcnJlcnMiOiIxODguMjExLjE4LjEwNiIsInV1aWQiOiIwMzIxNDhmNS04ODk0LTQ3YmItYjliYi05YWIwZWM4MmZlMTkifQ.N-uVMRnpblcq4MmjAkoH1IwcIBxppY8vmqsWuoDsAFCO6PX3z2QHgZCNmV0lPQmJ9ZtM6U9RDrNobS4TGOWrKRTFgEMcHGMy_v546XdAv5GGljWnLtwYTqWsCPVse-0yzyHZshJH4ZXJlyt50a20-82MEvJea3VfAuaSfk_d5Wi-QNdSRDroern7PYkn3A4WnwO3hWJrhhqbddnRiyYUnG4IeGyaZnUCbnvFx_LAsdO5YkBvOE5-KaQmMAEVF0eeQ71PlBlbTR-3I9EN-1d_vAwwTUD9GtfAZ1AIDf2t4qohowjSyeX0gH6sGSSQcJ3gXDDg53GvZmeGxYDOJjXxXA'
      language='pl'
      config='parcelcollect'
    ></inpost-geowidget>
  )
}

export default Inpost
