export function getImage (
  src,
  { modifiers } = {},
  // { options, nuxtContext, $img }
) {
  const { width, height, format = 'webp' } = modifiers
  const display = {
    upscale: '0',
    op: 'resize',
    w: width || '1600',
    ...(height && { h: height }),
    ...(format && { format }),
  }
  const operations = Object.entries(display).map(
    ([key, value]) => `${key}=${value}`,
  )
  const operationsString = operations.join('&')
  const url = `${src}?${operationsString}`
  return {
    url,
  }
}
