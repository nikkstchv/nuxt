export const getBrands = () => '/brands'
export const getModels = brand => `/brands/${brand}`
export const getGenerations = (brand, model) => `/brands/${brand}/${model}`
export const getSeries = (brand, model, series) => `/brands/${brand}/${model}/${series}`
export const getSeriesInfo = seriesId => `/seriesinfo/${seriesId}`
export const getAutoBlockInfo = (brandId, modelId, seriesId) => {
  const stringModel = modelId ? `/${modelId}` : ''
  const stringSeries = seriesId ? `/${seriesId}` : ''
  return `/autoblock/${brandId}${stringModel}${stringSeries}`
}
export const getOtherModels = (brandId, modelId) => `/brands/other/models/${brandId}/${modelId}`
export const getStaticPage = pageId => `/static/page/${pageId}`
export const getEquipmentsBlockInfo = (
  markId,
  modelId,
  generationId,
  seriesId,
) => {
  const stringModel = modelId ? `/${modelId}` : ''
  const stringGeneration = generationId ? `/${generationId}` : ''
  const stringSeries = seriesId ? `/${seriesId}` : ''
  return `/core/equipments/${markId}${stringModel}${stringGeneration}${stringSeries}`
}
export const getModificationsBlockInfo = (
  markId,
  modelId,
  generationId,
  seriesId,
) => {
  const stringModel = modelId ? `/${modelId}` : ''
  const stringGeneration = generationId ? `/${generationId}` : ''
  const stringSeries = seriesId ? `/${seriesId}` : ''
  return `/core/modifications/${markId}${stringModel}${stringGeneration}${stringSeries}`
}

export const getVideo = () => '/brands/video'
