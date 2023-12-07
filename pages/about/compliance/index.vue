<template>
  <AboutComplianceBlock />
</template>

<script setup>
definePageMeta({
  layout: 'about',
})

const title = 'Комплаенс'
const description = 'В АВТОДОМ используются меры направленные на предотвращение и обнаружение нарушений законодательства в деятельности организации. Данные меры позволяют вести коммуникацию и предоставлять услуги клиентам безопасно.'

useHeadDefault({ title, description })
</script>
