const getDomain = url => url?.replace('https://', '') ?? ''
const cdnUrl = process.env.CDN_URL
const cdnUrlDomain = getDomain(cdnUrl)

export default {
  domains: [cdnUrlDomain],
  provider: 'cdn',
  providers: {
    cdn: {
      provider: '~/providers/cdn', // Path to custom provider
    },
  },
  alias: {
    '@/assets': '',
  },
  screens: {
    xs: 320,
    sm: 414,
    s: 599,
    md: 899,
    mb: 1100,
    b: 1366,
    sb: 1920,
  },
}
