import { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import './order.scss'
import OrderValidation from '../../auth/validation/OrderValidation'

function Order () {
  const [orderUUID, setOrderUUID] = useState('')
  const [isInvoicing, setIsInvoicing] = useState(false)
  const [invoiceType, setInvoiceType] = useState('private')
  const [packageReceiverType, setpackageReceiverType] =
    useState('privatePackage')

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
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])

  const initialValues = {
    uuid: orderUUID,
    name: '',
    surname: '',
    companyName: '',
    nip: '',
    homeNumber: '',
    street: '',
    city: '',
    postCode: '',
    invoicing: isInvoicing,
    invoicingName: '',
    invoicingSurname: '',
    invoicingCompanyName: '',
    invoicingNip: '',
    invoicingHomeNumber: '',
    invoicingStreet: '',
    invoicingCity: '',
    invoicingPostCode: '',
    email: '',
    phoneNumber: '',
    info: '',
    deliver: {
      uuid: orderUUID
    }
  }

  const handleSubmit = values => {
    // Wysłanie danych do API - użyj fetch lub innej biblioteki do wysyłania żądań HTTP
    console.log('Siemanko?')
    console.log(values)
  }

  const handlePackageReceiverType = e => {
    setpackageReceiverType(e.target.value)
  }

  const handleInvoiceType = e => {
    setInvoiceType(e.target.value)
  }

  console.log(initialValues)

  return (
    <div>
      {orderUUID ? (
        <section>
          <h2>Zamówienie:</h2>
          <p>UUID zamówienia: {orderUUID}</p>
          <div>
            <Formik
              initialValues={initialValues}
              validate={OrderValidation}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <fieldset>
                    <div>
                      <input
                        type='radio'
                        id='packagePrivate'
                        name='packageReceiverType'
                        value='privatePackage'
                        checked={packageReceiverType === 'privatePackage'}
                        onChange={handlePackageReceiverType}
                      />
                      <label htmlFor='packagePrivate'>Osoba prywatna</label>
                    </div>

                    <div>
                      <input
                        type='radio'
                        id='packageFirm'
                        name='packageReceiverType'
                        value='firmPackage'
                        checked={packageReceiverType === 'firmPackage'}
                        onChange={handlePackageReceiverType}
                      />
                      <label htmlFor='packageFirm'>Firma</label>
                    </div>
                  </fieldset>

                  {packageReceiverType === 'privatePackage' ? (
                    <>
                      <label htmlFor='name'>Imię</label>
                      <Field id='name' name='name' placeholder='Jane' />
                      <ErrorMessage
                        name='name'
                        component='span'
                        className='signup-error-msg'
                      />

                      <label htmlFor='surname'>Nazwisko</label>
                      <Field id='surname' name='surname' placeholder='Doe' />
                      <ErrorMessage
                        name='surname'
                        component='span'
                        className='signup-error-msg'
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor='name'>Nazwa firmy</label>
                      <Field
                        id='companyName'
                        name='companyName'
                        placeholder='Nazwa firmy'
                      />
                      <ErrorMessage
                        name='companyName'
                        component='span'
                        className='signup-error-msg'
                      />

                      <label htmlFor='surname'>NIP</label>
                      <Field id='nip' name='nip' placeholder='NIP' />
                      <ErrorMessage
                        name='nip'
                        component='span'
                        className='signup-error-msg'
                      />
                    </>
                  )}

                  <label htmlFor='email'>Email</label>
                  <Field
                    id='email'
                    name='email'
                    placeholder='jane@acme.com'
                    type='email'
                  />
                  <ErrorMessage
                    name='email'
                    component='span'
                    className='signup-error-msg'
                  />

                  <label htmlFor='city'>Miasto</label>
                  <Field id='city' name='city' placeholder='Warszawa' />
                  <ErrorMessage
                    name='city'
                    component='span'
                    className='signup-error-msg'
                  />

                  <label htmlFor='phoneNumber'>Numer telefonu</label>
                  <Field
                    id='phoneNumber'
                    name='phoneNumber'
                    placeholder='123-123-123'
                  />
                  <ErrorMessage
                    name='phoneNumber'
                    component='span'
                    className='signup-error-msg'
                  />

                  <label htmlFor='city'>Ulica</label>
                  <Field id='street' name='street' placeholder='Kolejowa' />
                  <ErrorMessage
                    name='street'
                    component='span'
                    className='signup-error-msg'
                  />
                  <label htmlFor='homeNumber'>Numer domu</label>
                  <Field id='homeNumber' name='homeNumber' placeholder='12' />
                  <ErrorMessage
                    name='homeNumber'
                    component='span'
                    className='signup-error-msg'
                  />
                  <label htmlFor='city'>Kod pocztowy</label>
                  <Field id='postCode' name='postCode' placeholder='00-000' />
                  <ErrorMessage
                    name='postCode'
                    component='span'
                    className='signup-error-msg'
                  />

                  {/* ZAMÓWIENIE: */}

                  <label>
                    <Field
                      type='checkbox'
                      name='invoicing'
                      onClick={() => setIsInvoicing(!isInvoicing)}
                    />
                    Chcę fakturę na inne dane
                  </label>

                  {isInvoicing && (
                    <>
                      <fieldset>
                        <div>
                          <input
                            type='radio'
                            id='private'
                            name='invoiceType'
                            value='private'
                            checked={invoiceType === 'private'}
                            onChange={handleInvoiceType}
                          />
                          <label htmlFor='private'>Osoba prywatna</label>
                        </div>
                        <div>
                          <input
                            type='radio'
                            id='firm'
                            name='invoiceType'
                            value='firm'
                            checked={invoiceType === 'firm'}
                            onChange={handleInvoiceType}
                          />
                          <label htmlFor='firm'>Firma</label>
                        </div>
                      </fieldset>

                      {/* TUTAJ ZACZYNA SIE FAKTURA NA INNE DANE */}

                      {invoiceType === 'private' ? (
                        <>
                          <label htmlFor='invoicingName'>Imię</label>
                          <Field
                            id='invoicingName'
                            name='invoicingName'
                            placeholder='Jane'
                          />
                          <ErrorMessage
                            name='invoicingName'
                            component='span'
                            className='signup-error-msg'
                          />

                          <label htmlFor='invoicingSurname'>Nazwisko</label>
                          <Field
                            id='invoicingSurname'
                            name='invoicingSurname'
                            placeholder='Doe'
                          />
                          <ErrorMessage
                            name='invoicingSurname'
                            component='span'
                            className='signup-error-msg'
                          />
                        </>
                      ) : (
                        <>
                          <label htmlFor='invoicingCompanyName'>
                            Nazwa firmy
                          </label>
                          <Field
                            id='invoicingCompanyName'
                            name='invoicingCompanyName'
                            placeholder='Nazwa firmy'
                          />
                          <ErrorMessage
                            name='invoicingCompanyName'
                            component='span'
                            className='signup-error-msg'
                          />

                          <label htmlFor='invoicingNip'>NIP</label>
                          <Field
                            id='invoicingNip'
                            name='invoicingNip'
                            placeholder='NIP'
                          />
                          <ErrorMessage
                            name='invoicingNip'
                            component='span'
                            className='signup-error-msg'
                          />
                        </>
                      )}

                      <label htmlFor='invoicingCity'>Miasto</label>
                      <Field
                        id='invoicingCity'
                        name='invoicingCity'
                        placeholder='Warszawa'
                      />
                      <ErrorMessage
                        name='invoicingCity'
                        component='span'
                        className='signup-error-msg'
                      />

                      <label htmlFor='invoicingStreet'>Ulica</label>
                      <Field
                        id='invoicingStreet'
                        name='invoicingStreet'
                        placeholder='Kolejowa'
                      />
                      <ErrorMessage
                        name='invoicingStreet'
                        component='span'
                        className='signup-error-msg'
                      />
                      <label htmlFor='invoicingHomeNumber'>Numer domu</label>
                      <Field
                        id='invoicingHomeNumber'
                        name='invoicingHomeNumber'
                        placeholder='12'
                      />
                      <ErrorMessage
                        name='invoicingHomeNumber'
                        component='span'
                        className='signup-error-msg'
                      />
                      <label htmlFor='invoicingPostCode'>Kod pocztowy</label>
                      <Field
                        id='invoicingPostCode'
                        name='invoicingPostCode'
                        placeholder='00-000'
                      />
                      <ErrorMessage
                        name='invoicingPostCode'
                        component='span'
                        className='signup-error-msg'
                      />
                    </>
                  )}

                  <button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij zamówienie'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      ) : (
        'Oczekiwanie ...'
      )}
    </div>
  )
}

export default Order
