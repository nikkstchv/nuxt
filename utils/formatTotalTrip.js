export default (totalTrip) => {
  const totalTripFormatted = parseInt(totalTrip)?.toLocaleString('ru') ?? ''
  if (totalTripFormatted) {
    return `${totalTripFormatted} км`
  }
  return ''
}
