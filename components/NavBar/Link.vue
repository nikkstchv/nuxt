<template>
  <nuxt-link
    :to="href"
    :class="['navBarLink', small ? 'navBarLink_small' : 'navBarLink_normal']"
  >
    {{ text }}
  </nuxt-link>
</template>

<script>
export default {
  name: 'NavBarLink',
  props: {
    href: {
      type: String,
      require: true,
      default: '/',
    },
    text: {
      type: String,
      require: false,
      default: '',
    },
    small: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.navBarLink {
  display: block;

  &_normal {
    @include label;

    @include mq($bp-small-medium) {
      @include h4;
    }
  }

  &_small {
    @include text_big_regular;

    color: var(--blackLight);
  }
}
</style>
