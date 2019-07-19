<template>
<div id="app"
     class="app">
  <div class="search-row">
    <input class="search-input"
           type="text"
           placeholder="Search Titles"
           v-model="searchString">
  </div>
  <div class="card">
    <h2>
      Add new log
    </h2>
    <div class="log-input-row">
      <input class="log-input"
             type="text"
             placeholder="Log Title"
             v-model="newLogUserInputTitle">
    </div>
    <div class="log-input-row">
      <textarea placeholder="Log Message"
                v-model="newLogUserInputMessage">
      </textarea>
    </div>
    <div class="log-input-row">
      <app-button :onClick="addLogAndResetInputs">
          <font-awesome-icon :icon="['far', 'comment-alt']" />
          Submit Log
      </app-button>
    </div>
  </div>
  <app-card v-for="log in logsFilteredThenSortedByDateDesc"
            :log="log"
            :key="log.id">
  </app-card>
  <app-modal v-if="showModal" />
</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import AppButton from '@/components/AppButton.vue';
import AppCard from '@/components/AppCard.vue';
import AppModal from '@/components/AppModal.vue';

export default {
  name: 'app',
  components: {
    AppButton,
    AppCard,
    AppModal,
  },
  data() {
    return {
      searchString: '',
    };
  },
  computed: {
    newLogUserInputMessage: {
      get() {
        return this.newLogMessage;
      },
      set(value) {
        this.setNewLogMessage({
          message: value,
        });
      },
    },
    newLogUserInputTitle: {
      get() {
        return this.newLogTitle;
      },
      set(value) {
        this.setNewLogTitle({
          title: value,
        });
      },
    },
    logsFilteredBySearchString() {
      return this.logs
        .filter(log => log.title
          .toLowerCase()
          .includes(this.searchString.toLowerCase()));
    },
    logsFilteredThenSortedByDateDesc() {
      return [...this.logsFilteredBySearchString]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    ...mapState([
      'logs',
      'newLogMessage',
      'newLogTitle',
      'showModal',
    ]),
  },
  methods: {
    ...mapActions([
      'addLogAndResetInputs',
    ]),
    ...mapMutations([
      'setNewLogMessage',
      'setNewLogTitle',
    ]),
  },
};
</script>

<style lang="scss">
body {
    font-family: Arial, Helvetica, sans-serif;
}

$border: 1px solid lightgrey;
$input-padding: 5px;

.text-inputs {
  border: $border;
  padding: $input-padding;
  box-sizing: border-box;
}

input {
    @extend .text-inputs;
    &.log-input {
        width: 100%;
    }
}

textarea {
    @extend .text-inputs;
    width: 100%;
}

button {
    border: $border;
    cursor: pointer;
    padding: 10px;
}

a {
    color: darkgrey;
    cursor: pointer;
}

.svg-inline--fa {
  margin-right: 5px;
}

.app {
    width: 50%;
    min-width: 350px;
    margin: auto;
}

.search-row {
    text-align: right;
}

.log-input-row {
    padding: 5px 0;
}

.card {
    border: $border;
    background-color: rgb(249, 249, 249);
    padding: 20px;
    margin: 20px 0;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .5);
}

.modal-container {
    width: 300px;
    padding: 20px;
    background-color: rgb(255, 255, 255);

    .row-modal-buttons {
      display: flex;
      justify-content: space-around;
    }
}
</style>
