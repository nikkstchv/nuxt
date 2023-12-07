export default (currentPage, value) => {
  const intValue = parseInt(value)
  switch (value) {
    case 'next':
      currentPage.value += 1
      break
    case 'previous':
      currentPage.value -= 1
      break
    case 'middle':
      currentPage.value = intValue
      break
    default:
      currentPage.value = intValue
      break
  }
}
