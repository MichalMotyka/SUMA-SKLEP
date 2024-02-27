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

    console.log(values)
  }

  const handlePackageReceiverType = e => {
    setpackageReceiverType(e.target.value)
  }

  const handleInvoiceType = e => {
    setInvoiceType(e.target.value)
  }

  return (
    <div>
      {orderUUID ? (
        <section>
          <h2>Zamówienie:</h2>
          <p>Wpisz dane, na które mamy dostarczyć Twoją przesyłkę</p>
          <div>
            <Formik
              initialValues={initialValues}
              validate={values =>
                OrderValidation(
                  values,
                  invoiceType,
                  packageReceiverType,
                  isInvoicing
                )
              }
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className='form'>
                  <fieldset className='fieldset'>
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
                    <div className='form-box'>
                      <div className='field'>
                        <label htmlFor='name'>Imię</label>
                        <Field id='name' name='name' placeholder='Imię' />
                        <ErrorMessage
                          name='name'
                          component='span'
                          className='signup-error-msg'
                        />
                      </div>

                      <div className='field'>
                        <label htmlFor='surname'>Nazwisko</label>
                        <Field
                          id='surname'
                          name='surname'
                          placeholder='Nazwisko'
                        />
                        <ErrorMessage
                          name='surname'
                          component='span'
                          className='signup-error-msg'
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='form-box'>
                      <div className='field'>
                        <label htmlFor='companyName'>Nazwa firmy</label>
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
                      </div>

                      <div className='field'>
                        <label htmlFor='nip'>NIP</label>
                        <Field
                          type='text' // zmiana typu na 'text'
                          id='nip'
                          name='nip'
                          placeholder='1234563218'
                          minLength='10'
                          maxLength='10'
                          pattern='[0-9]{10}'
                        />
                        <ErrorMessage
                          name='nip'
                          component='span'
                          className='signup-error-msg'
                        />
                      </div>
                    </div>
                  )}

                  <div className='form-box'>
                    <div className='field'>
                      <label htmlFor='phoneNumber'>
                        Nr telefonu komórkowego
                      </label>
                      <Field
                        id='phoneNumber'
                        name='phoneNumber'
                        placeholder='Numer telefonu'
                        type='number'
                        pattern='[0-9]{9}'
                      />
                      <ErrorMessage
                        name='phoneNumber'
                        component='span'
                        className='signup-error-msg'
                      />
                    </div>

                    <div className='field'>
                      <label htmlFor='email'>Email</label>
                      <Field
                        id='email'
                        name='email'
                        placeholder='adres e-mail'
                        type='email'
                      />
                      <ErrorMessage
                        name='email'
                        component='span'
                        className='signup-error-msg'
                      />
                    </div>
                  </div>

                  <div className='form-box'>
                    <div className='field'>
                      <label htmlFor='street'>Ulica</label>
                      <Field id='street' name='street' placeholder='Ulica' />
                      <ErrorMessage
                        name='street'
                        component='span'
                        className='signup-error-msg'
                      />
                    </div>

                    <div className='field'>
                      <label htmlFor='homeNumber'>Numer domu / lokalu</label>
                      <Field
                        id='homeNumber'
                        name='homeNumber'
                        placeholder='Numer domu/lokalu'
                        maxLength='20'
                      />
                      <ErrorMessage
                        name='homeNumber'
                        component='span'
                        className='signup-error-msg'
                      />
                    </div>
                  </div>

                  <div className='form-box'>
                    <div className='field'>
                      <label htmlFor='postCode'>Kod pocztowy</label>
                      <Field
                        id='postCode'
                        name='postCode'
                        placeholder='00-000'
                        pattern='[0-9]{2}-[0-9]{3}' // Wzorzec xx-xxx
                      />
                      <ErrorMessage
                        name='postCode'
                        component='span'
                        className='signup-error-msg'
                      />
                    </div>

                    <div className='field'>
                      <label htmlFor='city'>Miejscowość</label>
                      <Field id='city' name='city' placeholder='Miejscowość' />
                      <ErrorMessage
                        maxLength='50'
                        name='city'
                        component='span'
                        className='signup-error-msg'
                      />
                    </div>
                  </div>

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
                      <fieldset className='fieldset'>
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
                        <div className='form-box'>
                          <div className='field'>
                            <label htmlFor='invoicingName'>Imię</label>
                            <Field
                              id='invoicingName'
                              name='invoicingName'
                              placeholder='Imię'
                              maxLength='50'
                            />
                            <ErrorMessage
                              name='invoicingName'
                              component='span'
                              className='signup-error-msg'
                            />
                          </div>

                          <div className='field'>
                            <label htmlFor='invoicingSurname'>Nazwisko</label>
                            <Field
                              id='invoicingSurname'
                              name='invoicingSurname'
                              placeholder='Nazwisko'
                              maxLength='50'
                            />
                            <ErrorMessage
                              name='invoicingSurname'
                              component='span'
                              className='signup-error-msg'
                            />
                          </div>
                        </div>
                      ) : (
                        <div className='form-box'>
                          <div className='field'>
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
                          </div>

                          <div className='field'>
                            <label htmlFor='invoicingNip'>NIP</label>
                            <Field
                              id='invoicingNip'
                              name='invoicingNip'
                              placeholder='1234563218'
                              minLength='10'
                              maxLength='10'
                              pattern='[0-9]{10}'
                            />
                            <ErrorMessage
                              name='invoicingNip'
                              component='span'
                              className='signup-error-msg'
                            />
                          </div>
                        </div>
                      )}

                      <div className='form-box'>
                        <div className='field'>
                          <label htmlFor='invoicingStreet'>Ulica</label>
                          <Field
                            id='invoicingStreet'
                            name='invoicingStreet'
                            placeholder='Ulica'
                          />
                          <ErrorMessage
                            name='invoicingStreet'
                            component='span'
                            className='signup-error-msg'
                          />
                        </div>

                        <div className='field'>
                          <label htmlFor='invoicingHomeNumber'>
                            Numer domu/lokalu
                          </label>
                          <Field
                            id='invoicingHomeNumber'
                            name='invoicingHomeNumber'
                            placeholder='Numer domu/lokalu'
                          />
                          <ErrorMessage
                            name='invoicingHomeNumber'
                            component='span'
                            className='signup-error-msg'
                          />
                        </div>
                      </div>

                      <div className='form-box'>
                        <div className='field'>
                          <label htmlFor='invoicingPostCode'>
                            Kod pocztowy
                          </label>
                          <Field
                            id='invoicingPostCode'
                            name='invoicingPostCode'
                            placeholder='00-000'
                            pattern='[0-9]{2}-[0-9]{3}'
                          />
                          <ErrorMessage
                            name='invoicingPostCode'
                            component='span'
                            className='signup-error-msg'
                          />
                        </div>

                        <div className='field'>
                          <label htmlFor='invoicingCity'>Miasto</label>
                          <Field
                            id='invoicingCity'
                            name='invoicingCity'
                            placeholder='Miasto'
                            maxLength='50'
                          />
                          <ErrorMessage
                            name='invoicingCity'
                            component='span'
                            className='signup-error-msg'
                          />
                        </div>
                      </div>
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
