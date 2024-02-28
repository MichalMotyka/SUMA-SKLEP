const OrderValidation = (
  values,
  invoiceType,
  packageReceiverType,
  isInvoicing
) => {
  const errors = {}

  console.log('packageReceiverType:', packageReceiverType)
  console.log('isInvoicing:', isInvoicing)
  console.log('invoiceType:', invoiceType)

  if (packageReceiverType === 'privatePackage') {
    if (!values.name) {
      errors.name = 'Pole wymagane'
    } else if (values.name.length < 1 || values.name.length > 50) {
      errors.name = 'Maksymalnie 50 znaków'
    }
    if (!values.surname) {
      errors.surname = 'Pole wymagane'
    } else if (values.surname.length < 1 || values.surname.length > 50) {
      errors.surname = 'Maksymalnie 50 znaków'
    }
  } else if (packageReceiverType === 'firmPackage') {
    if (!values.companyName) {
      errors.companyName = 'Pole wymagane'
    } else if (
      values.companyName.length < 3 ||
      values.companyName.length > 350
    ) {
      errors.companyName = 'Maksymalnie 350 znaków'
    }

    if (!values.nip) {
      errors.nip = 'Pole wymagane'
    } else if (values.nip.length !== 10) {
      errors.nip = 'Pole powinno mieć 10 znaków'
    }
  }

  if (!values.email) {
    errors.email = 'Pole wymagane'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Błędny adres e-mail'
  }

  if (!values.city) {
    errors.city = 'Pole wymagane'
  } else if (values.city.length < 1 || values.city.length > 350) {
    errors.city = 'Maksymalnie 350 znaków'
  }

  if (!values.street) {
    errors.street = 'Pole wymagane'
  } else if (values.street.length < 1 || values.street.length > 350) {
    errors.street = 'Maksymalnie 350 znaków'
  }

  if (!values.homeNumber) {
    errors.homeNumber = 'Pole wymagane'
  } else if (values.homeNumber.length < 1 || values.homeNumber.length > 50) {
    errors.homeNumber = 'Maksymalnie 50 znaków'
  }

  if (!values.postCode && values.postCode !== '') {
    errors.postCode = 'Pole wymagane'
  } else if (!/^(\d{2}-\d{3})$/.test(values.postCode)) {
    errors.postCode = 'Podaj kod wg wzoru np. 10-111'
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Pole wymagane'
  } else if (values.phoneNumber.length !== 9) {
    errors.phoneNumber = 'Numer telefonu musi mieć 9 znaków'
  }

  // PONIŻEJ Z FAKTURĄ NA INNE DANE:

  if (isInvoicing === true) {
    if (invoiceType === 'private') {
      if (!values.invoicingName) {
        errors.invoicingName = 'Pole wymagane'
      } else if (
        values.invoicingName.length < 1 ||
        values.invoicingName.length > 50
      ) {
        errors.invoicingName = 'Maksymalnie 50 znaków'
      }

      if (!values.invoicingSurname) {
        errors.invoicingSurname = 'Pole wymagane'
      } else if (
        values.invoicingSurname.length < 1 ||
        values.invoicingSurname.length > 50
      ) {
        errors.invoicingSurname = 'Maksymalnie 50 znaków'
      }
    } else {
      if (!values.invoicingCompanyName) {
        errors.invoicingCompanyName = 'Pole wymagane'
      } else if (
        values.invoicingCompanyName.length < 3 ||
        values.invoicingCompanyName.length > 350
      ) {
        errors.invoicingCompanyName = 'Maksymalnie 350 znaków'
      }

      if (!values.invoicingNip) {
        errors.invoicingNip = 'Pole wymagane'
      } else if (values.invoicingNip.length !== 10) {
        errors.invoicingNip = 'Pole powinno mieć 10 znaków'
      }
    }

    if (!values.invoicingCity) {
      errors.invoicingCity = 'Pole wymagane'
    } else if (
      values.invoicingCity.length < 1 ||
      values.invoicingCity.length > 350
    ) {
      errors.invoicingCity = 'Maksymalnie 350 znaków'
    }

    if (!values.invoicingStreet) {
      errors.invoicingStreet = 'Pole wymagane'
    } else if (
      values.invoicingStreet.length < 1 ||
      values.invoicingStreet.length > 350
    ) {
      errors.invoicingStreet = 'Maksymalnie 350 znaków'
    }

    if (!values.invoicingHomeNumber) {
      errors.invoicingHomeNumber = 'Pole wymagane'
    } else if (
      values.invoicingHomeNumber.length < 1 ||
      values.invoicingHomeNumber.length > 50
    ) {
      errors.invoicingHomeNumber = 'Maksymalnie 50 znaków'
    }

    if (!values.invoicingPostCode && values.invoicingPostCode !== '') {
      errors.invoicingPostCode = 'Pole wymagane'
    } else if (!/^(\d{2}-\d{3})$/.test(values.invoicingPostCode)) {
      errors.invoicingPostCode = 'Podaj kod wg wzoru np. 12-111'
    }
  }

  return errors
}

export default OrderValidation
