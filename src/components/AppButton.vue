<template>
<button @click="onClick">
  <slot />
</button>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AppButton',
  props: {
    onClick: Function,
  },
  computed: {
    ...mapState([
      'newLogMessage',
      'newLogTitle',
    ]),
  },
};
</script>
