import { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import './order.scss'

function Order () {
  const [orderUUID, setOrderUUID] = useState('')
  //dane ze statusem operacji
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/document/order', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const totalCount = response.headers.get('order')
        setOrderUUID(totalCount)
        return response.json()
      })
      .then(data => {
        console.log('Response Body:', data)
        setData(data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])

  console.log('data', data)
  console.log('orderuid', orderUUID) // This will log the initial state of orderUUID, not the updated value.

  return (
    <section>
      <h2>Zamówienie:</h2>
      <p>UUID zamówienia: {orderUUID}</p>
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: ''
          }}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 500))
            alert(JSON.stringify(values, null, 2))
          }}
        >
          <Form>
            <label htmlFor='firstName'>Imię</label>
            <Field id='firstName' name='firstName' placeholder='Jane' />

            <label htmlFor='lastName'>Nazwisko</label>
            <Field id='lastName' name='lastName' placeholder='Doe' />

            <label htmlFor='email'>Email</label>
            <Field
              id='email'
              name='email'
              placeholder='jane@acme.com'
              type='email'
            />
            <button type='submit'>Submit</button>
          </Form>
        </Formik>
      </div>
    </section>
  )
}

export default Order
