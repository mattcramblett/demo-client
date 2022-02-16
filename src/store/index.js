import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import modules from "./modules.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  strict: true,
  plugins: [createLogger()],
});

export default store;
