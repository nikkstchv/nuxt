<template>
  <button type="button">
    <svg
      v-if="!active"
      class="icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="icon__path"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.11799 12.467C2.96099 12.176 2.96099 11.823 3.11799 11.532C5.00999 8.033 8.50499 5 12 5C15.495 5 18.99 8.033 20.882 11.533C21.039 11.824 21.039 12.177 20.882 12.468C18.99 15.967 15.495 19 12 19C8.50499 19 5.00999 15.967 3.11799 12.467Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M14.1213 9.87868C15.2929 11.0502 15.2929 12.9497 14.1213 14.1213C12.9497 15.2929 11.0502 15.2929 9.87865 14.1213C8.70708 12.9497 8.70708 11.0502 9.87865 9.87868C11.0502 8.70711 12.9497 8.70711 14.1213 9.87868"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      v-else
      class="icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 19C11.158 19 10.315 18.822 9.496 18.505"
        class="icon__path"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.882 12.468C18.99 15.967 15.495 19 12 19"
        class="icon__path"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.079 8.92102C19.77 9.73002 20.384 10.612 20.882 11.533C21.039 11.824 21.039 12.177 20.882 12.468"
        class="icon__path"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 19L19 5"
        class="icon__path"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.77299 14.227C8.54299 12.997 8.54299 11.002 9.77299 9.77199C11.003 8.54199 12.998 8.54199 14.228 9.77199"
        class="icon__path"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.044 6.956C15.497 5.759 13.748 5 12 5C8.50499 5 5.00999 8.033 3.11799 11.533C2.96099 11.824 2.96099 12.177 3.11799 12.468C4.06399 14.217 5.40999 15.849 6.95599 17.045"
        class="icon__path"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'IconEye',
  props: {
    active: {
      required: false,
      type: Boolean,
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
}

.icon {
  fill: none;

  &__path {
    stroke: var(--black);
    stroke-width: 1.5;
  }
}
</style>
