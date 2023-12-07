export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { apiPath, holdingId, baseURL } = config.public
  const holdingIdQuery = `?holdingId=${holdingId}`
  const fetch = $fetch.create({
    baseURL,
  })

  const getApiPathWithHostAndHolding = (path, query) => {
    const restQuery = query ? `&${query}` : ''
    return encodeURI(apiPath + path + holdingIdQuery + restQuery)
  }
  const getApiPathWithHost = (path, query) => {
    const restQuery = query ? `&${query}` : ''
    return encodeURI(apiPath + path + '?' + restQuery)
  }

  const getApi = hasHolding => hasHolding ? getApiPathWithHostAndHolding : getApiPathWithHost

  return {
    provide: {
      fetchClient: (response, options, hasHolding = true) => {
        return fetch(getApi(hasHolding)(response), options)
      },
    },
  }
})
