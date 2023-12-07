// markCode && searchParams.set('brand_code', markCode)
// vehicleType && searchParams.set('vehicle_type', vehicleType)
// city && searchParams.set('city', city)

export const getDealers = () => '/dealers'
export const getOtherDealers = id => `/dealers/other/${id}`
export const getDealersShort = () => '/dealers/short'
export const getDealer = (id, mark) => {
  const path = mark && id ? `${mark}/${id}` : `${id}`
  return `/dealers/${path}`
}
export const getFilter = () => '/dealers/get/filter'
