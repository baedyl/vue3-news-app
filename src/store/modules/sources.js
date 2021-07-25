import news from "../../api/news";

// INITIAL STATE
const state = () => ({
  sources: [],
  selectedSourceId: null,
});

// GETTERS
const getters = {
    allSources: state => { return state.sources },
    selectedSource: state => { return state.selectedSourceId },
};

// MUTATIONS
const mutations = {
  setSources(state, sources) {
    // Fills in the sources
    state.sources = sources;
  },
  setSelectedSource(state, id) {
    // Fills in the selected source
    state.selectedSourceId = id;
  },
};

// ACTIONS
const actions = {
  async getSourcesData({ commit }) {
    const response = await news.getSources();
    commit("setSources", response.sources);
  },
  updateSelectedSource({ commit }, sourceId) {
    commit("setSelectedSource", sourceId);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
