import actionType from "@/store/app/action-type";

const getInitialState = () => ({
  user: null,
});

const getters = {};

const mutations = {
  ["RESET"](state) {
    Object.assign(state, getInitialState());
  },
};

const actions = {
  [actionType.RESET]({ commit }) {
    commit("RESET");
  },
  [actionType.REFRESH]() {
    location.reload();
  },
};

export default {
  namespaced: true,
  state: getInitialState(),
  getters,
  mutations,
  actions,
};
