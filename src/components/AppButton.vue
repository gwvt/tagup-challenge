<template>
<button @click="onClick">
  <slot />
</button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    onClick: Function,
  },
};
</script>
