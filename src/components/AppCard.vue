<template>
<div class="card">
    <div class="card-header">
      <h3>
        {{ log.title }}
      </h3>
      <a @click="showModalAndSetIdToDelete({ id: log.id });">
        Delete
      </a>
    </div>
    <p>
      {{ log.message }}
    </p>
    <p>
      {{ formattedDatetime(log.createdAt) }}
    </p>
</div>
</template>

<script>
import moment from 'moment';

import { mapActions } from 'vuex';

export default {
  name: 'AppCard',
  props: {
    log: Object,
  },
  methods: {
    formattedDatetime(isoString) {
      const datetime = moment(isoString).format('h:mm:ss A, MM-DD-YY');
      return datetime;
    },
    ...mapActions([
      'showModalAndSetIdToDelete',
    ]),
  },
};
</script>
