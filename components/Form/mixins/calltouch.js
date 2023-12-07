export const calltouch = {
  methods: {
    getDealerCalltouchWidgetId (id, dealers, calltouchWidgetName) {
      if (id) {
        const findDealer = dealers?.find(item => item.id === id)
        return findDealer?.[`calltouchWidget${calltouchWidgetName}Id`] ?? ''
      }
      return ''
    },
  },
}
