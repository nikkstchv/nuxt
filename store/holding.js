import { defineStore } from 'pinia'
import { useCityStore } from '~/store/city'

export const useHoldingStore = defineStore('holding-store', () => {
  const runtimeConfig = useRuntimeConfig()
  const { siteCityCode } = useCityStore()
  const domain = runtimeConfig.public.domain
  const isAsc = domain === 'asc'
  const isAvtodom = domain === 'avtodom'
  const holdingName = (() => {
    switch (domain) {
      case 'asc':
        return 'АвтоСпецЦентр'
      case 'avtodom':
        return 'АВТОДОМ'
      default:
        return ''
    }
  })()
  const holdingPhone = (() => {
    const cityCodePhones = {
      msk: '+7 495 500 50 00',
      spb: '+7 812 500 50 00',
      krasnodar: '+7 861 210 55 11',
    }
    const domainPhones = {
      asc: '+7 495 785 55 05',
      avtodom: '+7 495 500 50 00',
    }

    return siteCityCode && isAvtodom ? cityCodePhones[siteCityCode] : domainPhones[domain]
  })()
  const hostName = (() => {
    switch (domain) {
      case 'asc':
        return 'ascgroup'
      case 'avtodom':
        return 'avtodom'
      default:
        return ''
    }
  })()
  const fullDomain = hostName === 'ascgroup' ? `www.${hostName}.ru` : `${hostName}.ru`
  const fullDomainWithProtocol = 'https://' + fullDomain

  return {
    domain,
    isAvtodom,
    isAsc,
    holdingName,
    holdingPhone,
    hostName,
    fullDomain,
    fullDomainWithProtocol,
  }
})
