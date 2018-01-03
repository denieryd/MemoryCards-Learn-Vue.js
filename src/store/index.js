import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modePage: '',

    userData: {
      loginSuccess: false,
      login: 'Anonymous',
      raiting: 0
    }


  },
  mutations: {
    setModePage(state, strValue) {
      state.modePage = strValue;
    }
  }
});
