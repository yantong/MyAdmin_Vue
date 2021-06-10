import Vue from "vue";
import Vuex from "vuex";
import { storeSate } from "../define/index";

Vue.use(Vuex);

const state: storeSate = {
  routerPers: [],
};

export default new Vuex.Store({
  state,
  mutations: {
    setRouterPers(state, payload) {
      state.routerPers = payload.routerPers;
    },
  },
  actions: {},
  modules: {},
});
