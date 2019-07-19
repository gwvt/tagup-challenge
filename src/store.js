import uuidv4 from 'uuid/v4';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logs: [
      {
        createdAt: '2018-05-13T22:21:44.000Z',
        id: 'a4d50ce6-5e76-4210-974c-81bd44e9cfdb',
        message: 'A new alarm \'Low Apparent Power\' has been created.',
        title: 'New alarm created',
      },
      {
        createdAt: '2018-05-14T12:11:03.000Z',
        id: 'bdf0279b-0c78-403b-9a5e-a8fffdef80e4',
        message: 'Energy consumption of this asset is high. Please resolve this issue ASAP.',
        title: 'Alarm high energy consumption is triggered',
      },
    ],
    newLogMessage: '',
    newLogTitle: '',
    showModal: false,
    logIdToDelete: '',
  },
  mutations: {
    addLog(state, payload) {
      state.logs.push(payload.log);
    },
    deleteLog(state) {
      state.logs = state.logs.filter(log => log.id !== state.logIdToDelete);
    },
    setNewLogMessage(state, payload) {
      state.newLogMessage = payload.message;
    },
    setNewLogTitle(state, payload) {
      state.newLogTitle = payload.title;
    },
    setShowModal(state, payload) {
      state.showModal = payload.show;
    },
    setLogIdToDelete(state, payload) {
      state.logIdToDelete = payload.id;
    },
  },
  actions: {
    addLogAndResetInputs({ commit, state }) {
      const log = {
        createdAt: new Date().toISOString(),
        id: uuidv4(),
        message: state.newLogMessage,
        title: state.newLogTitle,
      };

      commit('addLog', {
        log,
      });
      commit('setNewLogMessage', {
        message: '',
      });
      commit('setNewLogTitle', {
        title: '',
      });
    },
    showModalAndSetIdToDelete(context, payload) {
      context.commit('setShowModal', { show: true });
      context.commit('setLogIdToDelete', payload);
    },
    cancelDelete(context) {
      context.commit('setLogIdToDelete', { id: '' });
      context.commit('setShowModal', { show: false });
    },
    confirmDelete(context) {
      context.commit('deleteLog');
      context.commit('setLogIdToDelete', { id: '' });
      context.commit('setShowModal', { show: false });
    },
  },
});
