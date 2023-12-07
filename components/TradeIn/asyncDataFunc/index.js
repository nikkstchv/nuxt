import { getCoreModel } from '@/api/routes/core'
import { getTradeInMark, getTradeInMarks, getTradeInModel } from '@/api/routes/trade-in'
import { getStaticPage as getStaticPagePath } from '@/api/routes/brands'

export const getMarks = async (arg) => {
  const { $fetchClient, $hasErrorResponse, $errorResponseCatch } = arg
  const res = await $fetchClient(getTradeInMarks())
  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  } else {
    return res?.marks ?? null
  }
}

export const getModel = async (arg) => {
  const { $fetchClient, $hasErrorResponse, markCode, modelCode } = arg
  const res = await $fetchClient(getTradeInModel(markCode, modelCode))
  if (!$hasErrorResponse(res)) {
    return res
  }
}

export const getModels = async (arg) => {
  const { $fetchClient, $hasErrorResponse, $errorResponseCatch, markCode } = arg
  const res = await $fetchClient(getCoreModel(markCode))
  if ($hasErrorResponse(res)) {
    return $errorResponseCatch(res)
  } else {
    return res
  }
}

export const getStaticPage = async ({ staticPagesId, $fetchClient }) => {
  if (staticPagesId) {
    return await $fetchClient(getStaticPagePath(staticPagesId))
  }
  return null
}

export const getStaticPageBlocksMark = async (arg) => {
  const { $fetchClient, $hasErrorResponse, $errorResponseCatch, markCode } = arg
  const dataMark = await $fetchClient(getTradeInMark(markCode))

  if ($hasErrorResponse(dataMark)) {
    $errorResponseCatch(dataMark)
  } else {
    const models = dataMark.childList
    const staticPagesId = dataMark.data.staticPagesId
    const staticData = await getStaticPage({ staticPagesId, $fetchClient })

    return { dataMark, models, staticData }
  }
}

export const getStaticPageBlocksModel = async (arg) => {
  const { $fetchClient, $hasErrorResponse, $errorResponseCatch, markCode, modelCode } = arg
  const dataMark = await $fetchClient(getTradeInMark(markCode))
  const dataModel = await $fetchClient(getTradeInModel(markCode, modelCode))
  if ($hasErrorResponse(dataMark) || $hasErrorResponse(dataModel)) {
    $errorResponseCatch(dataMark)
    $errorResponseCatch(dataModel)
  } else {
    const staticPagesId = dataModel.data.staticPagesId
    const staticData = await getStaticPage({ staticPagesId, $fetchClient })

    return { dataMark, dataModel, staticData }
  }
}

export const findItemOnCode = (items, code) => {
  return items?.find(item => item.code === code)
}
export const handleEmpty = (found) => {
  if (!found) {
    throw createError({
      statusCode: 404,
      fatal: true,
    })
  }
}
