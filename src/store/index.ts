import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routerPers: [],
  },
  mutations: {
    setRouterPers(state, payload) {
      state.routerPers = payload.routerPers;
    },
  },
  actions: {},
  modules: {},
});
