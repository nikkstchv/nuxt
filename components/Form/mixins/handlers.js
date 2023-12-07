import { mapActions, mapState } from 'pinia'
import { getSubject, leadCommit } from '@/api/routes/lead'
import { useFormStore } from '~/store/form'
import { useHoldingStore } from '~/store/holding'
import { useCityStore } from '~/store/city'

export const handlers = {
  // data: () => ({
  //   isLoading: false,
  //   isFinish: false,
  // }),
  computed: {
    modId () {
      return this.isAsc ? 'pb9ne5b5' : 'vib2c0gh'
    },
    hasAllRequiredFormData () {
      return Object.entries(this.form)
        .filter(([_key, item]) => item.isRequire)
        .every(this.hasRequiredFormDataCallback)
    },
    ...mapState(useHoldingStore, ['isAsc', 'isAvtodom']),
    ...mapState(useCityStore, ['definiteCity']),
  },
  beforeUnmount () {
    this.onClosePanel()
  },
  methods: {
    hasRequiredFormDataCallback ([key, item]) {
      if (key === 'phone') {
        return item?.value?.length === 16
      }
      return !!item.value
    },
    getFormattedEmail (email) {
      if (email) {
        return email.toLowerCase().trim()
      }
      return ''
    },
    amplitudeEvent (formData) {
      try {
        const isIframePage = this.$route.path.includes('/iframe/')

        if (typeof amplitude !== 'undefined' && !isIframePage) {
          const {
            email,
            phone,
            firstname,
            lastname,
            middlename,
            formId,
            dealerName,
            comment,
          } = formData
          const formattedEmail = this.getFormattedEmail(email)

          const userProperties = {
            ...(formId && { form_type_id: formId }),
            ...(formattedEmail && { email: formattedEmail }),
            ...(phone && { phone }),
            ...(dealerName && { dealer: dealerName }),
            ...(comment && { comment }),
            ...(firstname && { name: firstname }),
            ...(lastname && { last_name: lastname }),
            ...(middlename && { sur_name: middlename }),
            location: window.location.href,
          }
          amplitude.getInstance().logEvent('Form', userProperties)
        }
      } catch (error) {
        console.error(error)
      }
    },
    exponeaIdentify (formData) {
      try {
        const { email, phone, firstname, lastname, middlename } = formData
        const excludeNames = ['ВЕБДМС', 'КУСОФТ']
        const names = [firstname, lastname, middlename]
        const hasExcludeName = names.some(name => excludeNames.includes(name?.toUpperCase()))

        if (typeof exponea !== 'undefined' && !hasExcludeName) {
          const formattedEmail = this.getFormattedEmail(email)
          if (email || phone) {
            const userIdentification = {
              ...(formattedEmail && { email: formattedEmail }),
              ...(phone && { phone }),
            }
            const userProperties = {
              ...(formattedEmail && { email: formattedEmail }),
              ...(phone && { phone }),
              ...(firstname && { name: firstname }),
              ...(lastname && { last_name: lastname }),
              ...(middlename && { sur_name: middlename }),
            }

            exponea.identify(userIdentification, userProperties)
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    exponeaForm (formData) {
      try {
        if (typeof exponea !== 'undefined') {
          const {
            email,
            phone,
            firstname,
            lastname,
            middlename,
            formId,
            dealerName,
            comment,
          } = formData
          const formattedEmail = this.getFormattedEmail(email)

          const userProperties = {
            ...(formId && { form_type_id: formId }),
            ...(formattedEmail && { email: formattedEmail }),
            ...(phone && { phone }),
            ...(dealerName && { dealer: dealerName }),
            ...(comment && { comment }),
            ...(firstname && { name: firstname }),
            ...(lastname && { last_name: lastname }),
            ...(middlename && { sur_name: middlename }),
          }

          exponea.track('Form', userProperties)
        }
      } catch (error) {
        console.error(error)
      }
    },
    calltouchCommit (formData, subject) {
      try {
        if (typeof ct !== 'undefined') {
          const {
            email,
            phone,
            firstname = '',
            lastname = '',
            middlename = '',
            ...rest
          } = formData
          const method = 'POST'
          const formattedEmail = this.getFormattedEmail(email)
          const ctSiteId = this.isAsc ? '42228' : '35643'
          const fio = `${lastname} ${firstname} ${middlename}`.trim()
          const userProperties = {
            ...(formattedEmail && { email: formattedEmail }),
            ...(phone && { phoneNumber: phone }),
            ...((firstname || lastname || middlename) && { fio }),
          }
          const url = `https://api.calltouch.ru/calls-service/RestAPI/requests/${ctSiteId}/register/`
          const isService = subject === 'Сервис'

          const comment = Object.entries(rest)
            .map(([key, value]) => {
              const hasMarkOrModel = key === 'mark' || key === 'model'

              if (isService && hasMarkOrModel) {
                return ''
              }
              return [key, value].join('=')
            })
            .filter(Boolean)
            .join(';')

          const data = {
            ...userProperties,
            subject,
            comment,
            requestUrl: location.href,
            sessionId: ct('calltracking_params', this.modId)?.sessionId ?? '',
          }

          const getFormBody = (data) => {
            let formBody = []

            for (const property in data) {
              const encodedKey = encodeURIComponent(property)
              const encodedValue = encodeURIComponent(data[property])
              formBody.push(encodedKey + '=' + encodedValue)
            }
            formBody = formBody.join('&')

            return formBody
          }

          const body = getFormBody(data)
          const options = {
            method,
            body,
            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
          }
          useFetch(url, options)
            .catch((error) => {
              console.error(error)
            })
        }
      } catch (e) {
        console.error(e)
      }
    },
    calltouchCall (formData, subject) {
      const {
        lastname,
        firstname,
        middlename,
        markName,
        mark,
        model,
        modelName,
        dealerName,
        routeKey,
        phone,
      } = formData
      try {
        if (typeof ct !== 'undefined') {
          const getStringData = (array = []) => array.filter(Boolean).join(' ')
          const routeKeyDefault = this.isAsc
            ? 'ascgroup_default'
            : 'avtodom_default'
          const url = 'https://api.calltouch.ru/widget-service/v1/api/widget-request/user-form/create'
          const accessToken = this.isAsc
            ? 'Tt7anZPbGxHRYmbsTKxfIRD6gvuIyYvMR8SN6K6xcuQtq'
            : 'oqP33rKClu5SMGnaq5tFg3z5PBJcwAt8rPWUWWPXXu8Ja'
          const hasModel = modelName ?? model
          const clientName = getStringData([lastname, firstname, middlename])
          const markModel = getStringData([
            markName ?? mark,
            modelName ?? model,
          ])

          const fieldsRaw = [
            {
              name: 'Заполнена форма',
              value: subject,
            },
            {
              name: 'Имя клиента',
              value: clientName,
            },
            {
              name: hasModel ? 'Модель' : 'Марка',
              value: markModel,
            },
            {
              name: 'Площадка',
              value: dealerName,
            },
          ]
          const fields = fieldsRaw.map((field) => {
            if (field.value) {
              return field
            }
            return {
              name: field.name,
              value: 'Не указано',
            }
          })
          const body = {
            method: 'POST',
            routeKey: routeKey || routeKeyDefault,
            phone,
            fields,
            sessionId: ct('calltracking_params', this.modId)?.sessionId ?? '',
            callUrl: location.href,
          }
          const options = {
            body,
            headers: {
              'Access-Token': accessToken,
            },
          }

          useFetch(url, options)
            .catch((error) => {
              console.error(error)
            })
        }
      } catch (e) {
        console.error(e)
      }
    },
    setFormData (value, formName) {
      this.form[formName].value = value
    },
    setDealer (value) {
      this.setFormData(value, 'dealer')
    },
    async sendFormData (data) {
      const { $fetchClient } = useNuxtApp()
      const { formId = '', formUrl = '', ...formData } = data
      const method = 'POST'
      const body = {
        formId,
        formUrl,
        formData,
      }
      const options = { method, body }
      const res = await $fetchClient(leadCommit(), options)

      if (!this.$hasErrorResponse(res)) {
        return res
      }
      return null
    },
    async handleSubmit () {
      const isAllValid = this.checkForm()
      if (isAllValid) {
        this.isLoading = true

        const formData = this.getAllFormData(this.additionalData)
        const res = await this.sendFormData(formData)

        this.isLoading = false

        if (res) {
          this.clearAllFormData()
          this.isFinish = true
          this.amplitudeEvent(formData)
          this.exponeaIdentify(formData)
          this.exponeaForm(formData)
          const subject = await this.getSubject(formData.formId)
          this.calltouchCommit(formData, subject)

          return res
        }
      }
      return null
    },
    getDealerCalltouchWidgetId (calltouchWidgetName) {
      const id = this.form.dealer?.value ?? ''
      if (id) {
        const findDealer = this.optionsDealers?.find(item => item.id === id)
        return findDealer?.[`calltouchWidget${calltouchWidgetName}Id`] ?? ''
      }

      return ''
    },
    async getSubject (formId) {
      const { $fetchClient } = useNuxtApp()
      if (formId) {
        const res = await $fetchClient(getSubject(formId))
        return res?.name ?? ''
      }
      return ''
    },
    getDealerName () {
      const id = this.form.dealer?.value ?? ''
      if (id) {
        const findDealer = this.optionsDealers?.find(item => item.id === id)

        return findDealer?.name ?? ''
      }

      return ''
    },
    getAllFormData (additionalData = {}) {
      const formUrl = window.location.href
      const formData = {}
      Object.entries(this.form).forEach(([key, { value }]) => {
        if (key !== 'robot') {
          if (key === 'phone') {
            formData[key] = value.replace(/\D/g, '')
          } else {
            formData[key] = value.toString()
          }
        }
      })
      const dealerName = this.getDealerName()
      const city = this.definiteCity

      return {
        ...formData,
        formUrl,
        ...(dealerName && { dealerName }),
        ...(city && this.isAvtodom && { city }),
        ...additionalData,
      }
    },
    clearAllFormData () {
      for (const name in this.form) {
        if (this.form[name].value) {
          if (name === 'policy') {
            this.form[name].value = false
          } else {
            this.form[name].value = null
          }
        }
      }
    },
    ...mapActions(useFormStore, {
      onClosePanel: 'onClose',
    }),
  },
}
