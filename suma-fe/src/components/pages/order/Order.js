import { FaSpinner } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import OrderValidation from '../../auth/validation/OrderValidation'
import OrderCart from './orderCart/OrderCart'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from 'react-icons/fa6'
import './order.scss'

function Order () {
  const [orderUUID, setOrderUUID] = useState('')
  const [isInvoicing, setIsInvoicing] = useState(false)
  const [invoiceType, setInvoiceType] = useState('private')
  const [packageReceiverType, setpackageReceiverType] =
    useState('privatePackage')
  const [delivery, setDelivery] = useState([])
  const [deliveryUUID, setDeliveryUUID] = useState('')
  const [paymentURL, setPaymentURL] = useState('null')

  console.log('paymenturl', paymentURL)

  useEffect(() => {
    if (paymentURL && paymentURL !== 'null') {
      window.location.href = paymentURL
    } else {
      console.error('Payment URL is not available')
    }
  }, [paymentURL])

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
        const orderID = response.headers.get('order')
        setOrderUUID(orderID)
        return response.json()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])

  // DELIVERY TYPE:

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/deliver')
      .then(response => response.json())
      .then(data => setDelivery(data))
      .catch(error => console.log(error))
  }, [])

  // BASKET INFO:

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
      uuid: deliveryUUID
    }
  }

  const handleSubmit = values => {
    fetch('http://localhost:8080/api/v1/document/order', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const orderURL = response.headers.get('x-location')
        setPaymentURL(orderURL)

        return response.json()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handlePackageReceiverType = e => {
    setpackageReceiverType(e.target.value)
  }

  const handleInvoiceType = e => {
    setInvoiceType(e.target.value)
  }

  const handleDelivery = uuid => {
    setDeliveryUUID(uuid)
  }

  console.log('ID DELIVERKI', deliveryUUID)
  console.log('ID UUID', orderUUID)

  return (
    <div>
      {orderUUID ? (
        <section>
          <div className='order-nav'>
            <Link className='basket-link' to='/koszyk'>
              <span>Koszyk</span>
            </Link>
            <FaArrowRightLong />
            <p className='order-status'>Zamówienie</p>
          </div>
          <p className='order-info'>
            Podaj dane, na które mamy dostarczyć Twoją przesyłkę.
          </p>
          <div className='order'>
            <div className='left-box'>
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
                {({ isSubmitting, isValid, dirty, setFieldValue }) => (
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
                        <label
                          className='fieldset-label'
                          htmlFor='packagePrivate'
                        >
                          Osoba prywatna
                        </label>
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
                        <label className='fieldset-label' htmlFor='packageFirm'>
                          Firma
                        </label>
                      </div>
                    </fieldset>
                    {packageReceiverType === 'privatePackage' ? (
                      <div className='form-box'>
                        <div className='field'>
                          <label htmlFor='name'>Imię</label>
                          <Field
                            className='field-input'
                            id='name'
                            name='name'
                            placeholder='Imię'
                            maxLength='50'
                          />
                          <ErrorMessage
                            name='name'
                            component='span'
                            className='signup-error-msg'
                          />
                        </div>

                        <div className='field'>
                          <label htmlFor='surname'>Nazwisko</label>
                          <Field
                            className='field-input'
                            id='surname'
                            name='surname'
                            placeholder='Nazwisko'
                            maxLength='50'
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
                            className='field-input'
                            id='companyName'
                            name='companyName'
                            placeholder='Nazwa firmy'
                            maxLength='350'
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
                            className='field-input'
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
                          className='field-input'
                          id='phoneNumber'
                          name='phoneNumber'
                          placeholder='Numer telefonu'
                          type='text'
                          pattern='[0-9]{9}'
                          maxLength='9'
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
                          className='field-input'
                          id='email'
                          name='email'
                          placeholder='Adres e-mail'
                          type='email'
                          maxLength='100'
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
                        <Field
                          className='field-input'
                          id='street'
                          name='street'
                          placeholder='Ulica'
                          maxLength='350'
                        />
                        <ErrorMessage
                          name='street'
                          component='span'
                          className='signup-error-msg'
                        />
                      </div>

                      <div className='field'>
                        <label htmlFor='homeNumber'>Numer domu / lokalu</label>
                        <Field
                          className='field-input'
                          id='homeNumber'
                          name='homeNumber'
                          placeholder='Numer domu/lokalu'
                          maxLength='50'
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
                          className='field-input'
                          id='postCode'
                          name='postCode'
                          placeholder='00-000'
                          pattern='[0-9]{2}-[0-9]{3}'
                          maxLength='6'
                        />
                        <ErrorMessage
                          name='postCode'
                          component='span'
                          className='signup-error-msg'
                        />
                      </div>

                      <div className='field'>
                        <label htmlFor='city'>Miejscowość</label>
                        <Field
                          className='field-input'
                          id='city'
                          name='city'
                          placeholder='Miejscowość'
                        />
                        <ErrorMessage
                          maxLength='50'
                          name='city'
                          component='span'
                          className='signup-error-msg'
                        />
                      </div>
                    </div>
                    {/* ZAMÓWIENIE: */}
                    <div>
                      <Field
                        id='invoice'
                        type='checkbox'
                        name='invoicing'
                        onClick={() => setIsInvoicing(!isInvoicing)}
                      />
                      <label className='invoice-label' htmlFor='invoice'>
                        Chcę fakturę na inne dane
                      </label>
                    </div>
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
                            <label className='fieldset-label' htmlFor='private'>
                              Osoba prywatna
                            </label>
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
                            <label className='fieldset-label' htmlFor='firm'>
                              Firma
                            </label>
                          </div>
                        </fieldset>

                        {/* TUTAJ ZACZYNA SIE FAKTURA NA INNE DANE */}

                        {invoiceType === 'private' ? (
                          <div className='form-box'>
                            <div className='field'>
                              <label htmlFor='invoicingName'>Imię</label>
                              <Field
                                className='field-input'
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
                                className='field-input'
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
                                className='field-input'
                                id='invoicingCompanyName'
                                name='invoicingCompanyName'
                                placeholder='Nazwa firmy'
                                maxLength='350'
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
                                className='field-input'
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
                              className='field-input'
                              id='invoicingStreet'
                              name='invoicingStreet'
                              placeholder='Ulica'
                              maxLength='350'
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
                              className='field-input'
                              id='invoicingHomeNumber'
                              name='invoicingHomeNumber'
                              placeholder='Numer domu/lokalu'
                              maxLength='50'
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
                              className='field-input'
                              id='invoicingPostCode'
                              name='invoicingPostCode'
                              placeholder='00-000'
                              pattern='[0-9]{2}-[0-9]{3}'
                              maxLength='6'
                            />
                            <ErrorMessage
                              name='invoicingPostCode'
                              component='span'
                              className='signup-error-msg'
                            />
                          </div>

                          <div className='field'>
                            <label htmlFor='invoicingCity'>Miejscowość</label>
                            <Field
                              className='field-input'
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

                    <h2>Dostawa:</h2>
                    <p>Wybierz sposób dostawy paczki.</p>

                    <div>
                      {delivery.map(delivery => (
                        <div
                          key={delivery.uuid}
                          onClick={() => {
                            handleDelivery(delivery.uuid)
                            setFieldValue('deliver.uuid', delivery.uuid)
                          }}
                          className='delivery'
                        >
                          <label
                            htmlFor={`delivery-${delivery.uuid}`}
                            className='delivery-box'
                          >
                            <div className='delivery-input'>
                              <input
                                type='radio'
                                id={`delivery-${delivery.uuid}`}
                                name='deliveryUUID'
                                value={delivery.uuid}
                                onChange={e => handleDelivery(e.target.value)}
                                checked={delivery.uuid === deliveryUUID}
                              />
                              <p className='delivery-span'>
                                {delivery.type}
                              </p>
                            </div>
                            <img
                              width={100}
                              src={delivery.image}
                              alt={`typ wysyłki ${delivery.type}`}
                            />
                            <span style={{fontWeight:"bold"}}>{delivery.price} zł</span>
                          </label>
                        </div>
                      ))}
                    </div>

                    <button
                      className='form-btn'
                      type='submit'
                      disabled={!(dirty && isValid && deliveryUUID !== '')}
                    >
                      {isSubmitting ? 'Wysyłanie...' : 'Zamawiam i płacę'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            <div className='right-box'>
              <OrderCart />
            </div>
          </div>
        </section>
      ) : (
        <>
          <p>Ładowanie...</p> {` `}
          <FaSpinner className='spinner-icon' />
        </>
      )}
    </div>
  )
}

export default Order
