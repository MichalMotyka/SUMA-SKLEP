const OrderValidation = values => {
  //   console.log('tu szukaj values', values)

  const errors = {}

  if (!values.name) {
    errors.name = 'Pole wymagane'
  } else if (values.name.length < 3 || values.name.length > 20) {
    errors.name = 'Nick musi mieć od 3 do 20 znaków'
  } else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9]+$/.test(values.name)) {
    errors.name = 'Nick może zawierać litery, cyfry i polskie znaki'
  }

  if (!values.surname) {
    errors.surname = 'Pole wymagane'
  } else if (values.surname.length < 3 || values.surname.length > 20) {
    errors.surname = 'Nick musi mieć od 3 do 20 znaków'
  } else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9]+$/.test(values.surname)) {
    errors.surname = 'Nick może zawierać litery, cyfry i polskie znaki'
  }

  if (!values.email) {
    errors.email = 'Pole wymagane'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Błędny adres e-mail'
  }

  //   FIRMA:

  return errors
}

export default OrderValidation
