export const toPrice = (price, withCents = false) => {
  const formattedPrice = withCents ? price.toString().slice(0, -2) : price
  return parseInt(formattedPrice)
    .toLocaleString()
    .split(',')
    .join(' ')
}
