import { FaSpinner } from 'react-icons/fa'
import { useState, useEffect, useRef, useContext } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import OrderValidation from '../../auth/validation/OrderValidation'
import OrderCart from './orderCart/OrderCart'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from 'react-icons/fa6'
import './order.scss'
import Inpost from '../../data/inpost/Inpost'
import { CategoryContext } from '../../auth/context/productContext'

function Order () {
  const { ipMan } = useContext(CategoryContext)
  const modalRef = useRef()
  // ID INPOSTU DO MIANY NA PRODUKCJI!
  const inpostID = '321312321'
  // obiekt przechowujace dane paczkomatu
  const [getInpostLocation, setGetInpostLocation] = useState({
    type: '',
    line1: '',
    line2: '',
    name: ''
  })

  // DODAJ OBSŁUGE BŁĘDÓW PO WCISNIECIU GUZIKA WYŚLIJ
  const abortController = new AbortController();
  const [errorHandle, setErrorHandle] = useState('')

  const [orderUUID, setOrderUUID] = useState('')
  const [isInvoicing, setIsInvoicing] = useState(false)
  const [invoiceType, setInvoiceType] = useState('private')
  const [packageReceiverType, setpackageReceiverType] =
    useState('privatePackage')
  const [delivery, setDelivery] = useState([])
  // Typ dostaw np. inpost /dpd
  const [deliveryUUID, setDeliveryUUID] = useState(null)

  const [paymentURL, setPaymentURL] = useState('null')

  // Okno do wyboru paczkomatu inpost
  const [deliveryModal, setDeliveryModal] = useState(false)

  useEffect(() => {
    if (paymentURL && paymentURL !== 'null') {
      window.location.href = paymentURL
    }
  }, [paymentURL])

  useEffect(() => {
    fetch(`http://${ipMan}/api/v1/document/order`, {
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
        localStorage.setItem('orderUUID', orderUUID)

        return response.json()
      })
      .catch(error => {
        console.error('Error:', error)
      })

  }, [setOrderUUID, orderUUID, ipMan])

  // DELIVERY TYPE:

  useEffect(() => {
    fetch(`http://${ipMan}/api/v1/deliver`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setDelivery(data))
      .catch(error => console.log(error))
  }, [ipMan])

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
    },
    parcelLocker: getInpostLocation.name
  }

  const handleSubmit = values => {
    const updatedValues = {
      ...values,
      parcelLocker: getInpostLocation.name
    }

    fetch(`http://${ipMan}/api/v1/document/order`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedValues)
    })
      .then(response => {
        if (!response.ok) {
          // jesli jest 400 lub 500 to - Wystąpił błąd system, spróbuj ponowne.
          setErrorHandle('Wystąpił błąd systemu, spróbuj ponowne.')
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
    handleInpostModal()
  }

  // TUTAJ W STRINGU JEST DELIVERY UUID PACZKOMATU - testowy 321312321
  const handleInpostModal = () => {
    if (deliveryUUID === inpostID) {
      setDeliveryModal(true)
    } else {
      setDeliveryModal(false)
      setGetInpostLocation(prevValue => ({
        ...prevValue,
        type: '',
        line1: '',
        line2: '',
        name: ''
      }))
    }
  }

  const handleClickOutside = event => {
    if (event.target === modalRef.current) {
      setDeliveryModal(false) // Zamknij modal, jeśli kliknięcie było na tle
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
                          <label htmlFor='name'>Imię *</label>
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
                          <label htmlFor='surname'>Nazwisko *</label>
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
                          <label htmlFor='companyName'>Nazwa firmy *</label>
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
                          <label htmlFor='nip'>NIP *</label>
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
                          Nr telefonu komórkowego *
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
                        <label htmlFor='email'>Email *</label>
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
                        <label htmlFor='street'>Ulica *</label>
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
                        <label htmlFor='homeNumber'>
                          Numer domu / lokalu *
                        </label>
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
                        <label htmlFor='postCode'>Kod pocztowy *</label>

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
                        <label htmlFor='city'>Miejscowość *</label>
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
                              <label htmlFor='invoicingName'>Imię *</label>
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
                              <label htmlFor='invoicingSurname'>
                                Nazwisko *
                              </label>
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
                                Nazwa firmy *
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
                              <label htmlFor='invoicingNip'>NIP *</label>
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
                            <label htmlFor='invoicingStreet'>Ulica *</label>
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
                              Numer domu/lokalu *
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
                              Kod pocztowy *
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
                            <label htmlFor='invoicingCity'>Miejscowość *</label>
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
                              <p className='delivery-span'>{delivery.type}</p>
                            </div>
                            <img
                              width={100}
                              src={delivery.image}
                              alt={`typ wysyłki ${delivery.type}`}
                            />
                            <span style={{ fontWeight: 'bold' }}>
                              {delivery.price} zł
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>

                    {/* MODAL INPOST Z WYBOREM LOKALIZACJI PACZKOMATU  */}

                    {deliveryModal && (
                      <div
                        ref={modalRef}
                        className='inpost'
                        onClick={handleClickOutside}
                      >
                        <Inpost
                          setLocation={setGetInpostLocation}
                          disableModal={setDeliveryModal}
                        />
                      </div>
                    )}

                    {getInpostLocation.type !== '' ? (
                      <div className='inpost-data'>
                        <p style={{ fontWeight: 'bold' }}>
                          {getInpostLocation.type}
                        </p>
                        <p>{getInpostLocation.line1}</p>
                        <p>{getInpostLocation.line2}</p>
                        <p>{getInpostLocation.name}</p>
                      </div>
                    ) : null}

                    <button
                      className='form-btn'
                      type='submit'
                      disabled={
                        !(dirty && isValid && deliveryUUID !== null) ||
                        (deliveryUUID === '321312321' &&
                          !getInpostLocation.name)
                      }
                    >
                      {isSubmitting ? 'Wysyłanie...' : 'Zamawiam i płacę'}
                    </button>
                    {errorHandle && (
                      <p
                        style={{
                          color: 'tomato',
                          fontWeight: 'bold',
                          marginBottom: '20px',
                          fontSize: '1.05rem'
                        }}
                      >
                        {errorHandle}
                      </p>
                    )}
                  </Form>
                )}
              </Formik>
            </div>

            <div className='right-box'>
              <OrderCart deliveryID={deliveryUUID} orderID={orderUUID} />
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
