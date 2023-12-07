export const getCards = (limit, page) => `/catalog/${limit}/${page}`

export const getCard = (id) => {
  const withIdPath = `/catalog/${id}`
  const defaultPath = '/catalog'
  return id ? withIdPath : defaultPath
}

export const getCardsShort = () => '/catalog/short'

export const getCardShort = id => `/catalog/short/detail/${id}`

export const getFilters = () => '/catalog/get/ext/filter'

export const getMiniFilter = () => '/catalog/get/mini/filter'

export const getExteriorPanorama = () => '/catalog/ext/panorama'

export const smsCode = () => '/catalog/report'
