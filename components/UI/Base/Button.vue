<template>
  <nuxt-link
    v-if="tag === 'nuxt-link'"
    :rel="rel"
    :to="to"
    class="button"
    :type="type"
    :target="target"
    :class="{
      button_theme_primary: primary,
      button_theme_secondary: secondary,
      button_theme_ocean: big,
      button_theme_text: txt,
      button_theme_underline: underline,
      button_theme_secondary_light: secondaryLight,
      button_ocean_disable: disable && big,
      button_secondary_disable: disable && secondary,
      button_primary_disable: disable && primary,
      button_text_disable: disable && txt,
      button_underline_disable: disable && underline,
      button_type_large: large,
      button_type_mini: mini,
      button_type_big: big,
    }"
    :disabled="disable"
  >
    <UILoader v-if="isLoading" class="button__loader" />

    <slot />

    {{ text }}
  </nuxt-link>
  <component
    :is="tag"
    v-else
    :rel="rel"
    class="button"
    :type="type"
    :target="target"
    :href="href"
    :class="{
      button_theme_primary: primary,
      button_theme_secondary: secondary,
      button_theme_ocean: big,
      button_theme_text: txt,
      button_theme_underline: underline,
      button_theme_secondary_light: secondaryLight,
      button_ocean_disable: disable && big,
      button_secondary_disable: disable && secondary,
      button_primary_disable: disable && primary,
      button_text_disable: disable && txt,
      button_underline_disable: disable && underline,
      button_type_large: large,
      button_type_mini: mini,
      button_type_big: big,
    }"
    :disabled="disable"
  >
    <UILoader v-if="isLoading" class="button__loader" />

    <slot />

    {{ text }}
  </component>
</template>

<script>
import UILoader from '@/components/UI/Loader.vue'

export default {
  name: 'UIBaseButton',
  components: {
    UILoader,
  },
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
    to: {
      type: String,
      required: false,
      default: '',
    },
    href: {
      type: String,
      required: false,
      default: '',
    },
    target: {
      type: String,
      required: false,
      default: '',
    },
    rel: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: 'button',
    },
    primary: {
      type: Boolean,
      required: false,
      default: false,
    },
    secondary: {
      type: Boolean,
      required: false,
      default: false,
    },
    underline: {
      type: Boolean,
      required: false,
      default: false,
    },
    txt: {
      type: Boolean,
      required: false,
      default: false,
    },
    large: {
      type: Boolean,
      required: false,
      default: false,
    },
    mini: {
      type: Boolean,
      required: false,
      default: false,
    },
    big: {
      type: Boolean,
      required: false,
      default: false,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    secondaryLight: {
      type: Boolean,
      required: false,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tag () {
      if (this.to) {
        return 'nuxt-link'
      } else if (this.href) {
        return 'a'
      } else {
        return 'button'
      }
    },
  },
}
</script>

<style lang="scss">
.button {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 12px 30px;
  border-radius: 4px;

  &_type_large {
    width: 100%;
  }

  &_type_big {
    padding: 21px 30px;
    border-radius: 8px;
  }

  &_type_mini {
    @include text_small_medium;

    padding: 5px 13px;
    border-radius: 15px;
  }

  &_theme_ocean {
    color: white;
    background: var(--neonBlue);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--marineBlue);
      }
    }
  }

  &_theme_text {
    @include text_small_medium;

    padding: 0;
    color: var(--neonBlue);
    background: transparent;
    border-radius: 0;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--royalBlue);
        background: transparent;
      }
    }
  }

  &_theme_underline {
    @include text_small_medium;

    padding: 0;
    color: var(--blackLight);
    background: transparent;
    border-bottom: 1px solid var(--black);
    border-radius: 0;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--black);
        background: transparent;
      }
    }
  }

  &_theme_primary {
    @include label_small;

    color: var(--neonBlue);
    background: rgb(37 84 255 / 7%);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: rgb(37 84 255 / 12%);
      }
    }
  }

  &_theme_secondary {
    @include label_small;

    color: var(--royalBlue);
    background: transparent;
    border: 1px solid var(--royalBlue);

    @media (hover: hover) and (pointer: fine) {
      &:not(:disabled):hover {
        color: var(--neonBlue);
        background: rgb(37 84 255 / 5%);
        border: 1px solid var(--neonBlue);
      }
    }

    &_light {
      color: var(--neonBlue);
      background-color: white;

      @media (hover: hover) and (pointer: fine) {
        &:not(:disabled):hover {
          opacity: 0.9;
        }
      }
    }
  }

  &_primary_disable {
    color: var(--grayDolphin);
    cursor: default;
    background: rgb(13 10 25 / 5%);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: rgb(13 10 25 / 5%);
      }
    }
  }

  &_secondary_disable {
    color: var(--grayDolphin);
    cursor: default;
    border: 1px solid var(--grayDolphin);
  }

  &_ocean_disable {
    color: var(--grayDolphin);
    cursor: default;
    background: rgb(13 10 25 / 5%);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: rgb(13 10 25 / 5%);
      }
    }
  }

  &_text_disable {
    color: var(--grayDark);
    cursor: default;
  }

  &_underline_disable {
    color: var(--grayDark);
    cursor: default;
  }

  .button &__loader {
    width: 20px !important;
    height: 20px !important;
    margin: 0 10px 0 0 !important;
  }
}
</style>
