import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modePage: '',

    userData: {
      headerEmail: 'Anonymous@mail.ru',
      loginSuccess: false,
      uidUser: false,
      countCards: 0,
    },

    animated: {
      run: true,
      textBanner: '321'
    }

  },
  mutations: {
    setModePage(state, strValue) {
      state.modePage = strValue;
    },
    setUserData(state, objDataUser) {
      state.userData = objDataUser;
    },
    setAnimation(state, objData) {
      state.animated = objData;
    }
  }
});
