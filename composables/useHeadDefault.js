export const useHeadDefault = (args) => {
  const { title, description, meta, htmlAttrs } = args ?? {}
  const host = useRuntimeConfig().public.host
  const { path, fullPath } = useRoute()
  const ogUrlContent = host + fullPath
  const canonicalContent = host + path

  useHead({
    title,
    meta: [
      {
        name: 'description',
        content: description,
      },
      {
        name: 'og:title',
        property: 'og:title',
        content: title,
      },
      {
        name: 'og:description',
        property: 'og:description',
        content: description,
      },
      ...(meta || []),
    ],
    link: [
      {
        hid: 'og:url',
        name: 'og:url',
        property: 'og:url',
        content: ogUrlContent,
      },
      {
        hid: 'canonical',
        rel: 'canonical',
        property: 'canonical',
        href: canonicalContent,
      },
    ],
    ...(htmlAttrs && { htmlAttrs }),
  })
}
