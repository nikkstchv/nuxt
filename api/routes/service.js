export default {
  getMarks () {
    return '/timeslots/marks'
  },
  getModels () {
    return '/timeslots/model'
  },
  getGenerations ({ year, markId, modelId }) {
    const searchParams = new URLSearchParams()

    year && searchParams.set('year', year)
    markId && searchParams.set('mark_id', markId)
    modelId && searchParams.set('model_id', modelId)

    const stringSearchParams = searchParams.toString()

    return encodeURI(`/timeslots/generation?${stringSearchParams}`)
  },
  getSeries ({ generationId }) {
    const searchParams = new URLSearchParams()

    generationId && searchParams.set('generation_id', generationId)

    const stringSearchParams = searchParams.toString()

    return encodeURI(`/timeslots/series?${stringSearchParams}`)
  },
  getModifications ({ seriesId }) {
    const searchParams = new URLSearchParams()

    seriesId && searchParams.set('series_id', seriesId)

    const stringSearchParams = searchParams.toString()

    return encodeURI(`/timeslots/modification?${stringSearchParams}`)
  },
  getDealers () {
    return encodeURI('/timeslots/dealers')
  },
  getTimeslots () {
    return '/timeslots'
  },
  sendForm () {
    return encodeURI('/timeslots/commit')
  },
  timeslotsRegister () {
    return '/timeslots/register'
  },
  timeslotsValidate () {
    return '/timeslots/validate'
  },
  getTypeOfWorks () {
    return '/service/types'
  },
  getBrands () {
    return '/service/brands'
  },
  getAllBrands () {
    return '/service/to'
  },
  getBrand (mark) {
    return `/service/${mark}`
  },
  getModel (mark, model) {
    return `/service/${mark}/${model}`
  },
  getModelServices (mark, model, section) {
    return `/service/${mark}/${model}/${section}`
  },
  getAscStatic () {
    return '/static/page/13795'
  },
  getAvtodomStatic () {
    return '/static/page/13796'
  },
}
