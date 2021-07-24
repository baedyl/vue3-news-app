import news from "../../api/news";

// INITIAL STATE
const state = () => ({
  news: [],
  articleDetails: null,
});

// GETTERS
const getters = {
  allHeadlines: state => { return state.news },
  articleDetails: state => { return state.articleDetails },
};

// MUTATIONS
const mutations = {
  setNews(state, news) {
    // Fills in the headlines with a human readable date format
    state.news = news.map((article) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        article.publishedAt = new Date(article.publishedAt).toUTCString(undefined, options)
        return article
    });
  },
  setHeadlineDetails(state, details) {
    // Fills in the current headline
    state.articleDetails = details
  },
  setHeadlineTitle(state, params) {
    // Updates a headline's title
    const { title, index } = { ...params }
    state.news[index].title = title
  },
};

// ACTIONS
const actions = {
  async getNewsData({ commit }) {
    const newsData = await news.getNews();
    commit("setNews", newsData);
  },
  async getCurrentHeadline({ state, commit, dispatch }, title) {
    if (state.news.length < 1) {
      // In case the news array is empty,
      // Let's fetch the data
      await dispatch('getNewsData')
    }
    const article =  state.news.filter( article => article.title === title)[0];
    commit("setHeadlineDetails", article);
  },
  updateHeadlineTitle({ state, commit }, params) {
    for (let index = 0; index < state.news.length; index++) {
      // We find the headline having the same title
      if (state.news[index].title === params.currentTitle) {
        // Change the headline title
        commit("setHeadlineTitle", {
          title: params.newTitle,
          index
        });
        break;
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
