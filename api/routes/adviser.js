export const getAdvisers = () => '/vcard'
export const getAdviser = id => `/vcard/${id}`
export const getAdviserQr = code => `/v1/vcard/qr?code=${code}`
export const getAdviserVcf = code => `/v1/vcard/vcf?code=${code}`
