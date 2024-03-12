import React, { useEffect } from 'react'

function Inpost (props) {
  const onPointCallback = e => {
    console.log(e)
    props.setLocation(prevValue => ({
      ...prevValue,
      type: e.opening_hours,
      line1: e.address.line1,
      line2: e.address.line2,
      name: e.name
    }))
    props.disableModal(false)
  }

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://geowidget.inpost.pl/inpost-geowidget.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src =
      'https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.js'
    script.defer = true
    script.onload = () => {
      window.afterPointSelected = onPointCallback
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
      document.head.removeChild(link)
    }
  }, [])

  return (
    <inpost-geowidget
      style={{ width: '80vw', height: '80vh' }}
      id='3'
      token='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkVzROZW9TeXk0OHpCOHg4emdZX2t5dFNiWHY3blZ0eFVGVFpzWV9TUFA4In0.eyJleHAiOjIwMjUxODQzMDYsImlhdCI6MTcwOTgyNDMwNiwianRpIjoiZWU3ZGM3YjktNWI4MS00OTUzLTg2YzItZjIxODUyMjQ4MjJmIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWxvZ2luLmlucG9zdC5wbC9hdXRoL3JlYWxtcy9leHRlcm5hbCIsInN1YiI6ImY6N2ZiZjQxYmEtYTEzZC00MGQzLTk1ZjYtOThhMmIxYmFlNjdiOjFOUldkeU5EcWRwV1RIeDFDdXNnb2VjOTl3ck9OVXpRTl9YS2tuQlBiZTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaGlweCIsInNlc3Npb25fc3RhdGUiOiIyMmFmNzc0Mi0zMzhiLTQwZGQtYTMzNy05Y2ViYjdmNmE5ZmQiLCJzY29wZSI6Im9wZW5pZCBhcGk6YXBpcG9pbnRzIiwic2lkIjoiMjJhZjc3NDItMzM4Yi00MGRkLWEzMzctOWNlYmI3ZjZhOWZkIiwiYWxsb3dlZF9yZWZlcnJlcnMiOiIiLCJ1dWlkIjoiMDMyMTQ4ZjUtODg5NC00N2JiLWI5YmItOWFiMGVjODJmZTE5In0.AWn-GnkTAOgKx_yCruQGNyKG-JKUEEb_3hdZToteOeavDS5Yg_B1390MMKGjpoKnhoFfQs0FOVvOQIKIK0vVPNN2T8ILZBkQuO61ZCxL70iM1YDQel3WcYIaR5T3trJMOjqxC8BmNIPwVr7VlbCV1I2MlL8MqYmW5D0Ys7aopEfmcKPx2RfknNJ-OQody8iKk-iriwxVtFUjwZpuM33EUnxU1jGKdxyjCjrDzQNP7iu98AkGt8l06rjMG757GU6NpGN0aZSRO6km_hS6iNgiC0b39XgfpAPXBpF_q5Eji2aQJqTSYnd6dWja6hPKuIG1sAwdtI4kkkwIjkob2szDXA'
      language='pl'
      config='parcelSend'
      onpoint='afterPointSelected'
    ></inpost-geowidget>
  )
}

export default Inpost