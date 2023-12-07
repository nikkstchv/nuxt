// Фиксирует тело документа для отмены прокрутки при включенных модалках барах и тд

export default defineNuxtPlugin(() => {
  return {
    provide: {
      controlFixBody: (yes) => {
        if (yes) {
          document.querySelector('body').style.cssText = 'width: calc(100vw - 3px)'
          document.querySelector('html').style.cssText = 'overflow: hidden;'
        } else {
          document.querySelector('body').style.cssText = ''
          document.querySelector('html').style.cssText = ''
        }
      },
    },
  }
})
