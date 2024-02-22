import { Formik, Field, Form } from 'formik'
import './order.scss'

function Order () {
  return (
    <section>
      <h2>Zamówienie:</h2>
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

// pobierz koszyk, zeby mieć jego ID
// Potem stwórz formularz w formiku.
