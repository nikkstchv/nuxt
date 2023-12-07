<template>
  <span>{{ getTime }}</span>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    startTime: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      default: 'seconds', // ['seconds', 'minutes']
    },
  },
  data: () => ({
    timer: null,
  }),
  computed: {
    getTime () {
      const time = this.startTime
      if (this.type === 'seconds') {
        return time
      } else if (this.type === 'minutes') {
        let minutes = Math.floor(time / 60)
        let seconds = time - minutes * 60

        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (seconds < 10) {
          seconds = '0' + seconds
        }

        return minutes + ':' + seconds
      }

      return 0
    },
  },
  watch: {
    startTime (time) {
      if (time === 0) {
        this.stopTimer()
      }
    },
  },
  mounted () {
    this.startTimer()
  },
  destroyed () {
    this.stopTimer()
  },
  methods: {
    startTimer () {
      this.timer = setInterval(() => {
        const newTime = this.startTime - 1
        this.$emit('changeTimeInTimer', newTime)
      }, 1000)
    },
    stopTimer () {
      clearTimeout(this.timer)
    },
  },
}
</script>
