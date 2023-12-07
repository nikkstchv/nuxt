import { getStaticPage as getStaticPagePath } from '~/api/routes/brands'

export const useGetStaticPageService = async ({
  staticPageId,
  staticPageContent,
}) => {
  const { $fetchClient, $hasErrorResponse } = useNuxtApp()
  if (staticPageId) {
    const res = await $fetchClient(getStaticPagePath(staticPageId))

    if (res && !$hasErrorResponse(res)) {
      return res.description
    }
  }
  if (staticPageContent) {
    return staticPageContent
  }
  return ''
}
