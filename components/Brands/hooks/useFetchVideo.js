import { getVideo } from '~/api/routes/brands'

export default async function ({
  options,
  $fetchClient,
  $hasErrorResponse,
}) {
  if (options) {
    const res = await $fetchClient(getVideo(), options)
    if (!$hasErrorResponse(res)) {
      return res.video
    }
  }
  return null
}
