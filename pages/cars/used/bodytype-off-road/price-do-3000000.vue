<template>
  <CatalogMainLayout
    :type-of-transport="[initData.transportType.code]"
    :condition="initData.condition.code"
    :init-cards="cards"
    :init-total="total"
    :init-seo="seo"
    :disprice="initData.disprice.code"
  />
</template>

<script setup>
import useInitCatalog from '@/components/Catalog/hooks/useInitCatalog'
import useCatalogHead from '@/components/Catalog/hooks/useCatalogHead'

definePageMeta({
  middleware: 'city',
})

const initData = {
  transportType: { code: 'cars', name: '' },
  condition: { code: 'used', name: '' },
  'body-type': { code: 'body-type-is-off-road', name: '' },
  disprice: { code: 'price-do-3000000', name: '' },
}
const { seo, total, cards, holdingName, location } = await useInitCatalog({ initData })
const seoDefault = {
  title: `Купить джипы и внедорожники с пробегом до 3 000 000 рублей в ${location} – подержанные полноприводные авто до 3 млн руб ГК ${holdingName}`,
  description: `Джипы и внедорожники с пробегом в ${location} до 3 000 000 рублей, авто в наличии. Приобретайте б/у транспорт на привлекательных условиях в ${holdingName}`,
}
const catalogHead = useCatalogHead(seoDefault, seo)

useHeadDefault(catalogHead)
</script>
