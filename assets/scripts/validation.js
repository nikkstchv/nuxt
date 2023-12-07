function validationName (name) {
  const regExp = /[-а-яА-ЯёЁ\s]+$/i
  return regExp.test(name)
}

function validationPhone (phone) {
  const regExp = /^((8|\+7)\s)(\d{3})[\d-]{10}$/
  return regExp.test(phone)
}

function validationEmail (email) {
  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+(com|ru|name|xxx|co|ua|guru|info|net|life|io|biz|org|sex|by|online|fm|pro|me|xyz|agency)))$/
  return regExp.test(email)
}

function validationStateCarNumber (number) {
  const regExp = /^[АВЕКМНОРСТУХABEKMHOPCTYX]\s\d{3}\s[АВЕКМНОРСТУХABEKMHOPCTYX]{2}\s(?!00|000|0\d\d)\d{2,3}$/i
  return regExp.test(number)
}

function validationUrl (url) {
  const regExp =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  return regExp.test(url)
}

function validationVin (vin) {
  return vin?.length === 17
}

export {
  validationName,
  validationPhone,
  validationEmail,
  validationStateCarNumber,
  validationVin,
  validationUrl,
}
