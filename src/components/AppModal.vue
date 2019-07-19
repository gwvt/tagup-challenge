<template>
<div class="modal-mask">
  <div class="modal-container">
    <p>
      Are you sure you want to delete this log?
    </p>
    <div class="row-modal-buttons">
      <app-button :onClick="confirmDelete">
        <font-awesome-icon :icon="['far', 'check-circle']" />
        Confirm
      </app-button>
      <app-button :onClick="cancelDelete">
        <font-awesome-icon :icon="['fas', 'ban']" />
        Cancel
      </app-button>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import AppButton from '@/components/AppButton.vue';

export default {
  name: 'AppModal',
  components: {
    AppButton,
  },
  methods: {
    ...mapActions([
      'cancelDelete',
      'confirmDelete',
    ]),
  },
};
</script>
